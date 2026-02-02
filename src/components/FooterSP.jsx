// src/components/FooterSP.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LUMIN_TOKENS as T } from "../styles/luminTokens";

/* ============================================================
    LÜMIN — WHITE SILVER FOOTER (SP 最適化 / 著作権入り)
============================================================ */

function IconWrap({ children, innerRef }) {
  return (
    <div
      ref={innerRef}
      className={`
        w-[32px] h-[32px]
        rounded-full relative
        flex items-center justify-center
        transition-all duration-600
        hover:scale-[1.06]
        ${T.silver.panel}
      `}
    >
      {children}
    </div>
  );
}

function IconTwitter() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[20px] h-[20px]"
      stroke="rgba(30,30,35,0.75)"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7.5c-.7.3-1.4.5-2.1.6a3.5 3.5 0 0 0-6 3v.6C9.3 11.5 7 10.4 5.3 8.7c-.5.9-.3 2 .5 2.7a3.5 3.5 0 0 1-1.6-.4c0 1.3 1 2.5 2.4 2.8-.5.1-1 .1-1.4 0 .4 1.1 1.5 2 2.8 2A7 7 0 0 1 4 17a10 10 0 0 0 5.4 1.6c6.5 0 10-5.6 10-10.4v-.5c.7-.5 1.3-1.1 1.6-1.8z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[20px] h-[20px]"
      stroke="rgba(30,30,35,0.75)"
      strokeWidth="1.3"
      fill="none"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="1" fill="rgba(30,30,35,0.75)" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[20px] h-[20px]"
      stroke="rgba(30,30,35,0.75)"
      strokeWidth="1.2"
      fill="rgba(30,30,35,0.75)"
    >
      <path d="M22 12c0 3.8-.3 6.1-1 7.3-.4.7-1.1 1.2-2 1.4C17.6 21 12 21 12 21s-5.6 0-7-.3c-.9-.2-1.6-.7-2-1.4-.7-1.2-1-3.5-1-7.3s.3-6.1 1-7.3C3.4 4 4.1 3.5 5 3.3 6.4 3 12 3 12 3s5.6 0 7 .3c.9.2 1.6.7 2 1.4.7 1.2 1 3.5 1 7.3z" />
      <polygon points="10,15.5 15,12 10,8.5" fill="white" />
    </svg>
  );
}

export default function FooterSP() {
  const footerRef = useRef(null);
  const socialRef = useRef([]);

  /* ----------------------------------------------------
        GSAP 呼吸（SPはかなり弱い “微揺れ”）
  ----------------------------------------------------- */
  useEffect(() => {
    gsap.to(footerRef.current, {
      opacity: 0.98,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(socialRef.current, {
      scale: 1.05,
      duration: 4,
      opacity: 0.92,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.25,
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        lg:hidden relative w-full
        pt-[12vh] pb-[14vh]
        px-8
        bg-[#F7F8FA]
        border-t border-[rgba(90,90,100,0.16)]
        overflow-hidden
      "
    >
      {/* 背景ノイズ */}
      <div
        aria-hidden
        className={`absolute inset-0 mix-blend-soft-light ${T.silver.noise}`}
      />

      {/* 上部グロウ */}
      <div
        aria-hidden
        className="
          absolute inset-x-0 top-0 h-[120px]
          bg-gradient-to-b from-white/60 to-transparent
          blur-[40px]
        "
      />

      {/* LOGO */}
      <div className="relative z-10 text-center mb-14">
        <h2 className="font-title-2 text-[1rem] tracking-[0.28em] text-[#0F1012]/80">
          LÜMIN
        </h2>
      </div>

      {/* 2カラム × 2段 */}
      <div
        className="
          relative z-10
          grid grid-cols-2 gap-10
          mb-16
        "
      >
        {[ 
          { title: "PRODUCTS", items: ["Lümin Max", "Lümin Air", "Lümin Dock", "Accessories"] },
          { title: "SUPPORT", items: ["Contact", "Warranty", "User Guide", "FAQ"] },
          { title: "SOUND", items: ["Acoustic Philosophy", "Frequency Studio", "Whitepaper"] },
          { title: "ABOUT", items: ["Brand Story", "Design Language", "Creators"] },
        ].map((col, i) => (
          <div key={i}>
            <h3 className="text-[0.7rem] tracking-[0.26em] text-[#0F1012]/60 mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.items.map((item, j) => (
                <li key={j}>
                  <a
                    href="#"
                    className="
                      text-[0.85rem] text-[#0F1012]/55
                      hover:text-[#0F1012]/85 transition
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SOCIAL ICONS */}
      <div className="relative z-10 flex justify-center gap-8 mb-14">
        <IconWrap innerRef={(el) => (socialRef.current[0] = el)}>
          <IconTwitter />
        </IconWrap>

        <IconWrap innerRef={(el) => (socialRef.current[1] = el)}>
          <IconInstagram />
        </IconWrap>

        <IconWrap innerRef={(el) => (socialRef.current[2] = el)}>
          <IconYoutube />
        </IconWrap>
      </div>

      {/* COPYRIGHT（★著作権 2段構成） */}
      <div className="relative z-10 text-center space-y-3">
        <p className="text-[0.7rem] text-[#0F1012]/40 tracking-[0.12em]">
          © {new Date().getFullYear()} LÜMIN — All Rights Reserved.
        </p>

        <a
          href="https://gushikendesign.com/"
          target="_blank"
          className="
            text-[0.78rem] text-[#0F1012]/45
            hover:text-[#0F1012]/70
            underline underline-offset-[4px]
          "
        >
          Designed by GUSHIKEN DESIGN
        </a>
      </div>

      {/* Bottom Glow */}
      <div
        aria-hidden
        className="
          absolute inset-x-0 bottom-0 h-[120px]
          bg-gradient-to-t from-white/55 to-transparent
          blur-[40px]
        "
      />
    </footer>
  );
}
