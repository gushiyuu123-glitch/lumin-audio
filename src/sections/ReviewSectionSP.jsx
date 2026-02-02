// src/sections/ReviewSectionSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ReviewSectionSP() {
  const sectionRef = useRef(null);
  const [page, setPage] = useState(0);

  /* -------------------------------------- */
  /* STAR RATING（SP最適：小型・銀グラデ） */
  /* -------------------------------------- */
  const StarRating = ({ score }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFull = score >= i;
      const isHalf = score >= i - 0.5 && score < i;

    stars.push(
  <div key={i} className="relative w-[18px] h-[18px]">
    {/* BASE */}
    <svg
      viewBox="0 0 24 24"
      className="absolute inset-0"
      fill="rgba(0,0,0,0.06)"
      stroke="rgba(13,14,17,0.32)"
      strokeWidth="1.1"
    >
      <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.1 5.03a.56.56 0 0 0 .47.35l5.32.46a.56.56 0 0 1 .32.99l-4.04 3.46a.56.56 0 0 0-.18.56l1.21 5.22a.56.56 0 0 1-.84.61l-4.58-2.72a.56.56 0 0 0-.59 0l-4.58 2.72a.56.56 0 0 1-.84-.61l1.21-5.22a.56.56 0 0 0-.18-.56L2.26 9.83a.56.56 0 0 1 .32-.99l5.32-.46a.56.56 0 0 0 .47-.35L11.48 3.5Z" />
    </svg>

    {/* FILL */}
    {(isFull || isHalf) && (
      <svg
        viewBox="0 0 24 24"
        className={`absolute inset-0 ${isHalf ? "clip-half" : ""}`}
        fill="url(#gradSilverSP)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.1"
      >
        <defs>
          <linearGradient id="gradSilverSP" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="65%" stopColor="rgba(225,225,235,0.55)" />
            <stop offset="100%" stopColor="rgba(200,200,210,0.22)" />
          </linearGradient>
        </defs>

        <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.1 5.03a.56.56 0 0 0 .47.35l5.32.46a.56.56 0 0 1 .32.99l-4.04 3.46a.56.56 0 0 0-.18.56l1.21 5.22a.56.56 0 0 1-.84.61l-4.58-2.72a.56.56 0 0 0-.59 0l-4.58 2.72a.56.56 0 0 1-.84-.61l1.21-5.22a.56.56 0 0 0-.18-.56L2.26 9.83a.56.56 0 0 1 .32-.99l5.32-.46a.56.56 0 0 0 .47-.35L11.48 3.5Z" />
      </svg>
    )}
  </div>
);

    }
    return <div className="flex justify-center gap-[4px] mb-3">{stars}</div>;
  };

  /* -------------------------------------- */
  /* Reviews を 1 件ずつページ化 */
  /* -------------------------------------- */
  const reviews = [
    {
      score: 5,
      meta: "A.K. / Tokyo",
      text: `静かに寄り添う音って、こういうことなんだと感じた。長時間でも疲れず、心が軽くなる体験。`,
    },
    {
      score: 4.8,
      meta: "Reina / Kanagawa",
      text: `音の粒がほぐれるようで、作業リズムが自然に整う。余計な主張がない、美しい音。`,
    },
    {
      score: 5,
      meta: "K.S. / Osaka",
      text: `夜に聴くと、部屋全体が柔らかくなる。音より“空気の質が変わる”ような静けさ。`,
    },
    {
      score: 4.6,
      meta: "Mio / Chiba",
      text: `ミニマルで優しい音。空間が白く澄むような感覚で、気持ちがリセットされる。`,
    },
    {
      score: 5,
      meta: "Hiro / Fukuoka",
      text: `一点のノイズもない透明感。集中の入り口として毎日使っている。`,
    },
    {
      score: 4.7,
      meta: "Yuri / Kyoto",
      text: `静かで上品。耳に負担がなく、永く聴ける“呼吸する音”だと思う。`,
    },
  ];

  /* -------------------------------------- */
  /* 自動切替 */
  /* -------------------------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((v) => (v + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        lg:hidden relative w-full
        py-[16vh] bg-[#F5F7FA]
        overflow-hidden px-7
      "
    >
      {/* BG NOISE (さらに薄く) */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[url('/lumin/noise-ultrafine.png')]
          opacity-[0.14]
          mix-blend-soft-light
        "
      />

      <div className="relative z-10 max-w-[540px] mx-auto text-center">
        
        {/* TITLE */}
        <div className="mb-[6vh]">
          <p className="text-[0.72rem] tracking-[0.26em] text-[#111214]/55 mb-2">
            CUSTOMER REVIEWS
          </p>
          <h3 className="font-title-2 text-[1.85rem] tracking-[0.12em] text-[#111214]/85">
            LISTENERS’ VOICE
          </h3>
        </div>

        {/* REVIEW CARD */}
        <div
          key={page}
          className="
            transition-opacity duration-[900ms]
            px-6 py-10 rounded-[22px]
            bg-[rgba(240,242,246,0.55)]
            backdrop-blur-[14px]
            border border-black/[0.05]
            shadow-[0_10px_28px_rgba(0,0,0,0.04)]
            text-[#0D0E11]/80
          "
        >
          <StarRating score={reviews[page].score} />

          <p className="text-[1rem] leading-[1.85] whitespace-pre-line mb-4">
            {reviews[page].text}
          </p>

          <div className="text-[0.78rem] tracking-[0.22em] text-[#0D0E11]/45">
            — {reviews[page].meta}
          </div>
        </div>
      </div>
    </section>
  );
}

/* HALF STAR */
const style = document.createElement("style");
style.textContent = `.clip-half { clip-path: inset(0 50% 0 0); }`;
document.head.appendChild(style);
