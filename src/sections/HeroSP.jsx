// src/sections/HeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const heroRef = useRef(null);
  const productRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ============================
         ① Heroフェードイン（SP軽量版）
      ============================ */
      gsap.fromTo(
        productRef.current,
        { opacity: 0, y: 18, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out",
        }
      );

      /* ============================
         ② 中央波紋（1つに統合）
      ============================ */
      gsap.to(rippleRef.current, {
        scale: 1.08,
        opacity: 0.14,
        duration: 5.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ============================
         ③ 製品の呼吸（中央に1本）
      ============================ */
      gsap.to(productRef.current, {
        y: -14,
        duration: 4.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="
        relative w-full min-h-[92vh]
        overflow-hidden
        bg-[#f6f7f9]
        text-[#1a1c1f]
        pt-[98px] pb-[14vh]
        flex flex-col items-center
      "
    >
      {/* ===== 背景：SP専用薄銀グラデ ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0
          bg-[url('/bg/lumin-bg-white.png')] bg-cover bg-center
          opacity-[0.22]
        "
      />

      {/* ===== エアスモーク（軽い薄膜） ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0 pointer-events-none
          bg-[url('/bg/lumin-smoke.png')] bg-cover bg-center
          opacity-[0.08] blur-[32px]
        "
        style={{
          maskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 30%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0) 75%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 30%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0) 75%)",
        }}
      />

      {/* ===== Hero Copy ===== */}
      <div
        className="
          relative z-10 text-center
          px-6 mb-10
          tracking-[0.22em]
        "
      >
        <p className="text-[0.75rem] text-black/45 font-eng leading-[2]">
          LÜMIN AUDIO — SOUND FORMS THE WORLD
        </p>

        <h1
          className="
            mt-4 text-[2.2rem]
            font-title-2 text-black/80
            leading-[1.28]
          "
        >
          音が、世界を変える。
        </h1>
      </div>

      {/* ===== 波紋 ===== */}
      <div
        ref={rippleRef}
        aria-hidden
        className="
          absolute top-[38%]
          w-[320px] h-[320px]
          rounded-full
          bg-[radial-gradient(circle,rgba(160,180,240,0.22),rgba(200,210,240,0))]
          blur-[2px]
          z-[1]
        "
      />

      {/* ===== 製品画像（中央） ===== */}
      <div className="relative z-[2] w-full flex flex-col items-center">
        <img
          ref={productRef}
          src="/lumin/h22.png"
          alt="Lümin H1"
          className="
            w-[64vw] max-w-[340px]
            drop-shadow-[0_16px_40px_rgba(0,0,0,0.16)]
            select-none pointer-events-none
            will-change-transform
          "
        />

        {/* ===== 影 ===== */}
        <div
          aria-hidden
          className="
            w-[200px] h-[28px]
            bg-black/10 blur-[22px]
            rounded-full mt-6
          "
        />
      </div>

      {/* ===== CTA ===== */}
      <a
        href="#headphone"
        className="
          mt-10 px-10 py-3
          border border-black/20
          text-black/70 text-xs tracking-[0.14em]
          hover:bg-black/5
          transition-all duration-300
          relative z-[3]
        "
      >
        H1 ヘッドフォンを見る
      </a>
    </section>
  );
}
