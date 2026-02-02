// src/sections/EarphoneProductDetailSP.jsx
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function EarphoneProductDetailSP({ model, onBack }) {
  const { addItem } = useCart();
  const sectionRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("white");

  /* ============================================
      MODEL DB（PCと同様・SPは参照のみ）
  ============================================ */
  const MODELS = {
    "LM-A1": {
      name: "LÜMIN AIR ONE",
      model: "LM-A1",
      desc: "軽やかな空気感。日常に溶け込む透明なサウンド。",
      price: "¥6,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/e111.png" },
        black: { label: "MATTE BLACK", img: "/lumin/e22.png" },
        silver: { label: "SILVER MIST", img: "/lumin/e33.png" },
      },
    },
    "LM-A2": {
      name: "LÜMIN AIR PRO",
      model: "LM-A2",
      desc: "深度のある密度。音の輪郭が美しく立ち上がるプロ仕様。",
      price: "¥6,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/e22.png" },
        black: { label: "MATTE BLACK", img: "/lumin/e33.png" },
        silver: { label: "SILVER MIST", img: "/lumin/e111.png" },
      },
    },
    "LM-A3": {
      name: "LÜMIN AIR STUDIO",
      model: "LM-A3",
      desc: "スタジオ級の空間解像。静けさの中で立体が生まれる。",
      price: "¥6,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/e33.png" },
        black: { label: "MATTE BLACK", img: "/lumin/e111.png" },
        silver: { label: "SILVER MIST", img: "/lumin/e22.png" },
      },
    },
  };

  const data = MODELS[model] || MODELS["LM-A1"];
  const activeColor = data.colors[selectedColor];

  /* ============================================
      GSAP：SPらしい軽いフェード
  ============================================ */
  useEffect(() => {
    if (!sectionRef.current) return;
    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".sp-detail-item"),
      { opacity: 0, y: 38, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power2.out",
        stagger: 0.12,
      }
    );
  }, [model]);

  return (
    <section
      ref={sectionRef}
      className="
        block lg:hidden relative w-full
        bg-[#F4F5F7]
        pt-[16vh] pb-[18vh]
        px-6
        overflow-hidden
      "
    >
      {/* ===== 背景：白銀 Apple膜 ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-white via-[#eef0f3] to-[#f6f7f9]
          opacity-[0.96]
          pointer-events-none
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-[0.07]
          bg-[url('/lumin/noise-fine.png')]
          mix-blend-soft-light
        "
      />

      {/* =========================
            TITLE
      ========================= */}
      <div className="sp-detail-item text-center mb-12 relative z-10">
        <p className="text-[0.75rem] tracking-[0.28em] text-[#0F0F10]/55 mb-4">
          {data.name} — {data.model}
        </p>

        <h2 className="font-title-2 text-[1.95rem] tracking-[0.16em] text-[#0F0F10]/85">
          PRODUCT DETAIL
        </h2>
      </div>

      {/* =========================
            IMAGE（SPは大きく見せる）
      ========================= */}
      <div className="sp-detail-item relative z-10 mb-14 flex justify-center">
        <img
          src={activeColor.img}
          alt={data.name}
          className="
            w-[82%] max-w-[360px]
            drop-shadow-[0_32px_75px_rgba(0,0,0,0.15)]
            transition-all duration-300
          "
        />
      </div>

      {/* =========================
            TEXT
      ========================= */}
      <div className="sp-detail-item text-center mb-10">
        <h3 className="font-title-2 text-[1.55rem] tracking-[0.12em] text-[#0F0F10]/85 mb-3">
          {data.name}
        </h3>

        <p className="text-[#0F0F10]/65 text-[0.95rem] leading-[1.9] mb-4">
          {data.desc}
        </p>

        <p className="text-[#0F0F10]/85 text-[1.1rem] tracking-[0.12em] mb-6">
          {data.price}
        </p>
      </div>

      {/* =========================
            COLOR SELECTOR（SP再設計）
      ========================= */}
      <div className="sp-detail-item mb-14">
        <p className="text-[0.7rem] tracking-[0.24em] text-[#0F0F10]/50 mb-3 text-center">
          カラー
        </p>

        <div
          className="
            flex gap-6 overflow-x-auto py-2 px-1
            no-scrollbar justify-center
          "
        >
          {Object.entries(data.colors).map(([key, c]) => (
            <div
              key={key}
              onClick={() => setSelectedColor(key)}
              className="
                flex flex-col items-center cursor-pointer shrink-0
                transition-all
              "
            >
              <img
                src={c.img}
                className={`
                  w-16 h-16 object-contain mb-2 transition-all
                  ${
                    selectedColor === key
                      ? "opacity-100 drop-shadow-[0_0_12px_rgba(0,0,0,0.25)]"
                      : "opacity-55"
                  }
                `}
              />
              <span className="text-[0.6rem] tracking-[0.2em] text-[#0F0F10]/55">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
            BUY BUTTON
      ========================= */}
      <div className="sp-detail-item flex justify-center">
        <button
          onClick={() =>
            addItem({
              name: data.name,
              price: data.price,
              image: activeColor.img,
            })
          }
          className="
            w-[90%] py-3 rounded-xl
            border border-black/[0.06]
            bg-white/70 backdrop-blur-[4px]
            text-[#0F0F10]/85
            text-[0.82rem] tracking-[0.18em]
            hover:bg-white/85 hover:border-black/[0.12]
            transition-all duration-300
          "
        >
          購入する
        </button>
      </div>

      {/* =========================
            BACK BUTTON
      ========================= */}
      <div className="sp-detail-item flex justify-center mt-12">
        <button
          onClick={onBack}
          className="
            relative group
            px-6 py-2
            text-[#0F0F10]/55 text-[0.75rem]
            tracking-[0.24em]
            transition-all duration-300
            hover:text-[#0F0F10]/80
          "
        >
          <span
            className="
              absolute left-0 bottom-0 w-full h-[1px]
              bg-gradient-to-r from-transparent via-[#0F0F10]/25 to-transparent
              opacity-40 group-hover:opacity-80
              transition-all duration-300
            "
          />
          ← 戻る
        </button>
      </div>
    </section>
  );
}
