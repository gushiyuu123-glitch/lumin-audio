// src/sections/ProductIntroBandSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProductIntroBandSP() {
  const bandRef = useRef(null);

  useEffect(() => {
    if (!bandRef.current) return;

    // ===== 金属フィルム呼吸（SP版：揺れ少なめ）=====
    gsap.to(".metal-film-sp", {
      scale: 1.015,
      duration: 7.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={bandRef}
      className="
        relative w-full text-center overflow-hidden
        py-[18vh]
        bg-gradient-to-b
        from-white via-[#f5f6f8]/70 to-[#f7f8fa]
      "
    >
      {/* --- 背景：白銀メタルフィルム（SP圧縮版） --- */}
      <div
        aria-hidden
        className="
          metal-film-sp
          absolute inset-0
          bg-[url('/lumin/noise-ultrafine.png')]
          opacity-[0.06]
          mix-blend-soft-light
          scale-[1]
          blur-[18px]
          pointer-events-none
        "
      />

      {/* --- Hairline（Apple アルミ端：SP黄金比）--- */}
      <div className="relative w-[62%] h-[1px] mx-auto mb-7">
        {/* core line */}
        <div className="absolute inset-0 bg-[#0F1012]/20" />
        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/45" />
        {/* bottom airy shadow */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/5 blur-[1px]" />
      </div>

      {/* --- LABEL（Apple Ink Gray SP） --- */}
      <p
        className="
          text-[0.75rem]
          tracking-[0.34em]
          text-[rgba(20,22,26,0.60)]
          font-eng
          select-none
        "
      >
        PRODUCT LINE — LÜMIN SERIES
      </p>

      {/* --- Sub Hairline（Apple Music 薄光） --- */}
      <div className="relative mt-8 w-[58%] h-[1px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/12 to-transparent" />
      </div>
    </section>
  );
}
