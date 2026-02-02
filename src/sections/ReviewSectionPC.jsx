// src/sections/ReviewSectionPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ReviewSectionPC() {
  const sectionRef = useRef(null);
  const [page, setPage] = useState(0);

  /* -------------------------------------- */
  /* STAR RATING (Mirror + Breathing) */
  /* -------------------------------------- */
  const StarRating = ({ score }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFull = score >= i;
      const isHalf = score >= i - 0.5 && score < i;

      stars.push(
        <div key={i} className="relative w-[20px] h-[20px]">
          {/* BASE */}
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(13,14,17,0.35)"
            strokeWidth="1.2"
          >
            <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.1 5.03a.56.56 0 0 0 .47.35l5.32.46a.56.56 0 0 1 .32.99l-4.04 3.46a.56.56 0 0 0-.18.56l1.21 5.22a.56.56 0 0 1-.84.61l-4.58-2.72a.56.56 0 0 0-.59 0l-4.58 2.72a.56.56 0 0 1-.84-.61l1.21-5.22a.56.56 0 0 0-.18-.56L2.26 9.83a.56.56 0 0 1 .32-.99l5.32-.46a.56.56 0 0 0 .47-.35L11.48 3.5Z"/>
          </svg>

          {/* FILL */}
          {(isFull || isHalf) && (
            <svg
              viewBox="0 0 24 24"
              className={`absolute inset-0 ${isHalf ? "clip-half" : ""}`}
              fill="url(#gradSilver)"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1.2"
            >
              <defs>
                <linearGradient id="gradSilver" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
                  <stop offset="70%" stopColor="rgba(220,220,230,0.55)" />
                  <stop offset="100%" stopColor="rgba(200,200,210,0.25)" />
                </linearGradient>
              </defs>

              <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.1 5.03a.56.56 0 0 0 .47.35l5.32.46a.56.56 0 0 1 .32.99l-4.04 3.46a.56.56 0 0 0-.18.56l1.21 5.22a.56.56 0 0 1-.84.61l-4.58-2.72a.56.56 0 0 0-.59 0l-4.58 2.72a.56.56 0 0 1-.84-.61l1.21-5.22a.56.56 0 0 0-.18-.56L2.26 9.83a.56.56 0 0 1 .32-.99l5.32-.46a.56.56 0 0 0 .47-.35L11.48 3.5Z"/>
            </svg>
          )}
        </div>
      );
    }
    return <div className="flex justify-center gap-[6px] mb-4">{stars}</div>;
  };

  /* -------------------------------------- */
  /* 6 REVIEWS → 2カラム × 3ページ */
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
  /* 2カラム化のために 2個ずつに分割 */
  /* -------------------------------------- */
  const pages = [];
  for (let i = 0; i < reviews.length; i += 2) {
    pages.push([reviews[i], reviews[i + 1]]);
  }

  /* -------------------------------------- */
  /* ページ送り（6秒ごと） */
  /* -------------------------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((v) => (v + 1) % pages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        hidden lg:block relative w-full
        py-[22vh] bg-[#F6F8FB]
        overflow-hidden
      "
    >
      {/* NOISE */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[url('/lumin/noise-ultrafine.png')]
          opacity-[0.22]
          mix-blend-soft-light
        "
      />

      {/* INNER SHADOW */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          shadow-[inset_0_0_38px_rgba(255,255,255,0.35)]
        "
      />

      <div className="relative z-10 max-w-[980px] mx-auto px-12 text-center">

        {/* AVERAGE */}
        <div className="mb-[8vh]">
          <StarRating score={4.8} />
          <p className="text-[0.92rem] tracking-[0.22em] text-[#0D0E11]/45">
            AVERAGE RATING ★4.8 / 5.0
          </p>
          <div className="mx-auto mt-4 h-[1px] w-[160px] bg-[#0D0E11]/15" />
        </div>

        {/* 2カラム REVIEW GRID */}
        <div className="relative h-[360px]">
          {pages.map((items, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 grid grid-cols-2 gap-12
                transition-opacity duration-[1200ms]
                ${i === page ? "opacity-100" : "opacity-0"}
              `}
            >
              {items.map((r, j) =>
                r ? (
                  <div
                    key={j}
                    className="flex flex-col items-center text-center px-4"
                  >
                    <StarRating score={r.score} />

                    <p className="text-[1.05rem] leading-[1.9] text-[#0D0E11]/80 whitespace-pre-line">
                      {r.text}
                    </p>

                    <div className="mt-4 text-[0.78rem] tracking-[0.22em] text-[#0D0E11]/40">
                      — {r.meta}
                    </div>
                  </div>
                ) : (
                  <div key={j} />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HALF STAR CLIP */
const style = document.createElement("style");
style.textContent = `.clip-half { clip-path: inset(0 50% 0 0); }`;
document.head.appendChild(style);
