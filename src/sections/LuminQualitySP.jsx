// src/sections/LuminQualitySP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LuminQualitySP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".quality-title-sp"),
      { opacity: 0, y: 22, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      q(".quality-card-sp"),
      { opacity: 0, y: 30, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power2.out",
        stagger: 0.14,
        delay: 0.15,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full lg:hidden
        overflow-hidden
        py-[14vh]
        bg-[#F6F8FB]
        px-6
      "
    >
      {/* BG：白銀グラデ */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(135deg,#ffffff_0%,#edf0f4_45%,#f3f5f8_100%)]
          opacity-[0.95]
        "
      />

      {/* ノイズ */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[url('/lumin/noise-fine.png')]
          opacity-[0.10]
          mix-blend-soft-light
        "
      />

      <div className="relative z-10">

        {/* TITLE */}
        <div className="quality-title-sp text-center mb-[10vh]">
          <p className="text-[0.7rem] tracking-[0.30em] text-[#111214]/55 mb-2">
            LÜMIN — QUALITY STANDARD
          </p>

          <h2 className="font-title-2 text-[1.85rem] tracking-[0.16em] text-[#111214]/85 leading-[1.45]">
            BEAUTY OF PRECISION
          </h2>

          <div className="mx-auto mt-4 h-[1px] w-[130px] bg-[#111214]/25" />
        </div>

        {/* VISUAL */}
        <div
          className="
            w-full
            rounded-[22px]
            overflow-hidden
            shadow-[0_18px_40px_rgba(0,0,0,0.05)]
            mb-16
            relative
          "
        >
          <img
            src="/lumin/abstract-metal-1.png"
            alt=""
            className="
              w-full h-[40vh]
              object-cover
              mix-blend-lighten
              opacity-[0.88]
            "
          />

          {/* 薄銀膜 */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(145deg,rgba(230,235,245,0.50)_0%,rgba(255,255,255,0.12)_80%)]
              backdrop-blur-[1px]
            "
          />
        </div>

        {/* UNIFIED CARD */}
        <div
          className="
            quality-card-sp
            w-full
            rounded-[22px]
            p-9
            bg-[rgba(235,238,243,0.40)]
            backdrop-blur-[14px]
            border border-black/[0.05]
            shadow-[0_14px_38px_rgba(0,0,0,0.05)]
            text-[#0D0E11]/80
            leading-[1.85]
            text-[0.95rem]
            tracking-[0.02em]
            whitespace-pre-line
          "
        >
{`静けさを基準に組まれた品質設計。

音が濁らず、粒が崩れず、余韻が自然にほどけるためには、
透明度・素材・装着性は分けて考えることはできない。

光、重心、耳に触れる圧。
わずかな違和感が、音の美しさを失わせてしまう。

だから LÜMIN は、音・素材・形状を
“ひとつの美学”として統合し、
触れた瞬間にストレスの影を消すように設計している。

精度とは、機能ではなく “心地よさの質感” である。`}
        </div>

        {/* END TEXT */}
        <p
          className="
            mt-[8vh]
            text-right
            text-[#0D0E11]/55
            text-[0.85rem]
            leading-[1.8]
            tracking-[0.20em]
            pr-1
          "
        >
          音が日常に馴染むとき、<br></br>  
          プロダクトは初めて〈世界観〉になる。
        </p>
      </div>
    </section>
  );
}
