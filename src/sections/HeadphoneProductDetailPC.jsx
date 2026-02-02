// src/sections/HeadphoneProductDetailPC.jsx
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeadphoneProductDetailPC() {
  const { addItem } = useCart();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".detail-item"),
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      }
    );
  }, []);

  const headphone = {
    name: "LÜMIN HEADPHONE – LM-H1",
    price: "¥9,800（税込）",
    img: "/lumin/headphone1.png",
    desc: "静けさの中で立体音像が浮かび上がる、LÜMINの代表モデル。",
  };

  const colors = [
    {
      key: "white",
      label: "CERAMIC WHITE",
      img: "/lumin/headphone-white.png",
    },
    {
      key: "black",
      label: "MATTE BLACK",
      img: "/lumin/h2.png",
    },
    {
      key: "silver",
      label: "SILVER MIST",
      img: "/lumin/headphone1.png",
    },
  ];

  return (
    <section
     id="headphone"
      ref={sectionRef}
      className="
        relative w-full hidden lg:block
        py-[28vh] overflow-hidden
        bg-[#F4F6F9]
      "
    >
      {/* BG */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b from-[#ffffff] via-[#edf0f5] to-[#f6f7f9]
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-b from-white/50 via-white/20 to-transparent
          blur-[26px]
        "
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-14">
        {/* TITLE */}
        <div className="text-center mb-20 detail-item">
          <p className="text-[0.82rem] tracking-[0.28em] text-[#0F0F10]/55 mb-3">
            LÜMIN HEADPHONE – LM-H1
          </p>
          <h2 className="font-title-2 text-[2.4rem] tracking-[0.18em] text-[#0F0F10]/85">
            PRODUCT DETAIL
          </h2>
        </div>

        {/* MAIN */}
        <div className="flex items-center justify-between gap-20 detail-item">
          {/* LEFT IMAGE */}
          <img
            src={headphone.img}
            alt={headphone.name}
            className="
              w-[48%] max-w-[680px]
              drop-shadow-[0_40px_90px_rgba(0,0,0,0.15)]
            "
          />

          {/* RIGHT INFO */}
          <div className="w-[48%]">
            <h3 className="font-title-2 text-[1.85rem] tracking-[0.12em] text-[#0F0F10]/85 mb-4">
              {headphone.name}
            </h3>

            <p className="text-[#0F0F10]/65 leading-[1.9] mb-6">
              {headphone.desc}
            </p>

            <p className="text-[#0F0F10]/85 text-[1.15rem] tracking-[0.12em] mb-6">
              {headphone.price}
            </p>

            {/* COLORS */}
            <div className="mb-10">
              <p className="text-[0.78rem] tracking-[0.24em] text-[#0F0F10]/50 mb-3">
                カラー
              </p>

              <div className="flex gap-6">
                {colors.map((c) => (
                  <div key={c.key} className="flex flex-col items-center">
                    <img
                      src={c.img}
                      className="w-24 h-24 object-contain mb-2 opacity-80 hover:opacity-100 cursor-pointer"
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
                  name: headphone.name,
                  price: headphone.price,
                  image: headphone.img,
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
      </div>
    </section>
  );
}
