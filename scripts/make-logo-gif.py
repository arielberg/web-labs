#!/usr/bin/env python3
"""Generate a compact animated logo GIF for email signatures (white background)."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "logo-signature.gif"

# Email-friendly canvas — solid white (GIF transparency looks black/muddy in mail clients)
W, H = 300, 128
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
    px = (x - VB_X) / VB_W * (RW - 20 * SCALE) + 10 * SCALE
    py = (y - VB_Y) / VB_H * (RH - 18 * SCALE) + 8 * SCALE
    return px, py


def color_at(t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    c0, c1, c2 = (64, 210, 180), (0, 180, 220), (0, 150, 220)
    # Slightly deeper on white so cyan reads crisp (not washed out)
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
        n = max(12, int(seg / (2.5 * SCALE)))
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


def draw_stroke_segment(
    draw: ImageDraw.ImageDraw,
    a: tuple[float, float],
    b: tuple[float, float],
    color: tuple[int, int, int],
    width: float,
) -> None:
    draw.line([a, b], fill=color, width=int(width))
    r = width / 2
    for p in (a, b):
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
            font = ImageFont.truetype(fp, 32 * SCALE)
            break

    text = "eb-labs"
    text_anchor = map_pt(136, 92)
    n_frames = int(TOTAL * FPS)
    frame_ms = int(1000 / FPS)
    stroke_w = 7.5 * SCALE

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
        tip = samples[0]

        for s in range(1, len(samples)):
            if cum[s] > visible_len:
                if cum[s - 1] >= visible_len:
                    break
                seg_t = (visible_len - cum[s - 1]) / max(1e-6, cum[s] - cum[s - 1])
                x0, y0 = samples[s - 1]
                x1, y1 = samples[s]
                end = (lerp(x0, x1, seg_t), lerp(y0, y1, seg_t))
                col = color_at(cum[s - 1] / total_len)
                # soft under-stroke then crisp stroke
                soft = mix(col, BG, 0.35)
                draw_stroke_segment(draw, samples[s - 1], end, soft, stroke_w + 2 * SCALE)
                draw_stroke_segment(draw, samples[s - 1], end, col, stroke_w)
                tip = end
                break

            col = color_at(cum[s] / total_len)
            soft = mix(col, BG, 0.3)
            draw_stroke_segment(draw, samples[s - 1], samples[s], soft, stroke_w + 2 * SCALE)
            draw_stroke_segment(draw, samples[s - 1], samples[s], col, stroke_w)
            tip = samples[s]

        if DRAW_BEGIN <= t <= DRAW_BEGIN + DRAW_DUR + 0.22 and draw_p > 0:
            fade = 1.0
            if t > DRAW_BEGIN + DRAW_DUR:
                fade = max(0.0, 1.0 - (t - DRAW_BEGIN - DRAW_DUR) / 0.22)
            blit_soft_disc(img, tip, 14 * SCALE, (0, 200, 230), 0.45 * fade)
            blit_soft_disc(img, tip, 6 * SCALE, (255, 255, 255), 0.85 * fade)
            r = 2.2 * SCALE
            draw.ellipse((tip[0] - r, tip[1] - r, tip[0] + r, tip[1] + r), fill=(255, 255, 255))

        if t >= DRAW_BEGIN + DRAW_DUR:
            cx, cy = map_pt(94, 90)
            phase = (t - (DRAW_BEGIN + DRAW_DUR)) / 1.8
            blink = 0.4 + 0.6 * (0.5 + 0.5 * math.sin(phase * math.pi * 2))
            blit_soft_disc(img, (cx, cy), 16 * SCALE, (0, 200, 230), 0.35 * blink)
            blit_soft_disc(img, (cx, cy), 7 * SCALE, (120, 230, 255), 0.4 * blink)
            r = 2.4 * SCALE
            core = mix((255, 255, 255), (0, 200, 230), 0.15)
            draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=core)

        if t >= WORD_BEGIN:
            word_p = min(1.0, (t - WORD_BEGIN) / WORD_DUR)
            bbox = font.getbbox(text)
            tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
            tx, ty = text_anchor[0], text_anchor[1] - th * 0.85

            # Draw text to a white-backed clip strip for clean L→R reveal
            text_img = Image.new("RGB", (RW, RH), BG)
            td = ImageDraw.Draw(text_img)
            # Per-glyph approx gradient: draw in mid cyan (reads well on white)
            for gx in range(int(tw)):
                col = color_at(0.15 + 0.7 * (gx / max(1, tw)))
                # clip one column — expensive but SCALE-limited; use chunk columns
            # Faster: solid theme color + light second pass
            td.text((tx, ty), text, font=font, fill=(0, 175, 210))
            # Soft left→right tint
            overlay = Image.new("RGB", (RW, RH), BG)
            od = ImageDraw.Draw(overlay)
            od.text((tx, ty), text, font=font, fill=(0, 140, 210))
            # Blend overlay more toward the right of the word
            mask = Image.new("L", (RW, RH), 0)
            md = ImageDraw.Draw(mask)
            for gx in range(int(tw) + 1):
                md.line([(tx + gx, ty - 2), (tx + gx, ty + th + 4)], fill=int(220 * (gx / max(1, tw))))
            text_img = Image.composite(overlay, text_img, mask)

            reveal_w = max(1, int(tw * word_p + 3 * SCALE))
            # Copy only revealed region onto main (keeps white elsewhere)
            box = (
                int(tx - 2),
                int(ty - 4),
                int(tx - 2 + reveal_w),
                int(ty + th + 8),
            )
            region = text_img.crop(box)
            img.paste(region, box[:2])

            if word_p < 0.98:
                sx = tx + reveal_w
                blit_soft_disc(img, (sx, ty + th * 0.45), 10 * SCALE, (180, 240, 255), 0.55)
                blit_soft_disc(img, (sx, ty + th * 0.45), 4 * SCALE, (255, 255, 255), 0.7)

        # Downscale with LANCZOS for sharp result on white
        frames.append(img.resize((W, H), Image.Resampling.LANCZOS))
        durations.append(frame_ms)

    durations[-1] = 2200

    # Quantize with a shared palette; force near-white → pure white for clean email edges
    mid = frames[min(len(frames) - 1, int((DRAW_BEGIN + DRAW_DUR + 0.3) * FPS))]
    # Seed palette with pure white
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
