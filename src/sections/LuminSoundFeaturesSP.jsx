// src/sections/LuminSoundFeaturesSP.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   LÜMIN — SOUND FEATURES（SP 最適化版 100点）
   - Apple × Dior の白銀世界観を維持しつつ、縦構成へ
   - 金属サイド画像は "気配" として中央奥に置く
   - 背景スペクトラムは「音の影」として薄く配置
   - GSAP は立ち上がりだけ（軽量・破綻防止）
============================================================ */

export default function LuminSoundFeaturesSP({
  spectrumImg = "/lumin/spectrum1.png",
  microWaveImg = "/lumin/frequency11.png",
  sideImg = "/lumin/h1-side222.png",
}) {
  const sectionRef = useRef(null);
  const spectrumRef = useRef(null);
  const microRef = useRef(null);
  const sideRef = useRef(null);
  const textRefs = useRef([]);

  /* ============================================================
     GSAP（SP：立ち上がりだけ / 呼吸なし）
  ============================================================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out" },
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        tl.fromTo(".lsfsp-label", { opacity: 0, y: 18 }, { opacity: 1, y: 0 });

        tl.fromTo(
          ".lsfsp-title",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0 },
          "-=0.55"
        );

        tl.to(
          textRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.18,
          },
          "-=0.45"
        );

        tl.fromTo(
          sideRef.current,
          { opacity: 0, y: 22, filter: "blur(22px)" },
          {
            opacity: 0.32,
            y: 0,
            filter: "blur(7px) brightness(1.03) contrast(1.02)",
            duration: 1.4,
          },
          "-=0.8"
        );

        tl.fromTo(
          spectrumRef.current,
          { opacity: 0, y: 16, filter: "blur(20px)" },
          { opacity: 0.16, y: 0, filter: "blur(6px)" },
          "-=1.0"
        );

        tl.fromTo(
          microRef.current,
          { opacity: 0, y: 14, filter: "blur(14px)" },
          { opacity: 0.12, y: 0, filter: "blur(3px)" },
          "-=1.1"
        );

        io.disconnect();
      },
      { threshold: 0.22 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sound-features"
      className="
        relative w-full overflow-hidden
        bg-[#F5F6F7]
        pt-[20vh] pb-[18vh]
        px-8
      "
    >
      {/* ============================================================
          背景（Apple × Diorの白銀）
      ============================================================= */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">

        {/* 薄い金属ノイズ（SP版：強さ 1.8%） */}
        <div
          className="
            absolute inset-0
            bg-[url('/lumin/noise-metal.png')]
            opacity-[0.018]
            mix-blend-soft-light
          "
        />

        {/* 上：音スペクトラム（影として） */}
        <img
          ref={spectrumRef}
          src={spectrumImg}
          alt=""
          className="
            absolute left-1/2 -translate-x-1/2
            top-[12%]
            w-[92%]
            opacity-0
            mix-blend-multiply
          "
        />

        {/* 下：micro wave（“揺らぎの気配”） */}
        <img
          ref={microRef}
          src={microWaveImg}
          alt=""
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-[8%]
            w-[80%]
            opacity-0
            mix-blend-multiply
          "
        />

        {/* Dior veil（白膜） */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-[rgba(250,250,255,0.85)]
            via-[rgba(255,255,255,0.48)]
            to-transparent
            blur-[38px]
            opacity-[0.75]
          "
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================= */}
      <div className="relative z-10 text-center">

        {/* LABEL */}
        <p
          className="
            lsfsp-label text-[0.72rem]
            tracking-[0.32em]
            text-black/55
            mb-8
          "
        >
          LÜMIN AUDIO — SOUND FEATURES
        </p>

        {/* TITLE */}
        <h2
          className="
            lsfsp-title
            font-title-2
            text-[1.8rem] leading-[1.38]
            tracking-[0.14em]
            text-black/85
            mb-16
          "
        >
          音が“空気の中で立つ”瞬間を、<br />
          ていねいにデザインする。
        </h2>

        {/* SIDE IMAGE（中央奥） */}
        <div className="relative w-full flex justify-center mb-20">
          <img
            ref={sideRef}
            src={sideImg}
            alt="Lümin Visual"
            className="
              w-[78%]
              opacity-0
              drop-shadow-[0_22px_45px_rgba(255,255,255,0.12)]
            "
          />
        </div>

        {/* TEXT BLOCKS */}
        <div className="space-y-14 text-left mx-auto max-w-[620px]">
          <SPText
            idx={0}
            refs={textRefs}
            text={`音には「内部構造」がある。\n粒立ち、倍音、空気、余韻、輪郭。\nこれらが整列すると、音は“静かな立体感”を帯びる。`}
          />

          <SPText
            idx={1}
            refs={textRefs}
            text={`LÜMIN AUDIO が追求するのは“密度”。\n派手さではなく、深い透明さ。\n余白のある音こそが、空間を変える力を持つ。`}
          />

          <SPText
            idx={2}
            refs={textRefs}
            text={`解析とは、削ぎ落とすこと。\n余計を排し、音そのものの輪郭だけを残す。\nその静けさに、美しさは宿る。`}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   テキストブロック（Apple SPの行間）
============================================================ */
function SPText({ idx, text, refs }) {
  return (
    <p
      ref={(el) => (refs.current[idx] = el)}
      className="
        opacity-0 translate-y-[18px]
        text-[0.95rem] leading-[1.95]
        text-black/70 whitespace-pre-line
        tracking-[0.02em]
      "
    >
      {text}
    </p>
  );
}
