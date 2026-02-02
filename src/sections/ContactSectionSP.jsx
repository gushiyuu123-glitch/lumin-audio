// src/sections/ContactSectionSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ContactSectionSP() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  /* =============================
     GSAP：静かに立ち上がる（SPは軽め）
  ============================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const q = gsap.utils.selector(el);

    gsap.fromTo(
      q(".contact-title-sp"),
      { opacity: 0, y: 20, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      q(".faq-item-sp"),
      { opacity: 0, y: 28, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power2.out",
        stagger: 0.14,
        delay: 0.15,
      }
    );
  }, []);

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
      ref={sectionRef}
      id="contact"
      className="
        lg:hidden relative w-full
        py-[14vh] px-6
        overflow-hidden
        bg-[#F8F9FB]
      "
    >
      {/* BG：Silver Mist × Dior Veil */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#FBFCFE]
          via-[#EEF1F5]/80
          to-[#E6E8EE]/70
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(120deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.12)_70%)]
          backdrop-blur-[2px]
        "
      />

      <div className="relative z-10">

        {/* TITLE */}
        <div className="contact-title-sp text-center mb-[10vh]">
          <p className="text-[0.68rem] tracking-[0.30em] text-[#0D0E11]/55 mb-2">
            SUPPORT / FAQ
          </p>
          <h2 className="font-title-2 text-[1.85rem] tracking-[0.16em] text-[#0D0E11]/85 leading-[1.45]">
            お問い合わせ・ご利用ガイド
          </h2>

          <div className="mx-auto mt-4 h-[1px] w-[140px] bg-[#0D0E11]/20" />
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-8">
          {faqs.map((item, i) => (
            <div key={i} className="faq-item-sp border-b border-[#0D0E11]/15 pb-4">
              <button
                onClick={() => toggle(i)}
                className="
                  w-full flex justify-between items-center
                  py-2
                  text-left
                  text-[1.05rem] tracking-[0.03em]
                  text-[#0D0E11]/85
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
                  overflow-hidden transition-all duration-300
                  ${openIndex === i ? "max-h-[240px] pt-2" : "max-h-0 pt-0"}
                `}
              >
                <p
                  className="
                    text-[0.9rem] leading-[1.85]
                    whitespace-pre-line
                    text-[#0D0E11]/70
                    tracking-[0.02em]
                    pl-[2px]
                  "
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT BUTTONS */}
        <div className="mt-[14vh] flex flex-col items-center gap-5">

          {/* TEL */}
          <a
            href="tel:0120-000-000"
            className="
              w-[260px] py-3.5 px-5
              flex items-center justify-center gap-3
              rounded-xl border border-[#0D0E11]/15
              bg-white/55 backdrop-blur-[8px]
              hover:bg-white/75 transition-all
              text-[#0D0E11]/85 tracking-[0.03em]
              shadow-[0_5px_14px_rgba(0,0,0,0.04)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] stroke-[#0D0E11]/55"
              fill="none"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-.883c0-.516-.351-.966-.852-1.09l-3.482-.87a1.125 1.125 0 0 0-1.173.417l-.97 1.293a12.035 12.035 0 0 1-5.514-5.514l1.293-.98c.37-.27.54-.75.417-1.17l-.87-3.48A1.125 1.125 0 0 0 9.38 3h-.88A2.25 2.25 0 0 0 6.25 5.25v1.5Z"
              />
            </svg>
            <span className="text-[0.95rem]">電話で問い合わせ</span>
          </a>

          {/* MAIL */}
          <a
            href="mailto:contact@lumin-audio.jp"
            className="
              w-[260px] py-3.5 px-5
              flex items-center justify-center gap-3
              rounded-xl border border-[#0D0E11]/15
              bg-white/55 backdrop-blur-[8px]
              hover:bg-white/75 transition-all
              text-[#0D0E11]/85 tracking-[0.03em]
              shadow-[0_5px_14px_rgba(0,0,0,0.04)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] stroke-[#0D0E11]/55"
              fill="none"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a1.5 1.5 0 0 1-.732 1.287l-7.5 4.5a1.5 1.5 0 0 1-1.536 0l-7.5-4.5a1.5 1.5 0 0 1-.732-1.287V6.75"
              />
            </svg>
            <span className="text-[0.95rem]">メールで問い合わせ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
