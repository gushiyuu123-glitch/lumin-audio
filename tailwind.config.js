/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        eng: ["Inter", "sans-serif"],
        title: ["Cormorant Garamond", "serif"],
        jp: ["Noto Sans JP", "sans-serif"],
      },

      /* =====================================================
         COLOR TOKENS — Apple White Silver Edition
      ===================================================== */
      colors: {
        /* ===== Base Silver (Apple式：白に近い銀) ===== */
        "silver-apple-0": "#F7F8FA",  // 最明度・背景の基準
        "silver-apple-1": "#E5E7EB",  // 薄い影
        "silver-apple-2": "#C7C8CE",  // 金属感のあるグレー

        /* ===== Dark Text (Appleは純黒を使わない) ===== */
        "lumin-text": "#1A1C1F",     // 最適メインテキスト
        "lumin-text-sub": "rgba(22,24,28,0.55)",

        /* ===== Line / Stroke ===== */
        "line-12": "rgba(0,0,0,0.12)",
        "line-18": "rgba(0,0,0,0.18)",
        "line-28": "rgba(0,0,0,0.28)",

        /* ===== Metallic Accent ===== */
        "gold-silver": "#E9DCCF",
      },

      /* =====================================================
         SHADOWS（白銀背景用に黒影を“弱く・広く”最適化）
      ===================================================== */
      boxShadow: {
        "lumin-soft":
          "0 10px 28px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.04)",
        "lumin-float":
          "0 14px 40px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)",
      },

      /* =====================================================
         Blur / Backdrop Filters（Appleフィルム）
      ===================================================== */
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "18px",
      },

      blur: {
        "28": "28px",
        "38": "38px",
        "48": "48px",
      },
    },
  },
  plugins: [],
};
