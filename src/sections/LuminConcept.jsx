// src/sections/LuminConcept.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   LÜMIN — CONCEPT SECTION（Apple白銀 100点版）
   - 左右画像：影として“存在だけ置く”（Apple寄せ）
   - タイトル下：Apple Music風の“薄い縦光”
   - カード：箱感ゼロ、空気の層をさらに薄く（純正寄せ）
   - wave：動的class崩れ回避（styleで管理）
   - GSAP：呼吸ではなく“立ち上がりの空気”に統一
============================================================ */

export default function LuminConcept({
  leftImg = "/lumin/h1-side1.png",
  rightImg = "/lumin/h1-side2.png",
  waveImg = "/lumin/frequency11.png",
  theme = "apple",
}) {
  const sectionRef = useRef(null);
  const waveRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  /* ------------------------------------------------------------
      Theme Tokens（Apple純正寄せ）
  ------------------------------------------------------------ */
  const T = useMemo(() => {
    const apple = {
      bg: "bg-[#F7F8FA]",
      inkStrong: "text-[#0F1012]/90",
      inkMid: "text-[#111214]/80",
      inkSoft: "text-[#1A1C20]/60",

      // sides as shadow (more subtle than before)
      sideOpacity: 0.12,
      sideBlurPx: 1.2,
      sideBlend: "mix-blend-multiply",
      sideSaturate: 0.7,

      // wave (subtle)
      waveOpacity: 0.14,
      waveBlend: "mix-blend-multiply",
      waveBlurPx: 1.2,

      // veils
      veilTop:
        "from-[rgba(255,255,255,0.92)] via-[rgba(255,255,255,0.55)] to-transparent",
      veilDeep:
        "from-[rgba(235,238,246,0.58)] via-[rgba(255,255,255,0.12)] to-transparent",
      shadowBottom:
        "from-[rgba(12,14,18,0.10)] via-[rgba(12,14,18,0.04)] to-transparent",
    };

    const dior = {
      ...apple,
      bg: "bg-[#F3F4F6]",
      sideOpacity: 0.10,
      waveOpacity: 0.12,
    };

    return theme === "dior" ? dior : apple;
  }, [theme]);

  /* ------------------------------------------------------------
      GSAP Motion（空気の立ち上がり：Apple寄せ）
  ------------------------------------------------------------ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 初期値
      gsap.set([leftRef.current, rightRef.current], {
        opacity: 0,
        filter: `blur(${Math.max(10, T.sideBlurPx * 12)}px)`,
      });
      gsap.set(waveRef.current, {
        opacity: 0,
        y: 22,
        scale: 1.06,
        filter: "blur(18px)",
      });
      gsap.set(
        [
          el.querySelector(".lumin-concept-label"),
          el.querySelector(".lumin-concept-title"),
          el.querySelector(".lumin-concept-hairline"),
        ],
        { opacity: 0, y: 14, filter: "blur(10px)" }
      );
      gsap.set(el.querySelectorAll(".lumin-concept-card"), {
        opacity: 0,
        y: 22,
        filter: "blur(12px)",
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          // sides: “影”として静かに入る（中央の邪魔をしない）
          tl.to(
            leftRef.current,
            {
              opacity: T.sideOpacity,
              x: -10,
              y: 6,
              filter: `blur(${T.sideBlurPx}px)`,
              duration: 1.35,
            },
            0
          );
          tl.to(
            rightRef.current,
            {
              opacity: T.sideOpacity,
              x: 10,
              y: 6,
              filter: `blur(${T.sideBlurPx}px)`,
              duration: 1.35,
            },
            0.06
          );

          // wave: うっすら浮上（Apple Musicの“気配”）
          tl.to(
            waveRef.current,
            {
              opacity: 1,
              y: -6,
              scale: 1,
              filter: `blur(${T.waveBlurPx}px)`,
              duration: 1.65,
              ease: "power2.out",
            },
            0.22
          );

          // text: label → title → hairline
          tl.to(
            ".lumin-concept-label",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05 },
            0.34
          );
          tl.to(
            ".lumin-concept-title",
            { opacity: 1, y: -4, filter: "blur(0px)", duration: 1.18 },
            0.42
          );
          tl.to(
            ".lumin-concept-hairline",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
            0.55
          );

          // cards: 箱感ゼロ、空気だけ（薄く・揃えて）
          tl.to(
            ".lumin-concept-card",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.18,
              stagger: 0.16,
            },
            0.62
          );

          io.disconnect();
        },
        { threshold: 0.2 }
      );

      io.observe(el);
    }, sectionRef);

    return () => ctx.revert();
  }, [T]);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className={`
        relative w-full overflow-hidden
        ${T.bg}
        py-[54vh]
      `}
    >
      {/* ============================================================
          BACKGROUND VEILS（Apple純正の白膜）
      ============================================================ */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Top glow */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-b
            ${T.veilTop}
            opacity-[0.92]
          `}
        />

        {/* Deep veil */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-b
            ${T.veilDeep}
            blur-[42px]
            opacity-[0.50]
          `}
        />

        {/* Bottom shadow */}
        <div
          className={`
            absolute inset-x-0 bottom-0 h-[18vh]
            bg-gradient-to-t ${T.shadowBottom}
          `}
        />
      </div>

      {/* ============================================================
          CENTER LIGHT（“薄い縦光” Apple Music風）
      ============================================================ */}
      <div
        aria-hidden
        className="
          absolute inset-y-0 left-1/2 -translate-x-1/2
          w-[1.6px] opacity-[0.48]
          pointer-events-none
        "
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,16,18,0.12)] via-[rgba(15,16,18,0.05)] to-transparent blur-[12px]" />
      </div>

      {/* ============================================================
          SIDE IMAGES（影として置く：Apple寄せ）
      ============================================================ */}
      <img
        ref={leftRef}
        aria-hidden
        src={leftImg}
        alt=""
        className={`
          absolute left-[-4vw] top-1/2 -translate-y-1/2
          w-[40vw] max-w-[420px]
          select-none pointer-events-none
          ${T.sideBlend}
        `}
        style={{
          filter: `blur(${T.sideBlurPx}px) saturate(${T.sideSaturate})`,
          opacity: 0,
        }}
      />

      <img
        ref={rightRef}
        aria-hidden
        src={rightImg}
        alt=""
        className={`
          absolute right-[-4vw] top-1/2 -translate-y-1/2
          w-[40vw] max-w-[420px]
          select-none pointer-events-none
          ${T.sideBlend}
        `}
        style={{
          filter: `blur(${T.sideBlurPx}px) saturate(${T.sideSaturate})`,
          opacity: 0,
        }}
      />

      {/* ============================================================
          WAVE（動的opacityはstyleで管理：崩れ防止）
      ============================================================ */}
      <div
        ref={waveRef}
        aria-hidden
        className="
          absolute inset-x-0
          bottom-[-22vh]
          w-[84%] mx-auto
          pointer-events-none
        "
        style={{ opacity: 0 }}
      >
        <img
          src={waveImg}
          alt=""
          className={`w-full object-contain ${T.waveBlend}`}
          style={{
            opacity: T.waveOpacity,
            filter: `blur(${T.waveBlurPx}px)`,
          }}
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <div className="relative z-10 mx-auto max-w-[1180px] px-10 -mt-[18vh]">
        <p
          className={`
            lumin-concept-label text-center
            text-[0.78rem] tracking-[0.34em]
            ${T.inkSoft} mb-10
          `}
        >
          LÜMIN AUDIO — CONCEPT
        </p>

        <h2
          className={`
            lumin-concept-title text-center
            font-title-2 text-[2.4rem]
            tracking-[0.16em]
            ${T.inkStrong}
            leading-[1.35]
            mb-7
          `}
        >
          音が形を持つとき、美しさは立ち上がる。
        </h2>

        {/* Apple Music風：タイトル直下の薄い縦光（“落ちる光”） */}
        <div
          className="
            lumin-concept-hairline
            relative mx-auto
            w-[220px] h-[34px]
            mb-20
            pointer-events-none
          "
        >
          {/* center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-[rgba(15,16,18,0.16)]" />
          {/* bloom */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[20px] h-full bg-gradient-to-b from-[rgba(15,16,18,0.12)] via-[rgba(15,16,18,0.04)] to-transparent blur-[10px]" />
        </div>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-20">
          <ConceptCard
            title="澄みきったクリアリティ"
            body={`濁りを排し、細部まで\n透けるような透明音。`}
            theme={T}
          />
          <ConceptCard
            title="輪郭まで研ぎ澄ました精度"
            body={`微細な粒立ちまで\n正確に描く高解像サウンド。`}
            theme={T}
          />
          <ConceptCard
            title="美しさが立ち上がる再現性"
            body={`余韻や立体感が\n自然に宿る美の音響デザイン。`}
            theme={T}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Card（箱感ゼロ / Apple純正：さらに薄い空気）
============================================================ */
function ConceptCard({ title, body, theme }) {
  return (
    <div className="lumin-concept-card opacity-0 relative">
      {/* ultra-thin air layer (thinner than before) */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br
          from-[rgba(255,255,255,0.26)]
          via-[rgba(255,255,255,0.07)]
          to-transparent
          opacity-[0.42]
          blur-[30px]
        "
      />

      {/* micro inner shadow: “銀の内側の気配” */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]
          opacity-[0.55]
        "
      />

      <div className="relative px-6 py-10">
        <h3
          className={`
            font-title-2 text-[1.7rem]
            tracking-[0.12em]
            leading-[1.32]
            ${theme.inkStrong}
            mb-6
          `}
        >
          {title}
        </h3>

        <p
          className={`
            text-[1rem] leading-[2.1]
            ${theme.inkMid}
            whitespace-pre-line
          `}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
