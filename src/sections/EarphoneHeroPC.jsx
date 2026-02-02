// src/sections/EarphoneHeroPC.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "../contexts/CartContext";

export default function EarphoneHeroPC({
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
  const heroRef = useRef(null);
  const imgRefs = useRef([]);
  const { addItem } = useCart();

  /* ================================================================
      GSAP + IntersectionObserver（最上質フェードイン）
  ================================================================= */
  useEffect(() => {
    if (!heroRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        imgRefs.current.forEach((img, i) => {
          if (!img) return;

          /* ---- ① 初期値（薄膜 × 静か × 控えめ blur） ---- */
          gsap.set(img, {
            opacity: 0,
            y: 42,
            scale: 1.045,
            filter: "blur(5px)",
          });

          /* ---- ② フェードイン（高級版） ---- */
          gsap.to(img, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.55 + i * 0.23,
            ease: "power3.out",
          });

          /* ---- ③ 呼吸（ゆっくり、密度がある動き） ---- */
          gsap.to(img, {
            y: -14,
            duration: 6.8 + i * 0.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.4 + i * 0.22,
          });
        });

        io.disconnect();
      },
      {
        threshold: 0.52,
        rootMargin: "0px 0px -18% 0px", // ← さらに遅発火で“静けさ”が増す
      }
    );

    io.observe(heroRef.current);

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="earphone"
      ref={heroRef}
      className="
        relative w-full min-h-screen 
        overflow-hidden
        bg-[#F8FAFD]
        flex flex-col items-center
        pt-[16vh]
        pb-[16vh]
      "
    >
      {/* TITLE */}
      <div className="relative z-10 mb-24 flex flex-col items-center text-center">
        <div className="w-[44%] h-[1px] bg-[#111214]/15 mb-6" />
        <p className="text-[0.9rem] tracking-[0.32em] text-[#0F1012]/50">
          EARPHONE LINE — LÜMIN AIR
        </p>
      </div>

      {/* PRODUCTS */}
      <div
        className="
          relative z-10 grid grid-cols-3 gap-20
          max-w-[1280px] px-20
        "
      >
        {models.map((m, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center pt-10 pb-16 px-6"
          >
            {/* IMAGE（初期状態：完全不可視） */}
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={m.img}
              alt={m.name}
              className="
                opacity-0
                translate-y-[42px]
                blur-[5px]
                w-[22vw] max-w-[360px]
                object-contain pointer-events-none select-none
                drop-shadow-[0_48px_120px_rgba(0,0,0,0.20)]
                mb-16
              "
            />

            {/* COPY */}
            <p className="text-[#111214]/55 text-[0.9rem] tracking-[0.20em] mb-4 leading-[1.8]">
              {m.short}
            </p>

            <h3 className="font-title-2 text-[1.55rem] tracking-[0.12em] text-[#0A0B0D]/85 mb-2">
              {m.name}
            </h3>

            <p className="text-[#111214]/45 text-[0.78rem] tracking-[0.22em] mb-1">
              {m.model}
            </p>

            <p className="text-[#0F1012]/75 text-[0.95rem] tracking-[0.08em] mb-4">
              {m.price}
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
                group
                w-full max-w-[240px] py-3 rounded-xl
                border border-black/[0.06]
                bg-white/60 backdrop-blur-[5px]
                text-[#0F0F10]/80
                text-[0.85rem] tracking-[0.18em]
                hover:bg-white/70 hover:border-black/[0.10]
                hover:shadow-[0_12px_38px_rgba(0,0,0,0.06)]
                transition-all duration-300
              "
            >
              購入する
            </button>

            {/* DETAIL BUTTON */}
            <button
              onClick={() => onSelect(m.model)}
              className="
                group relative mt-8 px-9 py-3 rounded-full
                border border-[#0E0F11]/10
                bg-white/12 backdrop-blur-[3px]
                text-[0.72rem] tracking-[0.20em] text-[#0E0F11]/55
                transition-all duration-400
                hover:bg-white/18 hover:border-[#0E0F11]/15
              "
            >
              <span
                className="
                  absolute inset-0 rounded-full -z-10
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  opacity-0 blur-[12px]
                  group-hover:opacity-60 group-hover:blur-[18px]
                  transition-all duration-500
                "
              />
              音の輪郭を感じる
            </button>
          </div>
        ))}
        
      
      </div>
      {/* NOTES */}
      <p className="mt-[12vh] text-[#1A1C1F]/60 text-[0.9rem] tracking-[0.20em] leading-[2] text-center max-w-[900px] px-10">
        すべてのモデルは「空気」「静けさ」「密度」という LÜMIN の音響思想に基づき、
        <br></br>本来の音が持つ美しさだけを丁寧に残すよう設計されています。
      </p>
    </section>
  );
}
