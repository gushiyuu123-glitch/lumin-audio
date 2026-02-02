// src/App.jsx
import { useState, useRef, useEffect } from "react";

/* ============================================================
   PC COMPONENTS
============================================================ */
import CartPanel from "./components/CartPanel";
import HeaderSpecial from "./components/HeaderSpecial";

import Hero from "./sections/Hero";
import LuminConcept from "./sections/LuminConcept";
import LuminSoundFeatures from "./sections/LuminSoundFeatures";

import ProductIntroBand from "./sections/ProductIntroBand";

import EarphoneHeroPC from "./sections/EarphoneHeroPC";
import EarphoneProductDetailPC from "./sections/EarphoneProductDetailPC";

import LuminHeadphoneHeroPC from "./sections/LuminHeadphoneHeroPC";
import HeadphoneProductDetailPC from "./sections/HeadphoneProductDetailPC";

import LuminWhyDesignTechPC from "./sections/LuminWhyDesignTechPC";
import LuminQualityPC from "./sections/LuminQualityPC";
import ReviewSectionPC from "./sections/ReviewSectionPC";
import ContactSectionPC from "./sections/ContactSectionPC";

/* ============================================================
   SP COMPONENTS
============================================================ */
import HeaderSpecialSP from "./components/HeaderSpecialSP";
import Footer from "./components/Footer";

import HeroSP from "./sections/HeroSP";
import LuminConceptSP from "./sections/LuminConceptSP";
import LuminSoundFeaturesSP from "./sections/LuminSoundFeaturesSP";
import ProductIntroBandSP from "./sections/ProductIntroBandSP";
import EarphoneHeroSP from "./sections/EarphoneHeroSP";
import EarphoneProductDetailSP from "./sections/EarphoneProductDetailSP";
import LuminHeadphoneHeroSP from "./sections/LuminHeadphoneHeroSP";
import HeadphoneProductDetailSP from "./sections/HeadphoneProductDetailSP";
import LuminWhyDesignTechSP from "./sections/LuminWhyDesignTechSP";
import LuminQualitySP from "./sections/LuminQualitySP";
import ReviewSectionSP from "./sections/ReviewSectionSP";
import ContactSectionSP from "./sections/ContactSectionSP";
import FooterSP from "./components/FooterSP";

export default function App() {
  /* ============================================================
     STATE（選択中モデル）
  ============================================================ */
  const [selectedEarphone, setSelectedEarphone] = useState(null);
  const [selectedHeadphone, setSelectedHeadphone] = useState(null);

  /* ============================================================
     SCROLL MEMORY（戻る時に前位置へ）
  ============================================================ */
  const previousScrollY = useRef(0);

  const saveScroll = () => {
    previousScrollY.current = window.scrollY || 0;
  };

  const restoreScroll = () => {
    window.scrollTo({
      top: previousScrollY.current || 0,
      behavior: "smooth",
    });
  };

  /* ブラウザのリストア無効化 */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <main className="relative w-full overflow-x-clip overflow-y-visible text-lumin-text">

      {/* ============================================================
         PC BACKGROUND
      ============================================================ */}
      <div className="hidden lg:block" aria-hidden>
        <div
          className="
            fixed inset-0 -z-10 pointer-events-none
            bg-gradient-to-b
            from-[#0c0c0e]
            via-[#d2d3d8]/[42%]
            via-[#ebecf0]/[68%]
            to-[#f7f8fa]
            opacity-[0.92]
          "
        />
      </div>

      {/* ============================================================
         SP BACKGROUND
      ============================================================ */}
      <div className="block lg:hidden" aria-hidden>
        <div
          className="
            fixed inset-0 -z-10 pointer-events-none
            bg-gradient-to-b
            from-[#111214]
            via-[#dfe1e6]/[52%]
            to-[#ffffff]
            opacity-[0.88]
          "
        />
      </div>

      {/* ============================================================
         PC LAYOUT
      ============================================================ */}
      <div className="hidden lg:block">
        <HeaderSpecial />
        <CartPanel />

        {/* 1. HERO */}
        <Hero />

        {/* 2. WORLD / SOUND */}
        <LuminConcept />
        <LuminSoundFeatures />

        {/* 3. LINE INTRO */}
        <ProductIntroBand />

        {/* 4. EARPHONE LIST or DETAIL */}
        {!selectedEarphone && (
          <EarphoneHeroPC
            onSelect={(model) => {
              saveScroll();
              setSelectedEarphone(model);
            }}
          />
        )}

        {selectedEarphone && (
          <EarphoneProductDetailPC
            model={selectedEarphone}
            onBack={() => {
              setSelectedEarphone(null);
              restoreScroll();
            }}
          />
        )}

        {/* 5. HEADPHONE LIST or DETAIL */}
        {!selectedHeadphone && (
          <LuminHeadphoneHeroPC
            onSelect={(model) => {
              saveScroll();
              setSelectedHeadphone(model);

              // HeadphoneHero は画像が大きいため少し下へ
              setTimeout(() => {
                const y = window.scrollY || 0;
                window.scrollTo({
                  top: y + 360,
                  behavior: "smooth",
                });
              }, 40);
            }}
          />
        )}

        {selectedHeadphone && (
          <HeadphoneProductDetailPC
            model={selectedHeadphone}
            onBack={() => {
              setSelectedHeadphone(null);
              restoreScroll();
            }}
          />
        )}

        {/* 6. QUALITY / TECH / REVIEWS */}
        <LuminWhyDesignTechPC />
        <LuminQualityPC />
        <ReviewSectionPC />
        <ContactSectionPC />

        {/* FOOTER */}
        <Footer />
      </div>

      {/* ============================================================
         SP LAYOUT（完全別DOM）
      ============================================================ */}
      <div className="block lg:hidden">
        <HeaderSpecialSP />

        {/* 1. HERO */}
        <HeroSP />

        {/* 2. WORLD / SOUND */}
        <LuminConceptSP />
        <LuminSoundFeaturesSP />

        {/* 3. LINE INTRO */}
        <ProductIntroBandSP />

        {/* 4. EARPHONE LIST or DETAIL（SP版も切り替え式） */}
        {!selectedEarphone && (
          <EarphoneHeroSP
            onSelect={(model) => {
              saveScroll();
              setSelectedEarphone(model);
            }}
          />
        )}

        {selectedEarphone && (
          <EarphoneProductDetailSP
            model={selectedEarphone}
            onBack={() => {
              setSelectedEarphone(null);
              restoreScroll();
            }}
          />
        )}

        {/* 5. HEADPHONE LIST or DETAIL */}
        {!selectedHeadphone && (
          <LuminHeadphoneHeroSP
            onSelect={(model) => {
              saveScroll();
              setSelectedHeadphone(model);

              // HeadphoneHero は画像が大きいため少し下へ
              setTimeout(() => {
                const y = window.scrollY || 0;
                window.scrollTo({
                  top: y + 360,
                  behavior: "smooth",
                });
              }, 40);
            }}
          />
        )}
   {selectedHeadphone && (
          <HeadphoneProductDetailSP
            model={selectedHeadphone}
            onBack={() => {
              setSelectedHeadphone(null);
              restoreScroll();
            }}
          />
        )}
  <LuminWhyDesignTechSP />
   <LuminQualitySP />
     <ReviewSectionSP />
      <ContactSectionSP />
        {/* FOOTER */}
        <FooterSP />
      </div>
    </main>
  );
}
