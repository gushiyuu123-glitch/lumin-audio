// src/sections/LuminConceptSP.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LuminConceptSP({
  sideImg = "/lumin/h1-side2.png",
  waveImg = "/lumin/frequency11.png",
  theme = "apple",
}) {
  const sectionRef = useRef(null);
  const waveRef = useRef(null);
  const sideRef = useRef(null);

  /* ===================================================
     Theme Tokens（SP最適化版）
  =================================================== */
  const T = {
    bg: "bg-[#F7F8FA]",
    inkStrong: "text-[#0F1012]/90",
    inkMid: "text-[#111214]/78",
    inkSoft: "text-[#1A1C20]/55",

    sideOpacity: 0.10,
    sideBlur: 1.4,
    waveOpacity: 0.12,
  };

  /* ===================================================
     GSAP（SPは「立ち上がり」だけ）
  =================================================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initial
      gsap.set(sideRef.current, {
        opacity: 0,
        filter: `blur(${14}px)`,
        y: 22,
      });
      gsap.set(waveRef.current, {
        opacity: 0,
        y: 18,
        scale: 1.04,
        filter: "blur(14px)",
      });
      gsap.set(
        [
          el.querySelector(".concept-label"),
          el.querySelector(".concept-title"),
          el.querySelector(".concept-hairline"),
        ],
        { opacity: 0, y: 14, filter: "blur(10px)" }
      );

      gsap.set(el.querySelectorAll(".concept-card"), {
        opacity: 0,
        y: 22,
        filter: "blur(12px)",
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          // side image
          tl.to(
            sideRef.current,
            {
              opacity: T.sideOpacity,
              y: 0,
              filter: `blur(${T.sideBlur}px)`,
              duration: 1.25,
            },
            0
          );

          // wave
          tl.to(
            waveRef.current,
            {
              opacity: T.waveOpacity,
              y: 0,
              scale: 1,
              filter: "blur(8px)",
              duration: 1.35,
            },
            0.2
          );

          // text
          tl.to(
            ".concept-label",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
            0.32
          );
          tl.to(
            ".concept-title",
            { opacity: 1, y: -2, filter: "blur(0px)", duration: 1.1 },
            0.40
          );
          tl.to(
            ".concept-hairline",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
            0.48
          );

          // cards
          tl.to(
            ".concept-card",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: 0.12,
            },
            0.56
          );

          io.disconnect();
        },
        { threshold: 0.18 }
      );

      io.observe(el);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className={`
        relative w-full overflow-hidden
        ${T.bg}
        pt-[18vh] pb-[20vh]
        px-8
      `}
    >
      {/* ===============================
          Side（影の気配）
      =============================== */}
      <img
        ref={sideRef}
        src={sideImg}
        alt=""
        aria-hidden
        className="
          absolute left-1/2
          -translate-x-[40%]
          top-[6%]
          w-[80vw] max-w-[420px]
          pointer-events-none select-none
          opacity-0
          mix-blend-multiply
        "
        style={{
          filter: `blur(${T.sideBlur}px)`,
        }}
      />

      {/* ===============================
          Wave（周波数の気配）
      =============================== */}
      <div
        ref={waveRef}
        aria-hidden
        className="
          absolute inset-x-0 bottom-[10vh]
          w-[72%] mx-auto
          pointer-events-none
          opacity-0
        "
      >
        <img
          src={waveImg}
          alt=""
          className="w-full object-contain mix-blend-multiply"
        />
      </div>

      {/* ===============================
          CONTENT
      =============================== */}
      <div className="relative z-10">
        <p
          className="
            concept-label text-center
            text-[0.72rem]
            tracking-[0.32em]
            text-black/50
            mb-8
          "
        >
          LÜMIN AUDIO — CONCEPT
        </p>

        <h2
          className="
            concept-title text-center
            font-title-2
            text-[1.9rem]
            tracking-[0.14em]
            text-black/80
            leading-[1.42] mb-6
            whitespace-pre-line
          "
        >
          音が形を持つとき、{"\n"}美しさは立ち上がる。
        </h2>

        {/* Vertical Light */}
        <div
          className="
            concept-hairline relative mx-auto
            w-[180px] h-[24px]
            mb-14 pointer-events-none
          "
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-[rgba(15,16,18,0.16)]" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[18px] h-full bg-gradient-to-b from-[rgba(15,16,18,0.12)] via-[rgba(15,16,18,0.04)] to-transparent blur-[8px]" />
        </div>

        {/* ===========================
            CARDS
        =========================== */}
        <div className="flex flex-col gap-14">
          <SPConceptCard
            title={`澄みきった\nクリアリティ`}
            body={`濁りを排し、細部まで\n透けるような透明音。`}
          />
          <SPConceptCard
            title={`輪郭まで\n研ぎ澄ました精度`}
            body={`微細な粒立ちまで\n正確に描く高解像サウンド。`}
          />
          <SPConceptCard
            title={`美しさが\n立ち上がる再現性`}
            body={`余韻や立体感が\n自然に宿る美の音響デザイン。`}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SP Concept Card（PCの半分の密度）
============================================================ */
function SPConceptCard({ title, body }) {
  return (
    <div className="concept-card opacity-0 relative">
      {/* 薄いAir Layer */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br
          from-[rgba(255,255,255,0.20)]
          via-[rgba(255,255,255,0.06)]
          to-transparent
          opacity-[0.35]
          blur-[24px]
        "
      />

      <div className="relative px-4 py-8">
        <h3
          className="
            font-title-2 text-[1.45rem]
            tracking-[0.10em]
            leading-[1.34]
            text-black/80 mb-4
            whitespace-pre-line
          "
        >
          {title}
        </h3>

        <p
          className="
            text-[0.95rem] leading-[1.9]
            text-black/60
            whitespace-pre-line
          "
        >
          {body}
        </p>
      </div>
    </div>
  );
}
