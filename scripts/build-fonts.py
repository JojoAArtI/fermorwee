"""Self-host the three fonts in app/fonts/.

Google Fonts is fetched at build time by next/font/google, which fails on flaky
networks. Instead we copy the Latin subsets from the Fontsource packages and
cut a tiny extra file holding only the rupee sign, which lives in latin-ext.

Run after `npm install`:  python scripts/build-fonts.py  (needs fonttools + brotli)
"""
import shutil
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "app" / "fonts"
NM = ROOT / "node_modules"

FONTS = {
    # name: (latin file, latin-ext file)
    "fraunces": ("@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2",
                 "@fontsource-variable/fraunces/files/fraunces-latin-ext-opsz-normal.woff2"),
    "inter": ("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
              "@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2"),
    **{
        f"poppins-{w}": (f"@fontsource/poppins/files/poppins-latin-{w}-normal.woff2",
                         f"@fontsource/poppins/files/poppins-latin-ext-{w}-normal.woff2")
        for w in (500, 600, 700)
    },
}

RUPEE = "U+20B9"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (latin, ext) in FONTS.items():
        shutil.copyfile(NM / latin, OUT / f"{name}-latin.woff2")
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["*"]
        opts.notdef_outline = True
        font = subset.load_font(str(NM / ext), opts)
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=subset.parse_unicodes(RUPEE))
        sub.subset(font)
        subset.save_font(font, str(OUT / f"{name}-rupee.woff2"), opts)
    for f in sorted(OUT.iterdir()):
        print(f"{f.name:28} {f.stat().st_size:>7} B")


if __name__ == "__main__":
    main()
