// src/sections/EarphoneHeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "../contexts/CartContext";

export default function EarphoneHeroSP({
  models = [
    {
      name: "LÜMIN AIR ONE",
      model: "LM-A1",
      price: "¥6,800（税込）",
      spec: "5時間再生 / 片耳3.8g / IPX4",
      img: "/lumin/e111.png",
      short: "軽やかな空気感 — 日常に溶ける透明サウンド",
    },
    {
      name: "LÜMIN AIR PRO",
      model: "LM-A2",
      price: "¥6,800（税込）",
      spec: "7時間再生 / 片耳4.1g / IPX5",
      img: "/lumin/e22.png",
      short: "深度のある密度 — 音の“輪郭”が美しく立ち上がる",
    },
    {
      name: "LÜMIN AIR STUDIO",
      model: "LM-A3",
      price: "¥6,800（税込）",
      spec: "8時間再生 / 片耳4.4g / IPX5",
      img: "/lumin/e33.png",
      short: "静けさの中の立体 — スタジオ級の空間解像",
    },
  ],
  onSelect = () => {},
}) {
  const { addItem } = useCart();
  const imgRefs = useRef([]);

  useEffect(() => {
    imgRefs.current.forEach((img, i) => {
      if (!img) return;

      // 登場（控えめ・上質）
      gsap.fromTo(
        img,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.35 + i * 0.14,
          ease: "power2.out",
        }
      );

      // 呼吸アニメ
      gsap.to(img, {
        y: -12,
        duration: 7 + i * 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <section
      id="earphone-sp"
      className="
        relative w-full 
        bg-[#F8FAFD]
        py-[12vh]
        px-6
        overflow-hidden
      "
    >
      {/* 背景白銀（明度少し落として可読性UP） */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#ffffff] via-[#f3f5f7]/70 to-[#f7f8fa]
          opacity-[0.92]
          pointer-events-none
        "
      />

      {/* noise（干渉しすぎない 0.05） */}
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-[0.05]
          bg-[url('/lumin/noise-fine.png')]
          mix-blend-soft-light
        "
      />

      {/* TITLE */}
      <div className="relative z-10 mb-16 text-center">
        <div className="w-[64%] h-[1px] bg-[#111214]/15 mx-auto mb-4" />
        <p
          className="
            text-[0.75rem]
            tracking-[0.32em]
            text-[#0F1012]/55
          "
        >
          EARPHONE LINE — LÜMIN AIR
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="relative z-10 flex flex-col gap-20">
        {models.map((m, i) => (
          <div
            key={i}
            className="
              relative flex flex-col items-center text-center
              pt-10 pb-14 px-6
              rounded-3xl overflow-hidden
            "
          >
            {/* 背景膜（光を弱めた版） */}
            <div
              aria-hidden
              className="
                absolute inset-0 pointer-events-none
                bg-gradient-to-br
                from-[rgba(255,255,255,0.28)]
                via-[rgba(255,255,255,0.06)]
                to-transparent
                blur-[26px]
              "
            />

            {/* IMAGE */}
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={m.img}
              alt={m.name}
              className="
                w-[82%] max-w-[340px]
                drop-shadow-[0_26px_68px_rgba(0,0,0,0.16)]
                mb-10
                select-none pointer-events-none
              "
            />

            {/* SHORT（視認性を上げて世界観そのまま） */}
            <p className="text-[#0D0E11]/70 drop-shadow-[0_0_1px_rgba(0,0,0,0.2)] text-[0.82rem] tracking-[0.20em] mb-3 leading-[1.9]">
              {m.short}
            </p>

            {/* NAME */}
            <h3 className="font-title-2 text-[1.45rem] tracking-[0.12em] text-[#0A0B0D]/85 mb-2">
              {m.name}
            </h3>

            {/* MODEL */}
            <p className="text-[#111214]/40 text-[0.72rem] tracking-[0.22em] mb-1">
              {m.model}
            </p>

            {/* PRICE */}
            <p className="text-[#0F1012]/75 text-[0.9rem] tracking-[0.08em] mb-4">
              {m.price}
            </p>

            {/* SHIPPING */}
            <p className="text-[#111214]/35 text-[0.68rem] tracking-[0.22em] mb-6">
              送料無料
            </p>

            {/* BUY BUTTON */}
            <button
              onClick={() =>
                addItem({
                  name: m.name,
                  price: m.price,
                  image: m.img,
                  model: m.model,
                })
              }
              className="
                w-[90%] py-3 rounded-xl
                border border-black/[0.06]
                bg-white/60 backdrop-blur-[6px]
                text-[#0F0F10]/80
                text-[0.82rem] tracking-[0.18em]
                hover:bg-white/70 hover:border-black/[0.10]
                transition-all duration-250
              "
            >
              購入する
            </button>

            {/* SELECT BUTTON */}
            <button
              onClick={() => onSelect(m.model)}
              className="
                group mt-6 w-[88%] py-3
                rounded-full border border-[#0E0F11]/15
                bg-white/20 backdrop-blur-[6px]
                text-[0.72rem] tracking-[0.26em]
                text-[#0E0F11]/70
                transition-all duration-400
                relative
              "
            >
              <span
                className="
                  absolute inset-0 rounded-full -z-10
                  bg-gradient-to-r from-transparent via-white/35 to-transparent
                  opacity-0 blur-[16px]
                  group-hover:opacity-100 group-hover:blur-[26px]
                  transition-all duration-400
                "
              />
              音の輪郭を感じる
            </button>
          </div>
        ))}
      </div>

      {/* NOTES（視認性を上げた完全版） */}
      <p
        className="
          mt-[10vh]
          text-[#0D0E11]/70
          drop-shadow-[0_0_1px_rgba(0,0,0,0.22)]
          text-[0.78rem]
          tracking-[0.20em]
          leading-[2]
          text-center
          px-4
        "
      >
        すべてのモデルは「空気」「静けさ」「密度」という LÜMIN の音響思想のもと、
        本来の音が持つ美しさだけを丁寧に残すよう設計されています。
      </p>
    </section>
  );
}
