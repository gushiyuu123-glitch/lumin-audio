// src/sections/LuminWhyDesignTechPC.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LuminWhyDesignTechPC() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const q = gsap.utils.selector(sectionRef.current);

    gsap.fromTo(
      q(".why-card"),
      { opacity: 0, y: 40, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.18,
        delay: 0.2,
      }
    );

    gsap.fromTo(
      q(".spec-table"),
      { opacity: 0, y: 50, filter: "blur(13px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        duration: 1.6,
        ease: "power3.out",
        delay: 0.65,
      }
    );
  }, []);

  return (
    <section
    id="journal"
      ref={sectionRef}
      className="
        relative w-full
        hidden lg:block
        overflow-hidden
        py-[26vh]
        bg-[#F4F6F9]
      "
    >
      {/* BACKGROUND */}
      <div
        aria-hidden
        className="
          absolute inset-0 bg-gradient-to-b
          from-[#ffffff] via-[#eef0f4] to-[#f4f6f9]
          pointer-events-none
        "
      />

      {/* WHITE FILM */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-white/55 via-white/20 to-transparent
          blur-[26px]
          opacity-[0.70]
          pointer-events-none
        "
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-14">
        {/* TITLE */}
        <div className="mb-24 text-center">
          <p className="text-[0.82rem] tracking-[0.28em] text-[#0F0F10]/55 mb-4">
            WHY LÜMIN HEADPHONE — LM-H1 SERIES
          </p>

          <h2 className="font-title-2 text-[2.65rem] tracking-[0.18em] text-[#0F0F10]/85">
            体験を決める3つの“哲学”
          </h2>
        </div>

        {/* === WHY / TECHNOLOGY / DESIGN === */}
        <div className="grid grid-cols-3 gap-14 mb-32">
          <WhyCard
            title="WHY — 選ばれる理由"
            subtitle="Reason to Choose LÜMIN"
            body={
              <>
                LÜMIN HEADPHONE は「静けさ」から逆算された設計。  
                軽量 × 密閉 × 低反射構造で音像が“立体的に浮かぶ”体験を実現。
                <br /><br />
                長時間の作業でも疲れにくく、日常の「集中の質」を底上げする。
              </>
            }
            icon="/lumin/spec-why.png"
          />

          <WhyCard
            title="TECHNOLOGY — 精密音響工学"
            subtitle="Precision Acoustic Engineering"
            body={
              <>
                40mm LÜMIN Dynamic Core が生む高解像音像。  
                QuietShell が自然なノイズ低減を実現。
                <br /><br />
                “静けさの中で細部が立つ”LÜMIN 特有の立体音。
              </>
            }
            icon="/lumin/spec-driver.png"
          />

          <WhyCard
            title="DESIGN — 素材と色の美学"
            subtitle="Material & Color Aesthetics"
            body={
              <>
                Silver Mist / Matte Black / Ceramic White。  
                光膜の質感まで計算された LÜMIN 美学。
                <br /><br />
                “存在感のない存在感”を追求した上質デザイン。
              </>
            }
            icon="/lumin/spec-design.png"
          />
        </div>

{/* === HEADPHONE & EARPHONE SPEC (横2カード) === */}
<div className="mt-32 grid grid-cols-2 gap-16">

  <SpecCardWide
    title="LÜMIN HEADPHONE — 詳細スペック"
    rows={[
      ["モデル", "LM-H1 シリーズ"],
      ["ドライバー", "40mm LÜMIN Dynamic Core"],
      ["インピーダンス", "32Ω"],
      ["周波数帯域", "10Hz – 40kHz"],
      ["再生時間", "最大32時間"],
      ["充電", "USB-C / 高速チャージ対応"],
      ["重量", "228g"],
      ["ノイズ低減", "QuietShell Passive Design"],
      ["Bluetooth", "5.3 LE / マルチペアリング"],
      ["有線モード", "3.5mm AUX"],
    ]}
  />

  <SpecCardWide
    title="LÜMIN EARPHONE — 詳細スペック"
    rows={[
      ["モデル", "LM-E1 シリーズ"],
      ["ドライバー", "12mm LÜMIN Micro-Dynamic"],
      ["周波数帯域", "20Hz – 40kHz"],
      ["充電", "USB-C（ケース）"],
      ["再生時間", "本体 8時間 / 合計 32時間"],
      ["ノイズ低減", "QuietShell Mini"],
      ["重量", "片耳 4.2g"],
      ["防滴性能", "IPX4"],
      ["Bluetooth", "5.3 LE"],
    ]}
  />

</div>

      </div>
    </section>
  );
}

/* WHY CARD */
function WhyCard({ title, subtitle, body, icon }) {
  return (
    <div
      className="
        why-card group
        bg-white/70 backdrop-blur-[10px]
        border border-black/[0.04]
        rounded-[24px]
        p-12
        shadow-[0_16px_60px_rgba(0,0,0,0.06)]
        hover:shadow-[0_22px_78px_rgba(0,0,0,0.10)]
        transition-all duration-500
      "
    >
      {/* ICON with Glow */}
      <div className="relative w-64 h-64 mx-auto mb-10">
        <div
          className="
            absolute inset-0
            rounded-full blur-[22px]
            bg-white/60
            mix-blend-lighten
          "
        />
        <img
          src={icon}
          alt=""
          className="
            w-64 h-64 relative z-10
            object-contain
            opacity-90 group-hover:opacity-100
            transition-all duration-500
          "
        />
      </div>

      {/* TITLE + Under Film Line */}
      <div className="mb-6">
        <h3 className="font-title-2 text-[1.45rem] tracking-[0.12em] text-[#0F0F10]/85">
          {title}
        </h3>
        <div
          className="
            mt-3 h-[2px]
            bg-gradient-to-r
            from-transparent via-[#ffffffaa] to-transparent
          "
        />
        <p className="mt-2 text-[0.75rem] tracking-[0.22em] text-[#0F0F10]/45">
          {subtitle}
        </p>
      </div>

      <p className="text-[1rem] leading-[2.0] text-[#0F0F10]/70">{body}</p>
    </div>
  );
}
function SpecCardWide({ title, rows }) {
  return (
    <div
      className="
        bg-white/75 backdrop-blur-[14px]
        rounded-[24px]
        border border-black/[0.04]
        shadow-[0_14px_48px_rgba(0,0,0,0.06)]
        px-10 py-12
      "
    >
      {/* TITLE */}
      <h3 className="font-title-2 text-[1.7rem] tracking-[0.12em] text-[#0F0F10]/85 mb-6">
        {title}
      </h3>

      {/* TABLE */}
      <div className="space-y-4">
        {rows.map(([label, value], i) => (
          <div 
            key={i}
            className="flex justify-between border-b border-black/[0.05] pb-2"
          >
            <span className="text-[#0F0F10]/55 text-[0.75rem] tracking-[0.16em]">
              {label}
            </span>

            <span className="text-[#0F0F10]/85 text-[0.95rem] tracking-[0.03em] text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
