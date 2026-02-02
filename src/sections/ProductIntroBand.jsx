// src/sections/ProductIntroBand.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProductIntroBand() {
  const bandRef = useRef(null);

  useEffect(() => {
    if (!bandRef.current) return;

    // ===== 金属フィルム呼吸 =====
    gsap.to(".metal-film", {
      scale: 1.025,
      duration: 6.8,
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
        py-[24vh]
        bg-gradient-to-b
        from-white via-[#f5f6f8]/70 to-[#f7f8fa]
      "
    >
      {/* --- 背景：白銀メタルフィルム（Apple Vision Pro質感） --- */}
      <div
        aria-hidden
        className="
          metal-film
          absolute inset-0
          bg-[url('/lumin/noise-ultrafine.png')]
          opacity-[0.06]
          mix-blend-soft-light
          scale-[1]
          blur-[22px]
          pointer-events-none
        "
      />

      {/* --- Hairline（Appleアルミ端 × 立体） --- */}
      <div className="relative w-[46%] h-[1px] mx-auto mb-8">
        {/* core line */}
        <div className="absolute inset-0 bg-[#0F1012]/18" />
        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
        {/* bottom shadow */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/5 blur-[1px]" />
      </div>

      {/* --- LABEL（Apple Ink Gray） --- */}
      <p
        className="
          text-[0.88rem]
          tracking-[0.34em]
          text-[rgba(20,22,26,0.62)]
          font-eng
          select-none
        "
      >
        PRODUCT LINE — LÜMIN SERIES
      </p>

      {/* --- Sub Hairline（Apple Musicの薄光） --- */}
      <div className="relative mt-10 w-[40%] h-[1px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent" />
      </div>
    </section>
  );
}
