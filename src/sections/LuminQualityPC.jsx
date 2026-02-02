// src/sections/LuminQualityPC.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LuminQualityPC() {
  const sectionRef = useRef(null);

  /* ============================================================
     GSAP：TITLE → CARD 呼吸アニメ
  ============================================================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();

        // Title fade（位置変更しても動くように調整）
        tl.fromTo(
          el.querySelectorAll(".quality-title"),
          { opacity: 0, y: 26, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          }
        );

        // Card fade
        tl.fromTo(
          el.querySelectorAll(".quality-slit"),
          { opacity: 0, y: 42, filter: "blur(16px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.45,
            ease: "power3.out",
          },
          "-=0.6"
        );

gsap.to(".quality-slit", {
  scale: 1.003,    // ← 揺れない・でも呼吸の“気配”だけ残る
  duration: 8,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
});

        io.disconnect();
      },
      { threshold: 0.2 }
    );

    io.observe(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full hidden lg:block
        py-[20vh]
        overflow-hidden
        bg-[#F6F8FB]
      "
    >
      {/* BG：白銀グラデ */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(135deg,#ffffff_0%,#eef1f6_45%,#f7f8fa_100%)]
          opacity-[0.92]
        "
      />

      {/* ノイズ */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[url('/lumin/noise-fine.png')]
          opacity-[0.1]
          mix-blend-soft-light
        "
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-16">

        {/* =======================
             TITLE を外へ移動
        ======================= */}
        <div className="quality-title text-center mb-[10vh]">
          <p className="text-[0.82rem] tracking-[0.34em] text-[#0D0E11]/55 mb-3">
            LÜMIN — QUALITY STANDARD
          </p>
          <h2 className="font-title-2 text-[2.65rem] tracking-[0.22em] text-[#0D0E11]/80">
            BEAUTY OF PRECISION
          </h2>
          <div className="mx-auto mt-5 h-[1px] w-[190px] bg-[#0D0E11]/25" />
        </div>

        {/* ============================================================
            VISUAL + UNIFIED CARD
        ============================================================ */}
        <div
          className="
            quality-visual
            w-full h-[72vh]
            rounded-[32px]
            overflow-hidden
            mb-32
            relative
            shadow-[0_30px_60px_rgba(0,0,0,0.06)]
          "
        >
          {/* 背景画像 */}
          <img
            src="/lumin/abstract-metal-1.png"
            alt=""
            className="
              w-full h-full object-cover
              opacity-[0.9]
              mix-blend-lighten
            "
          />

          {/* 色温度フィルム */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(145deg,rgba(230,240,255,0.45)_0%,rgba(255,255,255,0.05)_80%)]
              backdrop-blur-[1px]
            "
          />

          {/* 統合カード */}
          <div
            className="
              quality-slit
              absolute bottom-[6vh] left-1/2 -translate-x-1/2
              w-[86%] max-w-[980px]
              p-14
              rounded-3xl
              bg-white/18 backdrop-blur-[18px]
              border border-white/35
              shadow-[0_18px_60px_rgba(0,0,0,0.06)]
              text-white/90
              leading-[1.95]
              text-[0.97rem]
              tracking-[0.04em]
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
        </div>

        {/* END COPY */}
        <p
          className="
            mt-[6vh]
            text-right
            text-[#0D0E11]/55
            text-[0.95rem]
            leading-[2]
            tracking-[0.22em]
            pr-2
          "
        >
          音が日常に馴染むとき、  
          プロダクトは初めて〈世界観〉になる。
        </p>

      </div>
    </section>
  );
}
