// src/sections/HeadphoneProductDetailSP.jsx
import { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import gsap from "gsap";

export default function HeadphoneProductDetailSP({ model, onBack }) {
  const { addItem } = useCart();
  const sectionRef = useRef(null);

  /* ============================================
     モデルDB（PC版と完全一致）
  ============================================ */
  const MODELS = {
    "LM-H1W": {
      name: "LÜMIN HEADPHONE — WHITE",
      model: "LM-H1W",
      desc: "透明膜のような軽い解像。静けさの中に澄んだ立体。",
      price: "¥9,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/headphone-white.png" },
        black: { label: "MATTE BLACK", img: "/lumin/h2.png" },
        silver: { label: "SILVER MIST", img: "/lumin/headphone1.png" },
      },
    },
    "LM-H1B": {
      name: "LÜMIN HEADPHONE — BLACK",
      model: "LM-H1B",
      desc: "深い沈黙の中に立ち上がる濃密な音像。",
      price: "¥9,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/headphone-white.png" },
        black: { label: "MATTE BLACK", img: "/lumin/h2.png" },
        silver: { label: "SILVER MIST", img: "/lumin/headphone1.png" },
      },
    },
    "LM-H1S": {
      name: "LÜMIN HEADPHONE — SILVER",
      model: "LM-H1S",
      desc: "白銀の膜の奥でゆらぐ柔らかな高解像。",
      price: "¥10,800（税込）",
      colors: {
        white: { label: "CERAMIC WHITE", img: "/lumin/headphone-white.png" },
        black: { label: "MATTE BLACK", img: "/lumin/h2.png" },
        silver: { label: "SILVER MIST", img: "/lumin/headphone1.png" },
      },
    },
  };

  const data = MODELS[model] || MODELS["LM-H1W"];
  const [selectedColor, setSelectedColor] = useState("white");
  const activeColor = data.colors[selectedColor];

  /* ============================================
     GSAP — フェードイン
  ============================================ */
  useEffect(() => {
    if (!sectionRef.current) return;
    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".detail-item"),
      { opacity: 0, y: 32, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
      }
    );
  }, [model]);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full block lg:hidden
        pt-[12vh] pb-[16vh]
        px-6
        bg-[#F4F6F9]
        overflow-hidden
      "
    >
      {/* BG */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-white via-[#eef1f5] to-[#f9fafc]
          opacity-[0.92]
        "
      />

      {/* TITLE */}
      <div className="relative z-10 text-center mb-12 detail-item">
        <p className="text-[0.72rem] tracking-[0.26em] text-[#0F0F10]/55 mb-2">
          {data.name} — {data.model}
        </p>

        <h2 className="font-title-2 text-[1.9rem] tracking-[0.16em] text-[#0F0F10]/85">
          PRODUCT DETAIL
        </h2>
      </div>

      {/* IMAGE */}
      <div className="relative z-10 detail-item mb-10 flex justify-center">
        <img
          src={activeColor.img}
          alt={data.name}
          className="
            w-[88%] max-w-[460px]
            drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)]
            select-none pointer-events-none
          "
        />
      </div>

      {/* INFO */}
      <div className="relative z-10 detail-item">
        <h3 className="font-title-2 text-[1.55rem] tracking-[0.12em] text-[#0F0F10]/85 mb-3 text-center">
          {data.name}
        </h3>

        <p className="text-[#0F0F10]/65 leading-[1.85] text-[0.95rem] mb-6 text-center">
          {data.desc}
        </p>

        <p className="text-[#0F0F10]/85 text-[1.05rem] tracking-[0.12em] mb-6 text-center">
          {data.price}
        </p>

        {/* COLOR SELECTOR */}
        <div className="mb-12">
          <p className="text-[0.75rem] tracking-[0.22em] text-[#0F0F10]/50 mb-3 text-center">
            カラー
          </p>

          <div className="flex justify-center gap-8">
            {Object.entries(data.colors).map(([key, c]) => (
              <button
                key={key}
                onClick={() => setSelectedColor(key)}
                className="
                  flex flex-col items-center transition-all duration-300
                "
              >
                <img
                  src={c.img}
                  className={`
                    w-16 h-16 object-contain mb-2 rounded-full
                    ${
                      selectedColor === key
                        ? "opacity-100 scale-105 drop-shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                        : "opacity-55"
                    }
                  `}
                />
                <span className="text-[0.6rem] tracking-[0.16em] text-[#0F0F10]/55">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* BUY BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              addItem({
                name: data.name,
                price: data.price,
                image: activeColor.img,
                model: data.model,
              })
            }
            className="
              group w-full max-w-[240px] py-3 rounded-xl
              border border-black/[0.06]
              bg-white/75 backdrop-blur-[4px]
              text-[#0F0F10]/85
              text-[0.82rem] tracking-[0.18em]
              hover:bg-white/90 hover:border-black/[0.12]
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              transition-all duration-300
            "
          >
            購入する
          </button>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onBack}
            className="
              text-[#0F0F10]/55 text-[0.75rem]
              tracking-[0.24em]
              hover:text-[#0F0F10]/80
              transition-all
            "
          >
            ← 戻る
          </button>
        </div>
      </div>
    </section>
  );
}
