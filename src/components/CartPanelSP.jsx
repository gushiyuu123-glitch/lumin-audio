// src/components/CartPanelSP.jsx
import { X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef } from "react";

/* ============================================================
   安全な通貨フォーマット
============================================================ */
function safeYen(n) {
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(v);
}

export default function CartPanelSP() {
  const {
    cartItems = [],
    isOpen = false,
    setIsOpen = () => {},
    removeItem = () => {},
    inc = () => {},
    dec = () => {},
    subtotal = 0,
    shipping = 0,
    total = 0,
  } = useCart();

  const panelRef = useRef(null);

  /* ============================================================
     SP: open時はスクロールロック
============================================================ */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  /* ============================================================
     iOS式：スワイプダウンで閉じる（摩擦×慣性感UP）
============================================================ */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    let startY = 0;
    let delta = 0;

    const onStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onMove = (e) => {
      delta = e.touches[0].clientY - startY;

      if (delta > 0) {
        const friction = delta * 0.82;
        panel.style.transform = `translateY(${friction}px)`;
      }
    };

    const onEnd = () => {
      if (delta > 120) {
        setIsOpen(false);
      } else {
        panel.style.transition = "transform 0.28s ease-out";
        panel.style.transform = "translateY(0)";
        setTimeout(() => {
          panel.style.transition = "";
        }, 280);
      }
      delta = 0;
    };

    panel.addEventListener("touchstart", onStart);
    panel.addEventListener("touchmove", onMove);
    panel.addEventListener("touchend", onEnd);

    return () => {
      panel.removeEventListener("touchstart", onStart);
      panel.removeEventListener("touchmove", onMove);
      panel.removeEventListener("touchend", onEnd);
    };
  }, [setIsOpen]);

  /* ============================================================
     Footer fixed bar
============================================================ */
  const Footer = () => (
    <div
      className="
        sticky bottom-0 left-0 w-full
        bg-white/75 backdrop-blur-[14px]
        border-t border-black/10
        px-6 py-4
        z-[99999]
      "
    >
      <button
        onClick={() => alert('Checkout（デモ）')}
        className="
          w-full py-3 rounded-xl bg-black text-white
          text-[0.85rem] tracking-[0.16em]
          hover:bg-black/90 transition
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]
        "
      >
        Apple Pay で購入（デモ）
      </button>
    </div>
  );

  return (
    <div
      className={`
        fixed inset-0
        z-[300]
        lg:hidden
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* ===== Backdrop ===== */}
      <div
        className={`
          absolute inset-0 
          bg-black/40 backdrop-blur-[2px]
          transition-opacity duration-300
          z-[300]
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* ===== Panel（最前面） ===== */}
      <aside
        ref={panelRef}
        className={`
          absolute bottom-0 left-0 w-full
          max-h-[88vh]
          bg-[rgba(250,250,252,0.94)]
          backdrop-blur-[22px]
          rounded-t-[28px]
          shadow-[0_-12px_40px_rgba(0,0,0,0.18)]
          transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}

          flex flex-col overflow-hidden
          z-[9999]   /* ★ Xボタンを絶対に最前面へ */
        `}
      >
        {/* ===== Header（X 完全死守） ===== */}
        <div
          className="
            flex items-center justify-between
            px-6 py-5
            border-b border-black/10
            bg-[rgba(250,250,252,0.85)]
            backdrop-blur-[14px]
            z-[99999]
          "
        >
          <h2 className="text-[1rem] tracking-[0.18em] text-[#0E0E11]/90">
            ショッピングカート
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-[#0E0E11]/60 hover:text-[#0E0E11] transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* ===== Items + Summary ===== */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[#0F0F11]/55 text-[0.9rem]">カートは空です。</p>

              <button
                onClick={() => setIsOpen(false)}
                className="
                  mt-6 w-full py-3 rounded-xl
                  bg-white/70 border border-black/10
                  text-[#0F0F11]/70 text-[0.85rem]
                  tracking-[0.16em]
                  hover:bg-white transition
                "
              >
                商品を見る
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 pb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-white shadow-sm"
                    />

                    <div className="flex-1">
                      <p className="text-[#0F0F11]/90 text-[0.95rem] font-medium leading-tight">
                        {item.name}
                      </p>

                      <p className="text-[#0F0F11]/45 text-[0.8rem] tracking-[0.12em] mt-1">
                        {safeYen(item.price)}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => dec(item.id)}
                          className="
                            w-8 h-8 rounded-lg
                            border border-black/10
                            text-[#0F0F11]/75
                            hover:bg-black/5 transition
                          "
                        >
                          −
                        </button>

                        <span className="text-[#0F0F11]/85 min-w-[28px] text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => inc(item.id)}
                          className="
                            w-8 h-8 rounded-lg
                            border border-black/10
                            text-[#0F0F11]/75
                            hover:bg-black/5 transition
                          "
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="
                            ml-auto text-[0.75rem]
                            text-[#0F0F11]/40 hover:text-[#0F0F11]/70
                            transition tracking-[0.12em]
                          "
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-2 pt-4 border-t border-black/10 space-y-4">
                <div className="flex items-center justify-between text-[#0F0F11]/70 text-[0.85rem]">
                  <span>小計</span>
                  <span>{safeYen(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-[#0F0F11]/60 text-[0.85rem]">
                  <span>送料</span>
                  <span>{shipping === 0 ? "無料" : safeYen(shipping)}</span>
                </div>

                <div className="flex items-center justify-between text-[#0F0F11]/90 text-[1rem] pt-2">
                  <span>合計</span>
                  <span>{safeYen(total)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </aside>
    </div>
  );
}
