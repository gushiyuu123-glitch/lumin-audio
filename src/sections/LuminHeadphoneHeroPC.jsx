// src/sections/LuminHeadphoneHeroPC.jsx
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCart } from "../contexts/CartContext";

export default function LuminHeadphoneHeroPC() {
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

  const [current, setCurrent] = useState(colors[1]);

  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    // ① 初期値は「必ず」ここで固定（Observerの外）
    gsap.set(img, {
      opacity: 0,
      y: 40,
      scale: 1.04,
      filter: "blur(4px)",
    });

    let breathed = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // ② フェードイン
        gsap.to(img, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.55,
          ease: "power3.out",
          overwrite: "auto",
        });

        // ③ 呼吸（1回だけ起動）
        if (!breathed) {
          breathed = true;
          gsap.to(img, {
            y: -16,
            duration: 7.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.35,
            overwrite: "auto",
          });
        }

        io.disconnect();
      },
      {
        // ← まず確実に動かしたいから “強すぎない値” にしてる
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    // 観測対象は hero じゃなく img にする（安定）
    io.observe(img);

    return () => io.disconnect();
  }, [current.key]);

  return (
    <section
      id="headphone"
      ref={heroRef}
      className="
        relative w-full min-h-screen
        overflow-hidden flex flex-col items-center
        bg-[#F4F6F9]
        pt-[20vh] pb-[20vh]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0f2f5]/50 to-[#f4f6f9]" />
      <div className="absolute inset-0 bg-[url('/lumin/noise-fine.png')] opacity-[0.025] mix-blend-soft-light" />

      <div className="relative z-10 mb-20 flex flex-col items-center text-center">
        <div className="w-[40%] h-[1px] bg-[#0F1012]/18 mb-6" />
        <p className="text-[0.92rem] tracking-[0.30em] text-[#0F1012]/60">
          HEADPHONE LINE — LÜMIN STUDIO
        </p>
      </div>

      <img
        ref={imgRef}
        key={current.key}
        src={current.img}
        alt={current.name}
        className="
          relative z-10
          w-[62vw] max-w-[1150px]
          mb-24 select-none pointer-events-none
          drop-shadow-[0_46px_110px_rgba(0,0,0,0.12)]
        "
      />

      <div className="relative z-20 flex gap-7 mb-12">
        {colors.map((c) => (
          <button
            key={c.key}
            onClick={() => setCurrent(c)}
            className={`
              w-[38px] h-[38px] rounded-full border
              transition-all duration-300
              ${
                current.key === c.key
                  ? "border-black/40 scale-110 shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                  : "border-black/10 opacity-70 hover:opacity-95"
              }
            `}
            style={{
              backgroundImage: `url(${c.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label={c.label}
          />
        ))}
      </div>

      <div className="relative z-20 w-full flex flex-col items-center mt-[6vh] pb-[10vh]">
        <h2 className="font-title-2 text-[2.5rem] tracking-[0.22em] text-[#0C0E11]/85 mb-4">
          {current.name}
        </h2>

        <p className="text-[#0D0E11]/55 tracking-[0.18em] text-[0.88rem] mb-6">
          {current.model}
        </p>

        <p className="text-[#0D0E11]/75 text-[1rem] leading-[2] tracking-[0.12em] max-w-[900px] text-center mb-12">
          {current.short}
        </p>

        <p className="text-[#0F0F10]/85 text-[1.15rem] tracking-[0.12em] mb-3">
          {current.price}
        </p>

        <p className="text-[#111214]/55 text-[0.72rem] tracking-[0.20em] mb-12">
          送料無料
        </p>

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
            bg-white/75 backdrop-blur-[4px]
            text-[#0F0F10]/85
            text-[0.85rem] tracking-[0.18em]
            hover:bg-white/85 hover:border-black/[0.10]
            hover:shadow-[0_12px_38px_rgba(0,0,0,0.06)]
            transition-all duration-300
          "
        >
          購入する
        </button>
      </div>
    </section>
  );
}
