// src/sections/LuminSoundFeatures.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function LuminSoundFeatures({
  spectrumImg = "/lumin/spectrum1.png",
  microWaveImg = "/lumin/frequency11.png",
  sideImg = "/lumin/h1-side222.png",
  theme = "dior",
}) {
  const sectionRef = useRef(null);
  const spectrumRef = useRef(null);
  const microRef = useRef(null);
  const textRefs = useRef([]);
  const sideRef = useRef(null);

  /* ============================
       THEME TOKEN（Dior強め）
  ============================ */
  const T = useMemo(() => {
    const base = {
      inkTitle: "text-[#0F1012]/92",
      inkBody: "text-[#0F1012]/75",
      inkLabel: "text-[#111214]/70",
      veilA:
        "from-[rgba(250,250,255,0.88)] via-[rgba(255,255,255,0.52)] to-transparent",
      blend: "mix-blend-multiply",
    };

    return {
      ...base,
      bg: "bg-[#F5F6F7]", // Dior寄せの白
    };
  }, []);

  /* ============================
       ANIMATION
  ============================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.out" },
    });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;

        tl.fromTo(".lsf-label", { opacity: 0, y: 18 }, { opacity: 1, y: 0 });

        tl.fromTo(
          ".lsf-title",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0 },
          "-=0.55"
        );

        tl.to(
          textRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.16,
          },
          "-=0.45"
        );

        /* ==== 金属寄せ（AirPods Max） ==== */
        tl.fromTo(
          sideRef.current,
          { opacity: 0, y: 40, filter: "blur(20px)" },
          {
            opacity: 0.45,
            y: -2,
            filter: "blur(7px) brightness(1.04) contrast(1.022)",
            duration: 1.55,
            ease: "power3.out",
            onComplete: () => {
              gsap.to(sideRef.current, {
                filter:
                  "blur(4px) brightness(1.05) contrast(1.028) saturate(0.96)",
                duration: 1.8,
                ease: "sine.inOut",
              });
            },
          },
          "-=1.15"
        );

        tl.fromTo(
          spectrumRef.current,
          { opacity: 0, y: 26, filter: "blur(22px)" },
          { opacity: 0.18, y: 0, filter: "blur(6px)" },
          "-=1.2"
        );

        tl.fromTo(
          microRef.current,
          { opacity: 0, y: 16, filter: "blur(16px)" },
          { opacity: 0.12, y: 0, filter: "blur(3px)" },
          "-=1.3"
        );

        io.disconnect();
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ============================
       RENDERING
  ============================ */
  return (
    <section
      ref={sectionRef}
      id="sound-features"
      className={`relative w-full overflow-hidden ${T.bg} pt-[38vh] pb-[28vh]`}
    >
      {/* ============================
          BACKGROUND（Dior × Apple）
      ============================ */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">

        {/* ★ 金属ノイズ（Apple白銀ノイズ 2.4%） */}
        <div
          className="
            absolute inset-0
            bg-[url('/lumin/noise-metal.png')]
            opacity-[0.024]
            mix-blend-soft-light
            pointer-events-none
          "
        />

        <img
          ref={spectrumRef}
          src={spectrumImg}
          alt=""
          className={`
            absolute left-1/2 top-[14%] -translate-x-1/2
            w-[90%] max-w-[1500px]
            ${T.blend}
            opacity-0
          `}
        />

        <img
          ref={microRef}
          src={microWaveImg}
          alt=""
          className={`
            absolute left-1/2 bottom-[10%] -translate-x-1/2
            w-[84%] max-w-[1400px]
            ${T.blend}
            opacity-0
          `}
        />

        {/* ★ Diorベール × Appleライトフォール */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-b
            ${T.veilA}
            opacity-[0.70]
            blur-[42px]
          `}
        />
      </div>

      {/* ============================
          CONTENT
      ============================ */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-12">

        <p
          className={`lsf-label text-[0.75rem] text-center tracking-[0.34em] ${T.inkLabel} mb-10`}
        >
          LÜMIN AUDIO — SOUND FEATURES
        </p>

        <h2
          className={`
            lsf-title
            text-center font-title-2
            text-[2.4rem] leading-[1.32] tracking-[0.14em]
            ${T.inkTitle}
            mb-24
            -mt-2
          `}
        >
          音が“空気の中で立つ”瞬間を、ていねいにデザインする。
        </h2>

        {/* ============================
              2 COLUMN
        ============================ */}
        <div className="grid grid-cols-12 gap-14 items-start">

          {/* LEFT TEXT */}
          <div className="col-span-7 space-y-20 -mt-[-35px] ml-[60px]">
            <LongText
              idx={0}
              refs={textRefs}
              T={T}
              text={`音には「内部構造」がある。\n粒立ち、倍音、空気、余韻、輪郭。\nこれらが整列すると、音は“静かな立体感”を帯びる。`}
            />

            <LongText
              idx={1}
              refs={textRefs}
              T={T}
              text={`LÜMIN AUDIO が追求するのは“密度”。\n派手さではなく、深い透明さ。\n余白のある音こそが、空間を変える力を持つ。`}
            />

            <LongText
              idx={2}
              refs={textRefs}
              T={T}
              text={`解析とは、削ぎ落とすこと。\n余計を排し、音そのものの輪郭だけを残す。\nその静けさに、美しさは宿る。`}
            />
          </div>

          {/* RIGHT IMAGE（AirPods Max寄せ） */}
          <div className="col-span-5 relative">
            <img
              ref={sideRef}
              src={sideImg}
              alt="Lümin Right Visual"
              className="
                absolute
                left-1/2 -translate-x-[40%]
                top-[30px]
                w-[108%]
                h-auto
                object-contain
                opacity-0

                drop-shadow-[0_32px_55px_rgba(255,255,255,0.12)]
                brightness-[1.04]
                contrast-[1.02]
                saturate-[0.96]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   SUB COMPONENT
============================ */
function LongText({ idx, text, refs, T }) {
  return (
    <p
      ref={(el) => (refs.current[idx] = el)}
      className={`
        opacity-0 translate-y-[18px]
        text-[1.06rem] leading-[2.28]
        tracking-[0.02em]
        ${T.inkBody}
        whitespace-pre-line
      `}
    >
      {text}
    </p>
  );
}
