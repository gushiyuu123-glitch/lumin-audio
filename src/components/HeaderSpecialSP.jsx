// src/components/HeaderSpecialSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function HeaderSpecialSP() {
  const cart = useCart() || {};
  const cartItems = Array.isArray(cart.cartItems) ? cart.cartItems : [];
  const isOpen = cart.isOpen ?? false;
  const setIsOpen =
    typeof cart.setIsOpen === "function" ? cart.setIsOpen : () => {};

  const headerRef = useRef(null);
  const logoFilmRef = useRef(null);
  const mirrorRef = useRef(null);
  const beamMain = useRef(null);
  const beamSoft = useRef(null);

  /* ================================================
     Smooth Scroll（SP用は負荷が軽いのでOK）
  ================================================= */
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  /* ================================================
     GSAP — SP最適化バージョン
     （負荷を下げて“呼吸”を滑らかに）
  ================================================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* -------- ① logoFilm のみループ -------- */
      gsap.to(logoFilmRef.current, {
        x: 10,
        opacity: 0.7,
        duration: 6.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* -------- ② Header の scrollTrigger -------- */
      gsap.to(headerRef.current, {
        y: -1,
        scrollTrigger: {
          trigger: "body",
          start: "top+=20 top",
          end: "top+=150 top",
          scrub: true,
        },
      });

      /* -------- ③ beamMain — scroll 連動 -------- */
      gsap.to(beamMain.current, {
        opacity: 0.38,
        scrollTrigger: {
          trigger: "body",
          start: "top+=10 top",
          end: "top+=160 top",
          scrub: true,
        },
      });

      /* -------- ④ mirror と beamSoft は静止（透明膜） -------- */
      gsap.set(mirrorRef.current, { opacity: 0.12 });
      gsap.set(beamSoft.current, { opacity: 0.10, scaleY: 1.0 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={` 
        fixed top-0 left-0 w-full z-[200]
        flex items-center justify-between
        px-6 py-4

        /* ===== SP版：軽い白膜（背景と衝突しない） ===== */
        bg-[rgba(250,250,250,0.55)]
        backdrop-blur-[22px]
        border-b border-[rgba(20,20,25,0.05)]
        shadow-[0_6px_22px_rgba(255,255,255,0.25)]

        transition-all duration-300
        ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* ===================================================
         LOGO
      =================================================== */}
      <a
        href="#hero"
        className="
          relative font-title-2 tracking-[0.22em]
          text-[rgba(18,18,22,0.92)]
          text-[1rem]
          select-none
        "
      >
        LÜMIN

        <span
          ref={logoFilmRef}
          aria-hidden
          className="
            absolute inset-0 -z-10
            bg-gradient-to-r
            from-white/20 via-white/70 to-white/20
            blur-[20px]
            rounded-full opacity-[0.5]
          "
        />
      </a>

      {/* ===================================================
         CART ICON
      =================================================== */}
      <div
        onClick={() => setIsOpen(true)}
        className="
          relative cursor-pointer
          text-[rgba(18,18,20,0.85)]
        "
      >
        <ShoppingBag size={22} strokeWidth={1.7} />

        {cartItems.length > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              bg-black text-white
              text-[0.62rem]
              w-[17px] h-[17px]
              flex items-center justify-center
              rounded-full
            "
          >
            {cartItems.length}
          </span>
        )}
      </div>

      {/* ===================================================
         BEAMS（静止 × ScrollTrigger）
      =================================================== */}
      <div
        ref={beamMain}
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-[1px] h-full
          bg-gradient-to-b
          from-[rgba(235,240,255,0.55)]
          via-[rgba(200,205,230,0.18)]
          to-transparent
          blur-[3px]
          opacity-[0.26]
        "
      />

      <div
        ref={beamSoft}
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-[5px] h-full        /* ← SP最適化 */
          bg-gradient-to-b
          from-[rgba(255,255,255,0.20)]
          via-[rgba(230,235,255,0.08)]
          to-transparent
          blur-[26px]
          opacity-[0.10]
        "
      />

      {/* ===================================================
         Mirror Floor（薄膜）
      =================================================== */}
      <div
        ref={mirrorRef}
        className="
          absolute left-0 top-full w-full h-[32px]
          bg-gradient-to-b
          from-[rgba(255,255,255,0.28)]
          via-[rgba(240,240,255,0.12)]
          to-transparent
          blur-[18px]
          opacity-[0.10]
        "
      />
    </header>
  );
}
