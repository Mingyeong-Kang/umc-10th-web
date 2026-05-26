interface Props {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "데이터를 불러오지 못했습니다.",
  onRetry,
}: Props) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <p className="text-gray-300">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 rounded bg-[#b2dab1] text-black font-bold hover:bg-[#9bc99a]"
      >
        다시 시도
      </button>
    )}
  </div>
);
