// src/sections/LuminWhyDesignTechSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LuminWhyDesignTechSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const q = gsap.utils.selector(sectionRef.current);

    // WHY カード
    gsap.fromTo(
      q(".why-card-sp"),
      { opacity: 0, y: 20, filter: "blur(3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power2.out",
        stagger: 0.16,
      }
    );

    // SPEC カード
    gsap.fromTo(
      q(".spec-card-sp"),
      { opacity: 0, y: 26, filter: "blur(3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.18,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      id="journal-sp"
      ref={sectionRef}
      className="
        relative w-full lg:hidden
        overflow-hidden
        bg-[#F6F8FB]
        px-6 py-[14vh]
      "
    >
      {/* BG FILM */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-white via-[#eef0f4] to-[#f4f6f9]
          opacity-[0.95]
        "
      />

      <div className="relative z-10">

        {/* TITLE */}
        <div className="mb-14 text-center">
          <p className="text-[0.75rem] tracking-[0.26em] text-[#0F0F10]/55 mb-3">
            WHY LÜMIN HEADPHONE — LM-H1 SERIES
          </p>

          <h2
            className="
              font-title-2 text-[1.85rem]
              tracking-[0.14em]
              text-[#0F0F10]/85
              leading-[1.4]
              whitespace-pre-line
            "
          >
            体験を決める{"\n"}3つの“哲学”
          </h2>
        </div>

        {/* WHY CARDS */}
        <div className="flex flex-col gap-10 mb-20">
          <WhyCardSP
            title={`WHY —\n選ばれる理由`}
            subtitle="Reason to Choose LÜMIN"
            body={
              <>
                LÜMIN HEADPHONE は「静けさ」から逆算された設計。  
                軽量 × 密閉 × 低反射構造で音像が“立体的に浮かぶ”体験。
                <br /><br />
                長時間の作業でも疲れにくく、  
                日常の「集中の質」を底上げする。
              </>
            }
            icon="/lumin/spec-why.png"
          />

          <WhyCardSP
            title={`TECHNOLOGY —\n精密音響工学`}
            subtitle="Precision Acoustic Engineering"
            body={
              <>
                40mm LÜMIN Dynamic Core により  
                高解像度の立体音像を実現。
                <br /><br />
                “静けさの中で細部が立つ”  
                LÜMIN 特有の音響思想。
              </>
            }
            icon="/lumin/spec-driver.png"
          />

          <WhyCardSP
            title={`DESIGN —\n素材と色の美学`}
            subtitle="Material & Color Aesthetics"
            body={
              <>
                Silver Mist / Matte Black / Ceramic White。  
                光膜の質感まで含めた LÜMIN デザイン哲学。
                <br /><br />
                “存在感のない存在感” を追求した上質設計。
              </>
            }
            icon="/lumin/spec-design.png"
          />
        </div>

        {/* SPEC CARDS */}
        <div className="flex flex-col gap-12">

          <SpecCardSP
            title={`LÜMIN HEADPHONE\n— 詳細スペック`}
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

          <SpecCardSP
            title={`LÜMIN EARPHONE\n— 詳細スペック`}
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

/* ============================================================
   WHY CARD（SP）
============================================================ */
function WhyCardSP({ title, subtitle, body, icon }) {
  return (
    <div
      className="
        why-card-sp
        bg-white/75 backdrop-blur-[10px]
        border border-black/[0.05]
        rounded-[20px]
        px-8 py-10
        shadow-[0_10px_32px_rgba(0,0,0,0.08)]
      "
    >
      {/* ICON */}
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div
          className="
            absolute inset-0 rounded-full
            bg-white/50 blur-[16px]
          "
        />
        <img
          src={icon}
          alt=""
          className="relative w-40 h-40 object-contain opacity-90"
        />
      </div>

      {/* TITLE */}
      <h3
        className="
          font-title-2 text-[1.35rem]
          tracking-[0.12em]
          text-[#0F0F10]/85
          mb-3 text-center
          whitespace-pre-line
        "
      >
        {title}
      </h3>

      <p className="text-center text-[0.72rem] tracking-[0.20em] text-[#0F0F10]/45 mb-6">
        {subtitle}
      </p>

      <p className="text-[0.9rem] leading-[1.9] tracking-[0.03em] text-[#0F0F10]/70 whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}

/* ============================================================
   SPEC CARD（SP）
============================================================ */
function SpecCardSP({ title, rows }) {
  return (
    <div
      className="
        spec-card-sp
        bg-white/80 backdrop-blur-[12px]
        rounded-[20px]
        border border-black/[0.05]
        shadow-[0_10px_32px_rgba(0,0,0,0.06)]
        px-8 py-10
      "
    >
      <h3
        className="
          font-title-2 text-[1.55rem]
          tracking-[0.12em]
          text-[#0F0F10]/85
          mb-6 text-center
          whitespace-pre-line
        "
      >
        {title}
      </h3>

      <div className="space-y-3">
        {rows.map(([label, value], i) => (
          <div key={i} className="flex justify-between border-b border-black/[0.05] pb-2">
            <span className="text-[#0F0F10]/55 text-[0.75rem] tracking-[0.14em]">
              {label}
            </span>
            <span className="text-[#0F0F10]/85 text-[0.9rem] tracking-[0.02em] text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
