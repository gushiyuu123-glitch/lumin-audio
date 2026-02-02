import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const rippleCenter = useRef(null);
  const rippleLeft = useRef(null);
  const rippleRight = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ========================================
         ① Ultra Smooth フェードイン（白銀最適化）
      ======================================== */
      gsap.fromTo(
        [leftRef.current, rightRef.current],
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.9,
          ease: "power3.out",
        }
      );

      /* ========================================
         ② 中央波紋（薄銀の呼吸）
      ======================================== */
      gsap.to(rippleCenter.current, {
        scale: 1.12,
        opacity: 0.10,
        duration: 6.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ========================================
         ③ 左右の波紋（重心最適化）
      ======================================== */
      gsap.to(rippleLeft.current, {
        scale: 1.15,
        opacity: 0.08,
        duration: 6.0,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rippleRight.current, {
        scale: 1.15,
        opacity: 0.08,
        duration: 6.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ========================================
         ④ 製品の呼吸（浮遊量そろえた完全版）
      ======================================== */
      gsap.to(leftRef.current, {
        y: -28,
        duration: 4.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rightRef.current, {
        y: -32, // ← 右だけ少し深く浮遊（黄金比補正）
        duration: 5.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ========================================
         ⑤ スクロールで波紋を少しだけ強調
      ======================================== */
      gsap.to(
        [rippleCenter.current, rippleLeft.current, rippleRight.current],
        {
          opacity: "+=0.03",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "top+=100 top",
            scrub: true,
          },
        }
      );

      /* ========================================
         ⑥ テキストフェード（白銀版）
      ======================================== */
      gsap.from(".hero-copy > *", {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.16,
        delay: 0.25,
      });

      /* ========================================
         ⑦ 3D揺らぎ（Appleの空気の歪み）
      ======================================== */
      gsap.to(leftRef.current, {
        rotateY: -1.4,
        rotateX: 0.8,
        duration: 6.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rightRef.current, {
        rotateY: 1.4,
        rotateX: -0.8,
        duration: 7.0,
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
        relative w-full h-screen
        bg-[#f5f6f8]
        overflow-hidden text-[#1a1c1f]
        flex flex-col justify-center
        will-change-transform
      "
    >
      {/* ===== 背景：白銀グラデ ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0 pointer-events-none
          bg-[url('/bg/lumin-bg-white.png')] bg-cover bg-center
          opacity-[0.28]
          will-change-transform transform-gpu
        "
      />

      {/* ===== 霧（Air Mist Layer：白銀版） ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0 pointer-events-none
          bg-[url('/bg/lumin-smoke.png')] bg-cover bg-center
          opacity-[0.10]
          mix-blend-lighten
          blur-[38px]
        "
        style={{
          maskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 32%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0) 72%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 32%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0) 72%)",
        }}
      />

      {/* ===== 中央波紋 ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-[1]
          pointer-events-none flex items-center justify-center
        "
      >
        <div
          ref={rippleCenter}
          className="
            ripple-center w-[520px] h-[520px]
            rounded-full 
            bg-[radial-gradient(circle,rgba(170,190,255,0.25),rgba(200,210,240,0))]
          "
        />
      </div>

      {/* ===== 製品配置（完全黄金比） ===== */}
    <div
  className="
    relative z-10
    w-full max-w-[1500px] mx-auto
    flex items-center justify-between   /* ← 修正 */
    px-24 mt-24                      /* ← 下げ量を効かせる */
  "
  style={{ perspective: "1800px", perspectiveOrigin: "50% 40%" }}
>

{/* === LEFT → S1 === */}
<div className="w-1/2 flex flex-col items-center translate-x-[-180px] relative">
  <div
    ref={rippleRight}
    className="
      ripple-local w-[440px] h-[440px] rounded-full absolute top-[10%]
      bg-[radial-gradient(circle,rgba(170,190,255,0.20),rgba(200,210,240,0))]
    "
  />

  {/* 浮遊影 */}
  <div
    aria-hidden
    className="
      absolute bottom-[-14px]
      w-[260px] h-[36px]
      bg-black/12 blur-[26px] rounded-full
    "
  />

  <img
    ref={leftRef}
    src="/lumin/s22.png"
    alt="Lümin S1 Earphone"
    className="
      w-[34vw] max-w-[380px]
      select-none pointer-events-none
      drop-shadow-[0_14px_40px_rgba(0,0,0,0.12)]
      -translate-y-[28px]    /* ← 少しだけ下げた */
      will-change-transform
    "
  />

  <div className="flex flex-col items-center mt-7 min-h-[130px]">
    <p className="font-title-2 text-[1.2rem] tracking-[0.18em] text-black/70">
      LÜMIN S1 — セラミックホワイト
    </p>

    <a
      href="#earphone"
      className="
        mt-6 px-8 py-3
        border border-black/20
        text-black/70 text-xs tracking-[0.14em]
        hover:bg-black/5 transition-all duration-300
        pointer-events-auto
      "
    >
      S1 イヤホンを見る
    </a>
  </div>
</div>


{/* === RIGHT → H1（完全100点版） === */}
<div
  className="
    w-1/2 flex flex-col items-center
    translate-x-[180px]
    relative
  "
>
  <div
    ref={rippleLeft}
    className="
      ripple-local w-[420px] h-[420px] rounded-full absolute top-[18%]
      bg-[radial-gradient(circle,rgba(170,190,255,0.20),rgba(200,210,240,0))]
    "
  />

  {/* 浮遊影（軽量化） */}
  <div
    aria-hidden
    className="
      absolute bottom-[-16px]
      w-[280px] h-[34px]
      bg-black/10 blur-[26px] rounded-full
    "
  />

  <img
    ref={rightRef}
    src="/lumin/h22.png"
    alt="Lümin H1 Headphone"
    className="
      w-[28vw] max-w-[380px]
      select-none pointer-events-none
      drop-shadow-[0_18px_48px_rgba(0,0,0,0.14)]
      -translate-y-[26px]   /* ← 右も少し下げ */
      will-change-transform
    "
  />

  <div className="flex flex-col items-center mt-7 min-h-[130px]">
    <p className="font-title-2 text-[1.2rem] tracking-[0.18em] text-black/70">
      LÜMIN H1 — マットブラック
    </p>

    <a
      href="#headphone"
      className="
        mt-6 px-8 py-3
        border border-black/20
        text-black/70 text-xs tracking-[0.14em]
        hover:bg-black/5 transition-all duration-300
        pointer-events-auto
      "
    >
      H1 ヘッドフォンを見る
    </a>
  </div>
</div>

      </div>

      {/* ===== COPY ===== */}
      <div
        className="
          hero-copy relative z-20
          w-full text-center
          mt-25 tracking-[0.22em]
        "
      >
        <p className="text-[0.9rem] text-black/50 font-eng">
          LÜMIN AUDIO — SOUND FORMS THE WORLD
        </p>

        <h1
          className="
            text-[4rem]
            font-title-2 text-black/80
            leading-[1.28] mt-4
          "
        >
          音が、世界を変える。
        </h1>
      </div>
    </section>
  );
}
