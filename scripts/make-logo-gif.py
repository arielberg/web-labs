#!/usr/bin/env python3
"""Render logo-signature.gif by capturing the real SVG animation in headless Chrome."""

from __future__ import annotations

import json
import subprocess
import tempfile
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "logo-signature.gif"
LOGO = ROOT / "src" / "components" / "LogoAnimated.astro"

# Email size
W, H = 420, 210
FPS = 12
# Match LogoAnimated timings + hold
DURATION = 3.6
HOLD_LAST_MS = 2200


def extract_svg() -> str:
    """Build a standalone white-bg SVG from LogoAnimated (SMIL, no CSS anims)."""
    # Hand-maintained snapshot of the mark (ids fixed, CSS fades → SMIL)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="40 24 250 140"
  style="background:#ffffff">
  <rect x="40" y="24" width="250" height="140" fill="#ffffff"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2ec4a8"/>
      <stop offset=".48" stop-color="#00a8d0"/>
      <stop offset="1" stop-color="#008fd0"/>
    </linearGradient>
  </defs>

  <path id="p" d="M58 55 L76 113 L94 73 L112 113 L130 55 L258 55"
    fill="none" stroke="#00a8d0" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"
    pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000">
    <animate attributeName="stroke-dashoffset" from="1000" to="0" begin="0.1s" dur="1.1s" fill="freeze"/>
  </path>

  <g opacity="0">
    <circle r="8" fill="#5adfff"/>
    <circle r="3.2" fill="#ffffff"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.85;1" begin="0.1s" dur="1.35s" fill="freeze"/>
    <animateMotion begin="0.1s" dur="1.1s" fill="freeze" rotate="auto">
      <mpath href="#p"/>
    </animateMotion>
  </g>

  <g opacity="0">
    <animate attributeName="opacity" values="0;1;0.55;1;0.55" keyTimes="0;0.15;0.4;0.7;1"
      begin="1.25s" dur="2.2s" repeatCount="indefinite"/>
    <circle cx="94" cy="88" r="7" fill="#5adfff"/>
    <circle cx="94" cy="88" r="2.8" fill="#ffffff"/>
  </g>

  <text x="136" y="118" direction="ltr" text-anchor="start"
    font-size="26" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700"
    fill="#00a8d0" opacity="0">
    eb-labs
    <animate attributeName="opacity" from="0" to="1" begin="1.35s" dur="0.35s" fill="freeze"/>
  </text>
</svg>
'''


def chrome_screenshot(svg_path: Path, png_path: Path, elapsed_ms: int) -> None:
    """Use Chrome headless + virtual time to capture SVG at a given animation time."""
    html = f"""<!doctype html><html><body style="margin:0;background:#fff">
{svg_path.read_text(encoding='utf-8')}
<script>
  // Nudge SMIL clock by reloading document time via pause/set
  const svg = document.querySelector('svg');
  const root = svg;
  // Chrome exposes SVGSVGElement.pauseAnimations / unpause / setCurrentTime
  if (root.pauseAnimations) {{
    root.pauseAnimations();
    root.setCurrentTime({elapsed_ms / 1000:.3f});
  }}
</script>
</body></html>"""
    html_path = png_path.with_suffix(".html")
    html_path.write_text(html, encoding="utf-8")
    subprocess.run(
        [
            "google-chrome",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={W},{H}",
            f"--screenshot={png_path}",
            html_path.as_uri(),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main() -> None:
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        svg_path = td_path / "logo.svg"
        svg_path.write_text(extract_svg(), encoding="utf-8")

        n = int(DURATION * FPS)
        frames: list[Image.Image] = []
        durations: list[int] = []
        frame_ms = int(1000 / FPS)

        for i in range(n):
            t_ms = int(i / FPS * 1000)
            png = td_path / f"f{i:04d}.png"
            chrome_screenshot(svg_path, png, t_ms)
            im = Image.open(png).convert("RGB")
            if im.size != (W, H):
                im = im.resize((W, H), Image.Resampling.LANCZOS)
            # Snap to a tiny solid palette so GIF has no speckled antialias
            palette = [
                (255, 255, 255),
                (0, 168, 208),
                (0, 150, 192),
                (90, 223, 255),
                (200, 245, 255),
            ]
            px = im.load()
            for y in range(H):
                for x in range(W):
                    r, g, b = px[x, y]
                    if r > 245 and g > 245 and b > 245:
                        px[x, y] = (255, 255, 255)
                        continue
                    best, best_d = palette[1], 1e9
                    for c in palette:
                        d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2
                        if d < best_d:
                            best, best_d = c, d
                    px[x, y] = best
            frames.append(im)
            durations.append(frame_ms)
            print(f"frame {i+1}/{n}", flush=True)

        durations[-1] = HOLD_LAST_MS

        mid = frames[min(len(frames) - 1, int(1.3 * FPS))]
        seed = Image.new("RGB", (mid.width + 8, mid.height), (255, 255, 255))
        seed.paste(mid, (8, 0))
        pal = seed.quantize(colors=64, method=Image.Quantize.MAXCOVERAGE)

        def force_white(im: Image.Image) -> Image.Image:
            p = im.getpalette()
            if not p:
                return im
            for i in range(0, len(p), 3):
                if p[i] >= 248 and p[i + 1] >= 248 and p[i + 2] >= 248:
                    p[i] = p[i + 1] = p[i + 2] = 255
            im.putpalette(p)
            return im

        converted = [force_white(fr.quantize(palette=pal, dither=Image.Dither.NONE)) for fr in frames]
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
        print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size / 1024:.1f} KB, {len(frames)} frames)")


if __name__ == "__main__":
    main()
