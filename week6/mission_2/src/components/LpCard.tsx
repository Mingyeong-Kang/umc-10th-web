import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface Props {
  lp: Lp;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

export const LpCard = ({ lp }: Props) => {
  return (
    <Link
      to={`/lp/${lp.id}`}
      className="group relative block aspect-square overflow-hidden rounded bg-gray-900"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        loading="lazy"
        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-200" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white">
        <h3 className="font-bold text-base line-clamp-2">{lp.title}</h3>
        <div className="mt-1 flex items-center justify-between text-xs text-gray-300">
          <span>{formatDate(lp.createdAt)}</span>
          <span>♥ {lp.likes?.length ?? 0}</span>
        </div>
      </div>
    </Link>
  );
};
