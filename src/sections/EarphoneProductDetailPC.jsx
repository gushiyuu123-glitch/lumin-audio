// src/sections/EarphoneProductDetailPC.jsx
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function EarphoneProductDetailPC({ model, onBack }) {
  const { addItem } = useCart();
  const sectionRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("white");

  /* ============================================
     全イヤホンDB（A1 / A2 / A3）
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
     GSAP — 出現フェード
  ============================================ */
  useEffect(() => {
    if (!sectionRef.current) return;
    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".detail-item"),
      { opacity: 0, y: 40, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.15,
      }
    );
  }, [model]);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full hidden lg:block
        py-[22vh] overflow-hidden
        bg-[#F4F6F9]
      "
    >
      {/* BACKGROUND */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b from-[#ffffff] via-[#eef0f5] to-[#f6f7f9]
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b from-white/60 via-white/25 to-transparent
          blur-[26px]
          pointer-events-none
        "
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-14">

        {/* TITLE */}
        <div className="text-center mb-20 detail-item">
          <p className="text-[0.82rem] tracking-[0.28em] text-[#0F0F10]/55 mb-3">
            {data.name} — {data.model}
          </p>

          <h2 className="font-title-2 text-[2.4rem] tracking-[0.18em] text-[#0F0F10]/85">
            PRODUCT DETAIL
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex items-center justify-between gap-20 detail-item">

          {/* LEFT IMAGE */}
          <img
            src={activeColor.img}
            alt={data.name}
            className="
              w-[48%] max-w-[620px]
              drop-shadow-[0_40px_100px_rgba(0,0,0,0.14)]
              transition-all duration-500
            "
          />

          {/* RIGHT INFO */}
          <div className="w-[48%]">
            <h3 className="font-title-2 text-[1.85rem] tracking-[0.12em] text-[#0F0F10]/85 mb-4">
              {data.name}
            </h3>

            <p className="text-[#0F0F10]/65 leading-[1.9] mb-6">
              {data.desc}
            </p>

            <p className="text-[#0F0F10]/85 text-[1.15rem] tracking-[0.12em] mb-8">
              {data.price}
            </p>

            {/* COLOR SELECTOR */}
            <div className="mb-10">
              <p className="text-[0.78rem] tracking-[0.24em] text-[#0F0F10]/50 mb-3">
                カラー
              </p>

              <div className="flex gap-6">
                {Object.entries(data.colors).map(([key, c]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedColor(key)}
                    className="
                      flex flex-col items-center cursor-pointer
                      hover:opacity-100 transition
                    "
                  >
                    <img
                      src={c.img}
                      className={`
                        w-20 h-20 object-contain mb-2
                        ${
                          selectedColor === key
                            ? "opacity-100 drop-shadow-[0_0_15px_rgba(0,0,0,0.15)]"
                            : "opacity-60"
                        }
                      `}
                    />
                    <span className="text-[0.65rem] tracking-[0.2em] text-[#0F0F10]/55">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BUY BUTTON */}
            <button
              onClick={() =>
                addItem({
                  name: data.name,
                  price: data.price,
                  image: activeColor.img,
                })
              }
              className="
                group w-full max-w-[260px] py-3 rounded-xl
                border border-black/[0.06]
                bg-white/75 backdrop-blur-[4px]
                text-[#0F0F10]/85
                text-[0.85rem] tracking-[0.18em]
                hover:bg-white/90 hover:border-black/[0.12]
                hover:shadow-[0_12px_38px_rgba(0,0,0,0.07)]
                transition-all duration-300
              "
            >
              購入する
            </button>
          </div>
        </div>

        {/* ================================
            BACK BUTTON（上質 UI）
        ================================= */}
        <div className="detail-item flex justify-center mt-24">
          <button
            onClick={onBack}
            className="
              relative group
              px-6 py-2
              text-[#0F0F10]/55
              text-[0.78rem]
              tracking-[0.24em]
              transition-all duration-300
              hover:text-[#0F0F10]/80
            "
          >
            {/* Underline (Veil Line) */}
            <span
              className="
                absolute left-0 bottom-0 w-full h-[1px]
                bg-gradient-to-r from-transparent via-[#0F0F10]/20 to-transparent
                opacity-40 group-hover:opacity-80
                transition-all duration-300
              "
            />
            ← 戻る
          </button>
        </div>

      </div>
    </section>
  );
}
