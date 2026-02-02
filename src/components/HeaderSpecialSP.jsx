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

  /* ============================================================
     Smooth Scroll（SP版は軽量でOK）
  ============================================================ */
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

  /* ============================================================
     GSAP — SP最適化（軽量 × 呼吸）
  ============================================================ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // LOGO の光膜
      gsap.to(logoFilmRef.current, {
        x: 10,
        opacity: 0.7,
        duration: 6.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Header scroll 追従（微揺れ）
      gsap.to(headerRef.current, {
        y: -1,
        scrollTrigger: {
          trigger: "body",
          start: "top+=20 top",
          end: "top+=150 top",
          scrub: true,
        },
      });

      // Light Beam (main)
      gsap.to(beamMain.current, {
        opacity: 0.38,
        scrollTrigger: {
          trigger: "body",
          start: "top+=10 top",
          end: "top+=160 top",
          scrub: true,
        },
      });

      // 静止膜（soft / mirror）
      gsap.set(beamSoft.current, { opacity: 0.10 });
      gsap.set(mirrorRef.current, { opacity: 0.12 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={` 
        fixed top-0 left-0 w-full 
        z-[150]                          /* ★ PC/SP 調停の基準ライン */
        flex items-center justify-between
        px-6 py-4

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
          text-[1rem] select-none
        "
      >
        LÜMIN

        {/* 光膜（完全背面へ固定） */}
        <span
          ref={logoFilmRef}
          aria-hidden
          className="
            absolute inset-0
            bg-gradient-to-r
            from-white/20 via-white/70 to-white/20
            blur-[20px] rounded-full opacity-[0.5]
            -z-10
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
          BEAMS（すべて z-[0] 必須）
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
          z-[0]                 /* ★ カートより背面 */
        "
      />

      <div
        ref={beamSoft}
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-[5px] h-full
          bg-gradient-to-b
          from-[rgba(255,255,255,0.20)]
          via-[rgba(230,235,255,0.08)]
          to-transparent
          blur-[26px]
          opacity-[0.10]
          z-[0]                 /* ★ カートより背面 */
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
          z-[0]                 /* ★ カートより背面 */
        "
      />
    </header>
  );
}
