// src/styles/luminTokens.js
export const LUMIN_TOKENS = {
  silver: {
    noise: "bg-[url('/lumin/noise-ultrafine.png')] opacity-[0.028]",
    gradTop:
      "from-[rgba(255,255,255,0.92)] via-[rgba(240,242,250,0.45)] to-transparent",
    gradBottom:
      "from-[rgba(255,255,255,0.90)] via-[rgba(240,242,250,0.30)] to-transparent",
    panel:
      "bg-gradient-to-br from-[rgba(255,255,255,0.55)] via-[rgba(245,245,255,0.18)] to-[rgba(190,195,210,0.08)] backdrop-blur-[6px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.55),0_4px_12px_rgba(0,0,0,0.14)]",
  },

  ink: {
    strong: "text-[#0F1012]/92",
    mid: "text-[#0F1012]/75",
    soft: "text-[#0F1012]/55",
    faint: "text-[#0F1012]/40",
  },

  glow: {
    veil:
      "bg-gradient-to-b from-[rgba(250,250,255,0.85)] via-[rgba(255,255,255,0.42)] to-transparent",
    breathe:
      "from-[rgba(255,255,255,0.92)] via-[rgba(245,245,255,0.55)] to-[rgba(255,255,255,0.82)]",
  },
};
