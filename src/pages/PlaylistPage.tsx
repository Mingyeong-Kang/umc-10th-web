import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import CartConfirmModal from "../components/CartConfirmModal";
import { useCartStore } from "../stores/useCartStore";

export default function PlaylistPage() {
  const amount = useCartStore((state) => state.amount);

  return (
    <>
      <CartConfirmModal />

      <div className="min-h-full p-4 md:p-8">
        {/* 페이지 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              🎵 플레이리스트 장바구니
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              마음에 드는 트랙을 담아보세요
            </p>
          </div>

          {amount > 0 && (
            <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-600">
              {amount}곡
            </span>
          )}
        </div>

        {/* 테이블 헤더 (md 이상에서만 표시) */}
        <div className="mb-3 hidden grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-4 text-xs font-medium uppercase tracking-wide text-gray-400 md:grid">
          <span>트랙 정보</span>
          <span className="w-32 text-center">수량</span>
          <span className="w-20 text-right">소계</span>
          <span className="w-8" />
        </div>

        {/* 메인 레이아웃: 리스트 + 사이드바 요약 */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* 장바구니 리스트 */}
          <div className="flex-1">
            <CartList />
          </div>

          {/* 요약 패널 (리스트에 아이템 있을 때만 sticky) */}
          <div className="lg:w-72 lg:shrink-0 lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
}
