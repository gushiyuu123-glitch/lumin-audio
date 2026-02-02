// src/components/CartPanelSP.jsx
import { X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef } from "react";

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
    clear = () => {},
  } = useCart();

  const panelRef = useRef(null);

  /* ===========================
     SP: open時はスクロールロック
  ============================ */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const onCheckout = () => {
    alert("Checkout（デモ）: 実際の決済導線はここに接続");
  };

  return (
    <div
      className={`
        fixed inset-0 
        z-[500]              /* ← Header より絶対に上 */
        lg:hidden
        transition-all duration-300
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* ===== Backdrop（下） ===== */}
      <div
        className={`
          absolute inset-0
          bg-black/40 backdrop-blur-[3px]
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
          z-[500]            /* Panel の直下に配置 */
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* ===== Panel（最前面） ===== */}
      <aside
        ref={panelRef}
        className={`
          absolute bottom-0 left-0 w-full
          max-h-[88vh]
          bg-[rgba(250,250,252,0.95)]
          backdrop-blur-[22px]
          rounded-t-3xl
          shadow-[0_-12px_40px_rgba(0,0,0,0.18)]
          transition-transform duration-350
          ${isOpen ? "translate-y-0" : "translate-y-full"}
          flex flex-col
          z-[999]            /* ← 背景より確実に前面 */
        `}
      >
        {/* ===== Header ===== */}
        <div
          className="
            flex items-center justify-between
            px-6 py-5
            border-b border-black/10
            bg-[rgba(250,250,252,0.88)]
            backdrop-blur-[12px]
            sticky top-0
            z-[1000]        /* ← X を絶対に埋もれさせない */
          "
        >
          <h2 className="text-[1rem] tracking-[0.18em] text-[#0F0F11]/85">
            カート
          </h2>

          {/* 🔥 Xボタン — 安全なタップ領域 */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              relative p-3 -m-3
              text-[#0E0F11]/60 hover:text-[#0E0F11]
              active:scale-[0.92]
              transition
            "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <X size={24} />
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
                  text-[#0F0F11]/70 text-[0.85rem] tracking-[0.16em]
                  hover:bg-white transition
                "
              >
                商品を見る
              </button>
            </div>
          ) : (
            <>
              {/* ===== Items ===== */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-white shadow-sm"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-[#0F0F11]/90 text-[0.95rem] font-medium leading-tight break-words">
                        {item.name}
                      </p>

                      <p className="text-[#0F0F11]/50 text-[0.8rem] tracking-[0.12em] mt-1">
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

              {/* ===== Summary ===== */}
              <div className="mt-8 pt-6 border-t border-black/10 space-y-4">
                <div className="flex items-center justify-between text-[#0F0F11]/70 text-[0.85rem]">
                  <span>小計</span>
                  <span>{safeYen(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-[#0F0F11]/60 text-[0.85rem]">
                  <span>送料</span>
                  <span>{shipping === 0 ? "無料" : safeYen(shipping)}</span>
                </div>

                <div className="flex items-center justify-between text-[#0F0F11]/85 text-[1rem] pt-2">
                  <span>合計</span>
                  <span>{safeYen(total)}</span>
                </div>

                <button
                  onClick={onCheckout}
                  className="
                    mt-4 w-full py-3 rounded-xl
                    bg-black text-white
                    text-[0.85rem] tracking-[0.18em]
                    hover:opacity-90 transition
                    shadow-[0_10px_30px_rgba(0,0,0,0.16)]
                  "
                >
                  Apple Pay で購入（デモ）
                </button>

                <button
                  onClick={clear}
                  className="
                    w-full py-3 rounded-xl
                    border border-black/10
                    text-[#0F0F11]/70 text-[0.8rem]
                    hover:bg-black/5 transition
                  "
                >
                  カートを空にする
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
