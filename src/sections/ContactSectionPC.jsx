// src/sections/ContactSectionPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ContactSectionPC() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  /* =============================
     GSAP：静かに立ち上がる
  ============================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".contact-title"),
      { opacity: 0, y: 24, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        duration: 1.2,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      el.querySelectorAll(".faq-item"),
      { opacity: 0, y: 32, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        duration: 1.45,
        stagger: 0.18,
        ease: "power3.out",
      }
    );
  }, []);

  /* =============================
     FAQ 内容
  ============================= */
  const faqs = [
    {
      q: "送料について",
      a: `全国一律 650円（税込）。\n10,000円以上のご注文で送料無料。`,
    },
    {
      q: "発送までの日数",
      a: `通常 2〜3営業日以内に発送。`,
    },
    {
      q: "支払い方法",
      a: `クレジットカード・Apple Pay・Google Pay に対応。`,
    },
    {
      q: "不良品の交換",
      a: `破損・欠陥がある場合は到着後7日以内にご連絡ください。\n送料当社負担にて交換対応いたします。`,
    },
    {
      q: "返品・キャンセル",
      a: `お客様都合の返品は不可。\n発送後のキャンセルもお受けできません。`,
    },
  ];

  return (
    <section
    id="contact"
      ref={sectionRef}
      className="
        hidden lg:block relative w-full
        py-[22vh] overflow-hidden
        bg-[#F7F8FA]
      "
    >
      {/* BG：Apple Silver Mist + Dior veil */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#FAFBFC]
          via-[#EEF1F6]/80
          to-[#E3E6EC]/70
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_70%)]
          backdrop-blur-[3px]
        "
      />

      <div className="relative z-10 max-w-[920px] mx-auto px-20">

        {/* TITLE */}
        <div className="contact-title text-center mb-[12vh]">
          <p className="text-[0.78rem] tracking-[0.32em] text-[#0D0E11]/55 mb-3">
            SUPPORT / FAQ
          </p>
          <h2 className="font-title-2 text-[2.35rem] tracking-[0.18em] text-[#0D0E11]/85">
            お問い合わせ・ご利用ガイド
          </h2>
        </div>

        {/* ACCORDION */}
        <div className="space-y-10">
          {faqs.map((item, i) => (
            <div key={i} className="faq-item border-b border-[#0D0E11]/15 pb-6">
              <button
                onClick={() => toggle(i)}
                className="
                  w-full text-left py-3
                  text-[1.15rem] tracking-[0.04em]
                  text-[#0D0E11]/85
                  flex justify-between items-center
                "
              >
                {item.q}
                <span
                  className={`
                    text-[1.4rem] text-[#0D0E11]/40
                    transition-transform duration-300
                    ${openIndex === i ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>

              <div
                className={`
                  overflow-hidden transition-all
                  ${openIndex === i ? "max-h-[260px] pt-2" : "max-h-0 pt-0"}
                `}
              >
                <p
                  className="
                    text-[0.95rem] leading-[1.9]
                    whitespace-pre-line tracking-[0.03em]
                    text-[#0D0E11]/70 pl-[2px]
                  "
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================
            CONTACT BUTTONS — Apple Support / Ultra Minimal
        ============================================ */}
        <div className="mt-[16vh] flex flex-col items-center gap-6">

          {/* TEL */}
          <a
            href="tel:0120-000-000"
            className="
              w-[280px] py-4 px-6
              flex items-center justify-center gap-3
              rounded-xl border border-[#0D0E11]/10
              bg-white/55 backdrop-blur-[10px]
              hover:bg-white/75
              transition-all
              text-[#0D0E11]/85 tracking-[0.04em]
              shadow-[0_6px_16px_rgba(0,0,0,0.04)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] stroke-[#0D0E11]/55"
              fill="none"
              strokeWidth="1.4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-.883c0-.516-.351-.966-.852-1.09l-3.482-.87a1.125 1.125 0 0 0-1.173.417l-.97 1.293a12.035 12.035 0 0 1-5.514-5.514l1.293-.97c.37-.277.54-.756.417-1.173l-.87-3.482A1.125 1.125 0 0 0 9.383 3h-.883A2.25 2.25 0 0 0 6.25 5.25v1.5Z"
              />
            </svg>
            <span className="text-[0.98rem]">電話で問い合わせ</span>
          </a>

          {/* MAIL */}
          <a
            href="mailto:contact@lumin-audio.jp"
            className="
              w-[280px] py-4 px-6
              flex items-center justify-center gap-3
              rounded-xl border border-[#0D0E11]/10
              bg-white/55 backdrop-blur-[10px]
              hover:bg-white/75
              transition-all
              text-[#0D0E11]/85 tracking-[0.04em]
              shadow-[0_6px_16px_rgba(0,0,0,0.04)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] stroke-[#0D0E11]/55"
              fill="none"
              strokeWidth="1.4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a1.5 1.5 0 0 1-.732 1.287l-7.5 4.5a1.5 1.5 0 0 1-1.536 0l-7.5-4.5a1.5 1.5 0 0 1-.732-1.287V6.75"
              />
            </svg>
            <span className="text-[0.98rem]">メールで問い合わせ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
