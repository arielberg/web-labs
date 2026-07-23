#!/usr/bin/env python3
"""Generate a compact animated logo GIF for email signatures (white background)."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "logo-signature.gif"

# Email-friendly canvas — solid white (GIF transparency looks black/muddy in mail clients)
W, H = 320, 150
SCALE = 3
RW, RH = W * SCALE, H * SCALE
BG = (255, 255, 255)

VB_X, VB_Y, VB_W, VB_H = 48, 40, 230, 95
RAW_PTS = [(58, 55), (76, 113), (94, 73), (112, 113), (130, 55), (258, 55)]

DRAW_BEGIN = 0.08
DRAW_DUR = 1.0
WORD_BEGIN = DRAW_BEGIN + DRAW_DUR + 0.18
WORD_DUR = 0.65
HOLD = 1.5
TOTAL = WORD_BEGIN + WORD_DUR + HOLD
FPS = 12


def map_pt(x: float, y: float) -> tuple[float, float]:
    # Extra bottom padding so "eb-labs" isn't clipped
    pad_x, pad_top, pad_bot = 12 * SCALE, 10 * SCALE, 28 * SCALE
    px = (x - VB_X) / VB_W * (RW - 2 * pad_x) + pad_x
    py = (y - VB_Y) / VB_H * (RH - pad_top - pad_bot) + pad_top
    return px, py


def color_at(t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    c0, c1, c2 = (64, 210, 180), (0, 180, 220), (0, 150, 220)
    if t < 0.48:
        u = t / 0.48
        a, b = c0, c1
    else:
        u = (t - 0.48) / 0.52
        a, b = c1, c2
    return tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3))


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def mix(c: tuple[int, int, int], bg: tuple[int, int, int], a: float) -> tuple[int, int, int]:
    a = max(0.0, min(1.0, a))
    return tuple(int(bg[i] * (1 - a) + c[i] * a) for i in range(3))


def blit_soft_disc(
    base: Image.Image,
    xy: tuple[float, float],
    radius: float,
    color: tuple[int, int, int],
    strength: float,
) -> None:
    """Soft glow that blends toward white — never through black alpha."""
    if strength <= 0.01:
        return
    pad = int(radius * 2.2) + 2
    size = pad * 2
    layer = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(layer)
    cx = cy = size / 2
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=int(255 * strength))
    layer = layer.filter(ImageFilter.GaussianBlur(radius=max(1.0, radius * 0.45)))

    tint = Image.new("RGB", (size, size), color)
    white = Image.new("RGB", (size, size), BG)
    patch = Image.composite(tint, white, layer)

    x, y = int(xy[0] - cx), int(xy[1] - cy)
    base.paste(patch, (x, y), layer)


def build_samples(pts: list[tuple[float, float]]):
    samples: list[tuple[float, float]] = []
    cum = [0.0]
    for i in range(len(pts) - 1):
        x0, y0 = pts[i]
        x1, y1 = pts[i + 1]
        seg = math.hypot(x1 - x0, y1 - y0)
        n = max(16, int(seg / (2 * SCALE)))
        for k in range(n):
            t = k / n
            samples.append((x0 + (x1 - x0) * t, y0 + (y1 - y0) * t))
            if len(samples) > 1:
                ox, oy = samples[-2]
                nx, ny = samples[-1]
                cum.append(cum[-1] + math.hypot(nx - ox, ny - oy))
    samples.append(pts[-1])
    if len(cum) < len(samples):
        ox, oy = samples[-2]
        nx, ny = samples[-1]
        cum.append(cum[-1] + math.hypot(nx - ox, ny - oy))
    return samples, cum


def visible_polyline(samples, cum, visible_len: float):
    """Return continuous points for the stroked portion + tip position."""
    if visible_len <= 0:
        return [], samples[0]
    pts = [samples[0]]
    tip = samples[0]
    for s in range(1, len(samples)):
        if cum[s] <= visible_len:
            pts.append(samples[s])
            tip = samples[s]
            continue
        seg_t = (visible_len - cum[s - 1]) / max(1e-6, cum[s] - cum[s - 1])
        x0, y0 = samples[s - 1]
        x1, y1 = samples[s]
        tip = (lerp(x0, x1, seg_t), lerp(y0, y1, seg_t))
        pts.append(tip)
        break
    return pts, tip


def draw_smooth_stroke(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[float, float]],
    color: tuple[int, int, int],
    width: float,
) -> None:
    if len(points) < 2:
        return
    w = max(1, int(round(width)))
    draw.line(points, fill=color, width=w, joint="curve")
    r = w / 2
    # Round caps only at ends — avoids the "string of beads" look
    for p in (points[0], points[-1]):
        draw.ellipse((p[0] - r, p[1] - r, p[0] + r, p[1] + r), fill=color)


def main() -> None:
    pts = [map_pt(x, y) for x, y in RAW_PTS]
    samples, cum = build_samples(pts)
    total_len = cum[-1]

    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    font = ImageFont.load_default()
    for fp in font_paths:
        if Path(fp).exists():
            font = ImageFont.truetype(fp, 30 * SCALE)
            break

    text = "eb-labs"
    # Place word clearly under the bar with room for full glyph boxes
    text_anchor = map_pt(136, 100)
    n_frames = int(TOTAL * FPS)
    frame_ms = int(1000 / FPS)
    stroke_w = 8 * SCALE

    frames: list[Image.Image] = []
    durations: list[int] = []

    for i in range(n_frames):
        t = i / FPS
        img = Image.new("RGB", (RW, RH), BG)
        draw = ImageDraw.Draw(img)

        if t < DRAW_BEGIN:
            draw_p = 0.0
        elif t >= DRAW_BEGIN + DRAW_DUR:
            draw_p = 1.0
        else:
            draw_p = (t - DRAW_BEGIN) / DRAW_DUR

        visible_len = total_len * draw_p
        poly, tip = visible_polyline(samples, cum, visible_len)

        if len(poly) >= 2:
            mid_col = color_at(0.45)
            soft = mix(mid_col, BG, 0.28)
            draw_smooth_stroke(draw, poly, soft, stroke_w + 2.5 * SCALE)
            draw_smooth_stroke(draw, poly, color_at(min(0.95, draw_p * 0.85 + 0.1)), stroke_w)
            if draw_p > 0.08:
                hi = mix((127, 255, 212), color_at(0.35), 0.55)
                draw_smooth_stroke(draw, poly, hi, max(2, stroke_w * 0.35))

        if DRAW_BEGIN <= t <= DRAW_BEGIN + DRAW_DUR + 0.22 and draw_p > 0:
            fade = 1.0
            if t > DRAW_BEGIN + DRAW_DUR:
                fade = max(0.0, 1.0 - (t - DRAW_BEGIN - DRAW_DUR) / 0.22)
            blit_soft_disc(img, tip, 12 * SCALE, (0, 200, 230), 0.4 * fade)
            blit_soft_disc(img, tip, 5 * SCALE, (255, 255, 255), 0.8 * fade)
            r = 2.0 * SCALE
            draw.ellipse((tip[0] - r, tip[1] - r, tip[0] + r, tip[1] + r), fill=(255, 255, 255))

        if t >= DRAW_BEGIN + DRAW_DUR:
            cx, cy = map_pt(94, 88)
            phase = (t - (DRAW_BEGIN + DRAW_DUR)) / 1.8
            blink = 0.4 + 0.6 * (0.5 + 0.5 * math.sin(phase * math.pi * 2))
            blit_soft_disc(img, (cx, cy), 14 * SCALE, (0, 200, 230), 0.3 * blink)
            blit_soft_disc(img, (cx, cy), 6 * SCALE, (120, 230, 255), 0.35 * blink)
            r = 2.2 * SCALE
            core = mix((255, 255, 255), (0, 200, 230), 0.12)
            draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=core)

        if t >= WORD_BEGIN:
            word_p = min(1.0, (t - WORD_BEGIN) / WORD_DUR)
            bbox = font.getbbox(text)
            ascent, descent = font.getmetrics()
            tw = bbox[2] - bbox[0]
            th = ascent + descent
            tx = text_anchor[0]
            ty = text_anchor[1] - ascent

            text_img = Image.new("RGB", (RW, RH), BG)
            td = ImageDraw.Draw(text_img)
            td.text((tx, ty), text, font=font, fill=(0, 175, 210))
            overlay = Image.new("RGB", (RW, RH), BG)
            od = ImageDraw.Draw(overlay)
            od.text((tx, ty), text, font=font, fill=(0, 140, 210))
            mask = Image.new("L", (RW, RH), 0)
            md = ImageDraw.Draw(mask)
            for gx in range(int(tw) + 1):
                md.line([(tx + gx, ty - 2), (tx + gx, ty + th + 4)], fill=int(220 * (gx / max(1, tw))))
            text_img = Image.composite(overlay, text_img, mask)

            reveal_w = max(1, int(tw * word_p + 3 * SCALE))
            top = max(0, int(ty - 4))
            bot = min(RH, int(ty + th + 8))
            left = max(0, int(tx - 2))
            right = min(RW, left + reveal_w)
            box = (left, top, right, bot)
            img.paste(text_img.crop(box), (left, top))

            if word_p < 0.98:
                sx = left + reveal_w
                blit_soft_disc(img, (sx, ty + th * 0.45), 9 * SCALE, (180, 240, 255), 0.5)
                blit_soft_disc(img, (sx, ty + th * 0.45), 3.5 * SCALE, (255, 255, 255), 0.65)

        frames.append(img.resize((W, H), Image.Resampling.LANCZOS))
        durations.append(frame_ms)

    durations[-1] = 2200

    mid = frames[min(len(frames) - 1, int((DRAW_BEGIN + DRAW_DUR + 0.3) * FPS))]
    seed = Image.new("RGB", (mid.width + 8, mid.height), BG)
    seed.paste(mid, (8, 0))
    palette_src = seed.quantize(colors=96, method=Image.Quantize.MEDIANCUT)

    def force_white_palette(im: Image.Image) -> Image.Image:
        pal = im.getpalette()
        if not pal:
            return im
        for i in range(0, len(pal), 3):
            if pal[i] >= 245 and pal[i + 1] >= 245 and pal[i + 2] >= 245:
                pal[i] = pal[i + 1] = pal[i + 2] = 255
        im.putpalette(pal)
        return im

    converted = [
        force_white_palette(fr.quantize(palette=palette_src, dither=Image.Dither.NONE))
        for fr in frames
    ]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    converted[0].save(
        OUT,
        save_all=True,
        append_images=converted[1:],
        duration=durations,
        loop=0,
        disposal=2,
        optimize=True,
    )
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size / 1024:.1f} KB, {len(frames)} frames, white bg)")


if __name__ == "__main__":
    main()
