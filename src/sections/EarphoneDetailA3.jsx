// src/sections/EarphoneDetailA3.jsx
import { useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import gsap from "gsap";

export default function EarphoneDetailA3() {
  const { addItem } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const q = gsap.utils.selector(el);

    gsap.fromTo(
      q(".A3"),
      { opacity: 0, y: 50, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.20,
      }
    );
  }, []);

  const P = {
    name: "LÜMIN AIR STUDIO",
    model: "LM-A3",
    price: "¥6,800（税込）",
    desc: "静けさの中の立体。スタジオ級の“空間解像”を実現。",
    img: "/lumin/e33.png",
  };

  const colors = [
    { key: "white", label: "CERAMIC WHITE", img: "/lumin/e111.png" },
    { key: "black", label: "MATTE BLACK", img: "/lumin/e22.png" },
    { key: "silver", label: "SILVER MIST", img: "/lumin/e33.png" },
  ];

  return (
    <section
      ref={ref}
      className="
        relative w-full hidden lg:block
        py-[22vh] bg-[#F5F7FA] overflow-hidden
      "
    >
      {/* BG */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b from-white via-[#e7ebf1] to-[#f3f5f8]
          opacity-[0.95]
        "
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-14 flex items-center justify-between gap-20">
        {/* IMAGE（A1と同じ左配置） */}
        <img
          src={P.img}
          alt={P.name}
          className="
            w-[50%] max-w-[620px] A3
            drop-shadow-[0_40px_90px_rgba(0,0,0,0.16)]
          "
        />

        {/* INFO */}
        <div className="w-[44%] A3">
          <p className="text-[0.8rem] tracking-[0.32em] text-[#0F0F10]/45 mb-2">
            {P.model}
          </p>

          <h2 className="font-title-2 text-[2.35rem] tracking-[0.14em] text-[#0F0F10]/90 mb-6">
            {P.name}
          </h2>

          <p className="text-[#0F0F10]/65 leading-[1.9] mb-6">{P.desc}</p>

          <p className="text-[#0F0F10]/85 text-[1.15rem] tracking-[0.12em] mb-8">
            {P.price}
          </p>

          {/* COLORS */}
          <div className="mb-10">
            <p className="text-[0.75rem] tracking-[0.24em] text-[#0F0F10]/45 mb-3">
              カラー
            </p>

            <div className="flex gap-6">
              {colors.map((c) => (
                <div key={c.key} className="flex flex-col items-center">
                  <img
                    src={c.img}
                    className="
                      w-20 h-20 object-contain opacity-80
                      hover:opacity-100 cursor-pointer mb-2
                    "
                  />
                  <span className="text-[0.65rem] tracking-[0.2em] text-[#0F0F10]/55">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BUY */}
          <button
            onClick={() =>
              addItem({ name: P.name, price: P.price, image: P.img })
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
    </section>
  );
}
