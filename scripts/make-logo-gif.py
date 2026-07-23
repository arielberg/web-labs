#!/usr/bin/env python3
"""Generate a compact animated logo GIF for email signatures."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "logo-signature.gif"

# Email-friendly canvas
W, H = 280, 120
SCALE = 2
RW, RH = W * SCALE, H * SCALE

# Matches LogoAnimated viewBox
VB_X, VB_Y, VB_W, VB_H = 48, 40, 230, 95
RAW_PTS = [(58, 55), (76, 113), (94, 73), (112, 113), (130, 55), (258, 55)]

DRAW_BEGIN = 0.08
DRAW_DUR = 1.0
WORD_BEGIN = DRAW_BEGIN + DRAW_DUR + 0.18
WORD_DUR = 0.65
HOLD = 1.4
TOTAL = WORD_BEGIN + WORD_DUR + HOLD
FPS = 12


def map_pt(x: float, y: float) -> tuple[float, float]:
    px = (x - VB_X) / VB_W * (RW - 16 * SCALE) + 8 * SCALE
    py = (y - VB_Y) / VB_H * (RH - 16 * SCALE) + 8 * SCALE
    return px, py


def color_at(t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    c0, c1, c2 = (127, 255, 212), (34, 211, 238), (0, 191, 255)
    if t < 0.48:
        u = t / 0.48
        a, b = c0, c1
    else:
        u = (t - 0.48) / 0.52
        a, b = c1, c2
    return tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3))


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def draw_glow(base: Image.Image, xy: tuple[float, float], r: float, color: tuple[int, int, int], alpha: int) -> Image.Image:
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y = xy
    d.ellipse((x - r, y - r, x + r, y + r), fill=(*color, alpha))
    return Image.alpha_composite(base, layer.filter(ImageFilter.GaussianBlur(radius=r * 0.55)))


def build_samples(pts: list[tuple[float, float]]):
    samples: list[tuple[float, float]] = []
    cum = [0.0]
    for i in range(len(pts) - 1):
        x0, y0 = pts[i]
        x1, y1 = pts[i + 1]
        seg = math.hypot(x1 - x0, y1 - y0)
        n = max(8, int(seg / (3 * SCALE)))
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
            font = ImageFont.truetype(fp, 34 * SCALE)
            break

    text = "eb-labs"
    text_anchor = map_pt(136, 92)
    n_frames = int(TOTAL * FPS)
    frame_ms = int(1000 / FPS)
    stroke_w = 8 * SCALE

    frames: list[Image.Image] = []
    durations: list[int] = []

    for i in range(n_frames):
        t = i / FPS
        img = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))

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
                layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
                d = ImageDraw.Draw(layer)
                d.line([samples[s - 1], end], fill=(*col, 255), width=stroke_w)
                r = stroke_w / 2
                d.ellipse((end[0] - r, end[1] - r, end[0] + r, end[1] + r), fill=(*col, 255))
                img = Image.alpha_composite(img, layer)
                tip = end
                break

            col = color_at(cum[s] / total_len)
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(layer)
            d.line([samples[s - 1], samples[s]], fill=(*col, 255), width=stroke_w)
            r = stroke_w / 2
            x, y = samples[s]
            d.ellipse((x - r, y - r, x + r, y + r), fill=(*col, 255))
            img = Image.alpha_composite(img, layer)
            tip = samples[s]

        if DRAW_BEGIN <= t <= DRAW_BEGIN + DRAW_DUR + 0.2 and draw_p > 0:
            fade = 1.0
            if t > DRAW_BEGIN + DRAW_DUR:
                fade = max(0.0, 1.0 - (t - DRAW_BEGIN - DRAW_DUR) / 0.2)
            img = draw_glow(img, tip, 16 * SCALE, (77, 232, 255), int(70 * fade))
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(layer)
            x, y = tip
            d.ellipse(
                (x - 5 * SCALE, y - 5 * SCALE, x + 5 * SCALE, y + 5 * SCALE),
                fill=(255, 255, 255, int(200 * fade)),
            )
            d.ellipse(
                (x - 2 * SCALE, y - 2 * SCALE, x + 2 * SCALE, y + 2 * SCALE),
                fill=(255, 255, 255, int(255 * fade)),
            )
            img = Image.alpha_composite(img, layer)

        if t >= DRAW_BEGIN + DRAW_DUR:
            cx, cy = map_pt(94, 90)
            phase = (t - (DRAW_BEGIN + DRAW_DUR)) / 1.8
            blink = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(phase * math.pi * 2))
            img = draw_glow(img, (cx, cy), 18 * SCALE, (77, 232, 255), int(55 * blink))
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(layer)
            d.ellipse(
                (cx - 3 * SCALE, cy - 3 * SCALE, cx + 3 * SCALE, cy + 3 * SCALE),
                fill=(255, 255, 255, int(180 * blink)),
            )
            img = Image.alpha_composite(img, layer)

        if t >= WORD_BEGIN:
            word_p = min(1.0, (t - WORD_BEGIN) / WORD_DUR)
            bbox = font.getbbox(text)
            tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
            tx, ty = text_anchor[0], text_anchor[1] - th * 0.85

            text_layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            td = ImageDraw.Draw(text_layer)
            # Approximate theme gradient on glyphs via two passes
            td.text((tx, ty), text, font=font, fill=(127, 255, 212, 255))
            overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
            od = ImageDraw.Draw(overlay)
            od.text((tx, ty), text, font=font, fill=(0, 191, 255, 200))
            # fade cyan from left→right of text box
            grad = Image.new("L", img.size, 0)
            gd = ImageDraw.Draw(grad)
            for gx in range(int(tw)):
                gd.line(
                    [(tx + gx, ty - 2), (tx + gx, ty + th + 4)],
                    fill=int(255 * (gx / max(1, tw))),
                )
            cyan_part = overlay.copy()
            cyan_part.putalpha(ImageChops.multiply(overlay.split()[-1], grad))
            text_layer = Image.alpha_composite(text_layer, cyan_part)

            reveal_w = tw * word_p + 4 * SCALE
            mask = Image.new("L", img.size, 0)
            md = ImageDraw.Draw(mask)
            md.rectangle((tx - 2, ty - 4, tx + reveal_w, ty + th + 8), fill=255)
            ta = text_layer.split()[-1]
            text_layer.putalpha(ImageChops.darker(ta, mask))
            img = Image.alpha_composite(img, text_layer)

            if word_p < 1.0:
                sx = tx + reveal_w
                shine = Image.new("RGBA", img.size, (0, 0, 0, 0))
                sd = ImageDraw.Draw(shine)
                sd.polygon(
                    [
                        (sx - 10 * SCALE, ty - 6),
                        (sx + 6 * SCALE, ty - 6),
                        (sx - 2 * SCALE, ty + th + 10),
                        (sx - 18 * SCALE, ty + th + 10),
                    ],
                    fill=(232, 255, 255, 130),
                )
                shine = shine.filter(ImageFilter.GaussianBlur(radius=2 * SCALE))
                img = Image.alpha_composite(img, shine)

        frames.append(img.resize((W, H), Image.Resampling.LANCZOS))
        durations.append(frame_ms)

    durations[-1] = 2000

    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        disposal=2,
        optimize=True,
    )
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size / 1024:.1f} KB, {len(frames)} frames)")


if __name__ == "__main__":
    main()
