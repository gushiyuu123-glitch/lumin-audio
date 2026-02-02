// src/components/CartPanel.jsx
import { X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

/* ============================================================
   ★ 安全な通貨フォーマット（NaN や undefined → 0）
============================================================ */
function safeYen(n) {
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(v);
}

export default function CartPanel() {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    removeItem,
    inc,
    dec,
    subtotal,
    shipping,
    total,
    clear,
  } = useCart();

  const onCheckout = () => {
    alert("Checkout（デモ）: 決済導線はこの後つなぐ。");
  };

  return (
    <div
      className={`
        fixed inset-0 z-[200]
        transition-all duration-500
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/25 backdrop-blur-sm
          transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* panel */}
      <aside
        className={`
          absolute top-0 right-0 h-full
          w-[420px] max-w-[88vw]
          bg-white
          shadow-[0_0_42px_rgba(0,0,0,0.18)]
          transition-transform duration-500
          ${isOpen ? "translate-x-0" : "translate-x-full"}

          flex flex-col
          overflow-y-auto overflow-x-hidden
          will-change-transform
        `}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div>
            <h2 className="text-[1.05rem] tracking-[0.12em] text-black">
              ショッピングカート
            </h2>
            <p className="text-black/45 text-[0.75rem] tracking-[0.18em] mt-1">
              送料無料 / 返品無料（デモ）
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-black/70 hover:text-black transition"
            aria-label="close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* body */}
        <div className="p-6 flex-1">
          {cartItems.length === 0 ? (
            <div className="py-10">
              <p className="text-black/45 text-sm">カートは空です。</p>
              <button
                onClick={() => setIsOpen(false)}
                className="
                  mt-6 w-full py-3 rounded-xl
                  border border-black/10
                  bg-white/80
                  text-black/80 text-[0.85rem] tracking-[0.16em]
                  hover:bg-white transition
                "
              >
                商品を見る
              </button>
            </div>
          ) : (
            <>
              {/* items */}
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 overflow-hidden"
                  >
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shrink-0 bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-black font-medium truncate">
                        {item.name}
                      </p>

                      <p className="text-black/55 text-[0.82rem] tracking-[0.08em]">
                        {safeYen(item.price)}
                      </p>

                      {/* qty */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => dec(item.id)}
                          className="
                            w-9 h-9 rounded-lg
                            border border-black/10
                            text-black/80
                            hover:border-black/20 hover:bg-black/5 transition
                          "
                          aria-label="decrease"
                        >
                          −
                        </button>

                        <div className="min-w-[34px] text-center text-black/80 tracking-wider">
                          {item.qty}
                        </div>

                        <button
                          onClick={() => inc(item.id)}
                          className="
                            w-9 h-9 rounded-lg
                            border border-black/10
                            text-black/80
                            hover:border-black/20 hover:bg-black/5 transition
                          "
                          aria-label="increase"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-black/35 hover:text-black/65 transition text-[0.78rem] tracking-[0.12em] whitespace-nowrap"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* summary */}
              <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
                <div className="flex items-center justify-between text-black/70 text-[0.85rem] tracking-[0.10em]">
                  <span>小計</span>
                  <span>{safeYen(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-black/55 text-[0.85rem] tracking-[0.10em]">
                  <span>送料</span>
                  <span>{shipping === 0 ? "無料" : safeYen(shipping)}</span>
                </div>

                <div className="flex items-center justify-between pt-3 text-black text-[0.95rem] tracking-[0.12em]">
                  <span>合計</span>
                  <span>{safeYen(total)}</span>
                </div>

                {/* checkout */}
                <button
                  onClick={onCheckout}
                  className="
                    mt-4 w-full py-3 rounded-xl
                    bg-black text-white
                    text-[0.85rem] tracking-[0.18em]
                    hover:opacity-90 transition
                    shadow-[0_14px_40px_rgba(0,0,0,0.18)]
                  "
                >
                  Apple Pay で購入（デモ）
                </button>

                <button
                  onClick={clear}
                  className="
                    w-full py-3 rounded-xl
                    border border-black/10
                    text-black/70 text-[0.82rem] tracking-[0.16em]
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
