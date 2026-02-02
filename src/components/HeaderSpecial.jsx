// src/components/HeaderSpecial.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function HeaderSpecial() {
  const cart = useCart() || {};
  const cartItems = Array.isArray(cart.cartItems) ? cart.cartItems : [];
  const isOpen = cart.isOpen ?? false;
  const setIsOpen = typeof cart.setIsOpen === "function" ? cart.setIsOpen : () => {};

  const dotRefs = useRef([]);
  const dotSpecularRefs = useRef([]);
  const logoRef = useRef(null);
  const metalFilmRef = useRef(null);
  const beamMain = useRef(null);
  const beamSoft = useRef(null);
  const mirrorRef = useRef(null);
  const headerRef = useRef(null);

  /* =============================
     Smooth Scroll（ページ内移動）
  ============================= */
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

  /* =============================
     GSAP Animations
  ============================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- ドット呼吸 --- */
      dotRefs.current.forEach((dot, i) => {
        gsap.to(dot, {
          scale: 1.38,
          opacity: 0.92,
          duration: 3.5 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* --- ドット反射カーブ（Specular）--- */
      dotSpecularRefs.current.forEach((curve, i) => {
        gsap.to(curve, {
          x: 2,
          opacity: 0.55,
          duration: 2.6 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* --- ロゴ金属反射（横スライド） --- */
      gsap.to(metalFilmRef.current, {
        x: 22,
        opacity: 0.8,
        duration: 7.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* --- ヘッダー浮上（Scrollで0.5〜1px） --- */
      gsap.to(headerRef.current, {
        y: -1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "body",
          start: "top+=10 top",
          end: "top+=200 top",
          scrub: true,
        },
      });

      /* --- Mirror Floor（下反射）--- */
      gsap.to(mirrorRef.current, {
        opacity: 0.16,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* --- Beam --- */
      gsap.to(beamMain.current, {
        opacity: 0.48,
        scrollTrigger: {
          trigger: "body",
          start: "top+=20 top",
          end: "top+=200 top",
          scrub: true,
        },
      });

      gsap.to(beamSoft.current, {
        scaleY: 1.05,
        opacity: 0.18,
        duration: 6.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        fixed top-0 left-0 w-full z-[210]
        flex items-center justify-between
        px-12 py-5
        backdrop-blur-[22px]
        bg-[rgba(255,255,255,0.55)]
        border-b border-[rgba(20,20,25,0.08)]
        shadow-[0_8px_32px_rgba(255,255,255,0.28)]
        transition-all duration-300
        ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >

      {/* ================= LOGO ================= */}
      <a
        href="#hero"
        className="relative font-title-2 tracking-[0.22em]
                   text-[rgba(18,18,22,0.92)]
                   hover:text-black transition-all"
      >
        {/* ロゴ本体 */}
        <span ref={logoRef}>LÜMIN</span>

        {/* 金属反射フィルム */}
        <span
          ref={metalFilmRef}
          aria-hidden
          className="
            absolute inset-0 -z-10
            bg-gradient-to-r
            from-white/20 via-white/70 to-white/25
            blur-[32px] rounded-full opacity-[0.55]
          "
        />
      </a>

      {/* ================= NAV ================= */}
      <nav className="flex items-center gap-14 text-[0.82rem] font-eng tracking-[0.18em]">
        {[
          { label: "PRODUCTS", href: "#earphone" },
          { label: "JOURNAL", href: "#journal" },
          { label: "CONTACT", href: "#contact" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="
              group relative flex items-center gap-3
              text-[rgba(18,18,22,0.82)]
              hover:text-black transition-all
            "
          >
            {/* base dot */}
            <span
              ref={(el) => (dotRefs.current[i] = el)}
              className="
                w-[7px] h-[7px] rounded-full
                bg-[rgba(0,0,0,0.45)]
                shadow-[0_0_8px_rgba(0,0,0,0.25)]
                transition-all group-hover:bg-black group-hover:scale-[1.7]
              "
            />

            {/* reflection curve */}
            <span
              ref={(el) => (dotSpecularRefs.current[i] = el)}
              className="
                absolute w-[7px] h-[7px] rounded-full
                left-0 top-0 pointer-events-none
                bg-gradient-to-br from-white/60 to-transparent
                opacity-[0.25] blur-[2px]
              "
            />

            {item.label}
          </a>
        ))}
      </nav>

      {/* ================= CART ================= */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer ml-6 text-[rgba(18,18,20,0.85)] hover:text-black"
      >
        <ShoppingBag size={22} strokeWidth={1.8} />

        {cartItems.length > 0 && (
          <span
            className="
              absolute -top-2 -right-2 bg-black text-white
              text-[0.65rem] w-[18px] h-[18px]
              flex items-center justify-center rounded-full
            "
          >
            {cartItems.length}
          </span>
        )}
      </div>

      {/* ================= BEAMS ================= */}
      <div
        ref={beamMain}
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-[2px] h-full
          bg-gradient-to-b
          from-[rgba(240,242,255,0.65)]
          via-[rgba(200,205,230,0.20)]
          to-transparent
          blur-[5px]
          opacity-[0.32]
        "
      />

      <div
        ref={beamSoft}
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-[16px] h-full
          bg-gradient-to-b
          from-[rgba(255,255,255,0.18)]
          via-[rgba(230,235,255,0.10)]
          to-transparent
          blur-[48px]
          opacity-[0.12]
        "
      />

      {/* ================= REFLECTION FLOOR（鏡面） ================= */}
      <div
        ref={mirrorRef}
        aria-hidden
        className="
          absolute left-0 top-full w-full h-[55px]
          bg-gradient-to-b
          from-[rgba(255,255,255,0.32)]
          via-[rgba(240,240,255,0.15)]
          to-transparent
          opacity-[0.10]
          blur-[28px]
          pointer-events-none
        "
      />

    </header>
  );
}
