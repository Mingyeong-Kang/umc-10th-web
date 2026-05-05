import type { Lp } from "../../types/lp.ts";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="h-48 w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-sm font-semibold text-white">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LpCard;
