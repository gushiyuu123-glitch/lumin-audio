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
     Smooth Scroll（SP: 負荷軽いのでOK）
     ※メモ：addEventListener を積み上げないように cleanup を入れる
  ============================================================ */
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));

    const handler = (e) => {
      const a = e.currentTarget;
      const sel = a.getAttribute("href");
      const target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    links.forEach((a) => a.addEventListener("click", handler));
    return () => links.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  /* ============================================================
     GSAP — SP最適化（軽量 × 呼吸）
  ============================================================ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoFilmRef.current) {
        gsap.to(logoFilmRef.current, {
          x: 10,
          opacity: 0.7,
          duration: 6.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: -1,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top+=20 top",
            end: "top+=150 top",
            scrub: true,
          },
        });
      }

      if (beamMain.current) {
        gsap.to(beamMain.current, {
          opacity: 0.38,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top+=10 top",
            end: "top+=160 top",
            scrub: true,
          },
        });
      }

      if (beamSoft.current) gsap.set(beamSoft.current, { opacity: 0.10 });
      if (mirrorRef.current) gsap.set(mirrorRef.current, { opacity: 0.12 });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  /* ============================================================
     100点の要：Cart open中は Header を「完全無効化」
     - opacity だけじゃなく visibility / pointer-events / touch を止める
     - iOSのタップ事故を根絶
  ============================================================ */
  const headerDisableClass = isOpen
    ? "opacity-0 pointer-events-none touch-none invisible"
    : "opacity-100";

  return (
    <header
      ref={headerRef}
      className={`
        fixed top-0 left-0 w-full
        z-[150]
        flex items-center justify-between
        px-6 py-4

        bg-[rgba(250,250,250,0.55)]
        backdrop-blur-[22px]
        border-b border-[rgba(20,20,25,0.05)]
        shadow-[0_6px_22px_rgba(255,255,255,0.25)]
        transition-all duration-300

        ${headerDisableClass}
      `}
    >
      {/* ===================================================
          LOGO
          ※装飾膜は pointer-events-none でタップ事故0
      =================================================== */}
      <a
        href="#hero"
        className="
          relative font-title-2 tracking-[0.22em]
          text-[rgba(18,18,22,0.92)]
          text-[1rem]
          select-none
          z-10
        "
      >
        LÜMIN

        <span
          ref={logoFilmRef}
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0 -z-10
            bg-gradient-to-r
            from-white/20 via-white/70 to-white/20
            blur-[20px]
            rounded-full
            opacity-[0.5]
          "
        />
      </a>

      {/* ===================================================
          CART ICON（タップ領域強化）
      =================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          relative z-10
          cursor-pointer
          text-[rgba(18,18,20,0.85)]
          rounded-xl
          p-2 -m-2
          active:scale-[0.98]
          transition
        "
        aria-label="open cart"
      >
        <ShoppingBag size={22} strokeWidth={1.7} />

        {cartItems.length > 0 && (
          <span
            className="
              pointer-events-none
              absolute -top-1 -right-1
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
      </button>

      {/* ===================================================
          BEAMS / MIRROR（全部 pointer-events-none）
          ※これがないと「見えないけどタップを奪う」が起きる
      =================================================== */}
      <div
        ref={beamMain}
        aria-hidden
        className="
          pointer-events-none
          absolute left-1/2 top-0 -translate-x-1/2
          w-[1px] h-full
          bg-gradient-to-b
          from-[rgba(235,240,255,0.55)]
          via-[rgba(200,205,230,0.18)]
          to-transparent
          blur-[3px]
          opacity-[0.26]
          z-0
        "
      />

      <div
        ref={beamSoft}
        aria-hidden
        className="
          pointer-events-none
          absolute left-1/2 top-0 -translate-x-1/2
          w-[5px] h-full
          bg-gradient-to-b
          from-[rgba(255,255,255,0.20)]
          via-[rgba(230,235,255,0.08)]
          to-transparent
          blur-[26px]
          opacity-[0.10]
          z-0
        "
      />

      <div
        ref={mirrorRef}
        aria-hidden
        className="
          pointer-events-none
          absolute left-0 top-full w-full h-[32px]
          bg-gradient-to-b
          from-[rgba(255,255,255,0.28)]
          via-[rgba(240,240,255,0.12)]
          to-transparent
          blur-[18px]
          opacity-[0.10]
          z-0
        "
      />
    </header>
  );
}
