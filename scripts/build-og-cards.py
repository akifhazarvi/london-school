#!/usr/bin/env python3
"""
Generate branded social-share (Open Graph) cards for each page.

Each card is 1200×630 with the page's photo as a full-bleed background,
a navy gradient on the lower third, the school crest in the bottom-left,
a white Nunito Black headline, and a peach/red Inter Medium tagline.

Run from the repo root:

    python3 scripts/build-og-cards.py

Requires Pillow (pip install Pillow). Fonts are fetched from Google
Fonts on first run and cached at /tmp/og-fonts/.

Output: img/og/og-*.jpg
"""

import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont

OUT_W, OUT_H = 1200, 630
NAVY = (47, 85, 129)        # --navy
RED = (193, 53, 61)         # --red
WHITE = (255, 255, 255)
PEACH = (242, 213, 197)     # --peach

FONT_DIR = "/tmp/og-fonts"
NUNITO = f"{FONT_DIR}/Nunito-Black.ttf"
INTER = f"{FONT_DIR}/Inter-Medium.ttf"
NUNITO_URL = "https://github.com/google/fonts/raw/main/ofl/nunito/Nunito%5Bwght%5D.ttf"
INTER_URL = "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"


def ensure_fonts():
    os.makedirs(FONT_DIR, exist_ok=True)
    for path, url in [(NUNITO, NUNITO_URL), (INTER, INTER_URL)]:
        if not os.path.exists(path):
            print(f"Fetching {os.path.basename(path)}…")
            urllib.request.urlretrieve(url, path)


def make_card(src_path, out_path, headline, tagline, accent=RED):
    img = Image.open(src_path).convert("RGB")
    sw, sh = img.size
    src_ratio = sw / sh
    tgt_ratio = OUT_W / OUT_H
    if src_ratio > tgt_ratio:
        nh = OUT_H
        nw = int(nh * src_ratio)
    else:
        nw = OUT_W
        nh = int(nw / src_ratio)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - OUT_W) // 2
    top = (nh - OUT_H) // 2
    img = img.crop((left, top, left + OUT_W, top + OUT_H)).convert("RGBA")

    grad_h = 290
    grad = Image.new("RGBA", (OUT_W, grad_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    for y in range(grad_h):
        alpha = int(235 * ((y / grad_h) ** 1.35))
        gd.line([(0, y), (OUT_W, y)], fill=(*NAVY, alpha))
    img.paste(grad, (0, OUT_H - grad_h), grad)

    LOGO_PATH = "img/logo-icon.png"
    LOGO_SIZE = 88
    LEFT_PAD = 56
    BOT_PAD = 56
    if os.path.exists(LOGO_PATH):
        logo = Image.open(LOGO_PATH).convert("RGBA")
        logo.thumbnail((LOGO_SIZE, LOGO_SIZE), Image.LANCZOS)
        img.paste(logo, (LEFT_PAD, OUT_H - BOT_PAD - logo.height), logo)
        text_x = LEFT_PAD + logo.width + 22
    else:
        text_x = LEFT_PAD

    draw = ImageDraw.Draw(img)
    headline_font = ImageFont.truetype(NUNITO, 42)
    tagline_font = ImageFont.truetype(INTER, 26)
    try:
        headline_font.set_variation_by_axes([900])
    except Exception:
        pass

    headline_y = OUT_H - BOT_PAD - LOGO_SIZE + 6
    tagline_y = headline_y + 52

    draw.text((text_x + 2, headline_y + 2), headline, fill=(0, 0, 0, 180), font=headline_font)
    draw.text((text_x, headline_y), headline, fill=WHITE, font=headline_font)
    draw.text((text_x, tagline_y), tagline, fill=accent, font=tagline_font)

    img.convert("RGB").save(out_path, "JPEG", quality=88, optimize=True)


SPEC = [
    ("og-building-night.jpg",  "img/building-night.jpg",                       "London School — Prof. Waris Mir Campus", "Cambridge · AI & Robotics · Lahore", RED),
    ("og-about.jpg",           "img/building-night.jpg",                       "Built on the Legacy of Prof. Waris Mir", "Cambridge school in Lahore · since 2025", PEACH),
    ("og-yearbook.jpg",        "img/building-night.jpg",                       "Step Inside London School",              "A guided virtual tour · Lahore", PEACH),
    ("og-robotics-lab.jpg",    "img/robotics-lab.jpg",                          "Pakistan's Most Advanced Early Robotics","Two US coding certifications by Kindergarten", PEACH),
    ("og-academics.jpg",       "img/robotics-lab.jpg",                          "Cambridge IGCSE in Lahore",              "Pre-Nursery to O-Level · Cambridge Pathway", PEACH),
    ("og-campus-corridor.jpg", "img/school/life-nursery-corridor.jpg",          "A Place Kids Love Coming To",            "Smart classrooms · Robotics · Swimming pool", PEACH),
    ("og-cultural-day.jpg",    "img/school/event-cultural-day-full.jpg",        "Admissions Open 2025–26",                "Cambridge curriculum · Township, Lahore", RED),
    ("og-hamid-mir.jpg",       "img/school/event-hamid-mir-inauguration.jpg",   "Hamid Mir Inaugurates Campus",           "London School · Prof. Waris Mir Campus", PEACH),
    ("og-ai-steam.jpg",        "img/school/promo-ai-steam.jpg",                 "Ask Prof Mir",                           "AI study assistant · for teachers & parents", PEACH),
]


def main():
    ensure_fonts()
    os.makedirs("img/og", exist_ok=True)
    for fn, src, h, t, a in SPEC:
        out = f"img/og/{fn}"
        make_card(src, out, h, t, a)
        print(f"  ✓ {out}")


if __name__ == "__main__":
    main()
