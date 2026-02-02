// src/sections/LuminHeadphoneHeroSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCart } from "../contexts/CartContext";

export default function LuminHeadphoneHeroSP() {
  const { addItem } = useCart();

  const colors = [
    {
      key: "white",
      label: "CERAMIC WHITE",
      img: "/lumin/headphone-white.png",
      name: "LÜMIN HEADPHONE — WHITE",
      model: "LM-H1W",
      price: "¥9,800（税込）",
      short: "透明膜のような軽い解像。静けさの中に澄んだ立体。",
    },
    {
      key: "black",
      label: "MATTE BLACK",
      img: "/lumin/h2.png",
      name: "LÜMIN HEADPHONE — BLACK",
      model: "LM-H1B",
      price: "¥9,800（税込）",
      short: "深い沈黙の中に立ち上がる濃密な音像。",
    },
    {
      key: "silver",
      label: "SILVER MIST",
      img: "/lumin/headphone1.png",
      name: "LÜMIN HEADPHONE — SILVER",
      model: "LM-H1S",
      price: "¥10,800（税込）",
      short: "白銀の膜の奥でゆらぐ柔らかな高解像。",
    },
  ];

  const [current, setCurrent] = useState(colors[1]); // default: BLACK

  const imgRef = useRef(null);

  /* =======================================================
       GSAP — 出現 × 呼吸（SP軽量最適化）
  ======================================================= */
  useEffect(() => {
    if (!imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, y: 50, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.to(imgRef.current, {
      y: -10,
      duration: 6.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [current]);

  /* =======================================================
       SP RENDER
  ======================================================= */
  return (
    <section
      id="headphone-sp"
      className="
        relative w-full overflow-hidden
        pt-[18vh] pb-[18vh]
        bg-gradient-to-b
        from-[#111214]
        via-[#e7e9ed]/50
        to-[#ffffff]
      "
    >
      {/* Light Noise */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[url('/lumin/noise-ultrafine.png')]
          opacity-[0.04]
          mix-blend-soft-light
        "
      />

      {/* TITLE */}
      <div className="relative z-10 mb-16 text-center px-6">
        <div className="w-[60%] mx-auto h-[1px] bg-white/25 mb-5" />
        <p className="text-[0.75rem] tracking-[0.28em] text-white/60">
          HEADPHONE — LÜMIN STUDIO
        </p>
      </div>

      {/* IMAGE */}
      <img
        ref={imgRef}
        key={current.key}
        src={current.img}
        alt={current.name}
        className="
          relative z-10 mx-auto
          w-[78%] max-w-[520px]
          mb-14
          drop-shadow-[0_32px_80px_rgba(0,0,0,0.28)]
          select-none pointer-events-none
          transition-all duration-500
        "
      />

      {/* COLOR SELECT */}
      <div className="relative z-20 flex justify-center gap-6 mb-12">
        {colors.map((c) => (
          <button
            key={c.key}
            onClick={() => setCurrent(c)}
            className={`
              w-[34px] h-[34px] rounded-full border
              transition-all duration-300
              ${
                current.key === c.key
                  ? "border-white/60 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                  : "border-white/20 opacity-70 hover:opacity-90"
              }
            `}
            style={{
              backgroundImage: `url(${c.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* TEXT */}
      <div className="relative z-20 px-8 text-center">

        <h2 className="font-title-2 text-[1.9rem] tracking-[0.22em] text-[#0C0E11]/85 mb-4">
          {current.name}
        </h2>

        <p className="text-[#0D0E11]/55 tracking-[0.18em] text-[0.78rem] mb-6">
          {current.model}
        </p>

        <p className="text-[#0D0E11]/75 text-[0.92rem] leading-[1.9] tracking-[0.08em] mb-10 whitespace-pre-line">
          {current.short}
        </p>

        <p className="text-[#0F0F10]/80 text-[1.05rem] tracking-[0.12em] mb-2">
          {current.price}
        </p>

        <p className="text-[#111214]/55 text-[0.72rem] tracking-[0.16em] mb-8">
          送料無料
        </p>

        {/* BUY BUTTON */}
        <button
          onClick={() =>
            addItem({
              name: current.name,
              price: current.price,
              image: current.img,
              model: current.model,
            })
          }
          className="
            group w-full max-w-[260px] py-3 rounded-xl
            border border-black/[0.06]
            bg-white/80 backdrop-blur-[5px]
            text-[#0F0F10]/85
            text-[0.85rem] tracking-[0.18em]
            hover:bg-white/90 hover:border-black/[0.12]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
            transition-all duration-300
            mx-auto
          "
        >
          購入する
        </button>
      </div>
    </section>
  );
}
