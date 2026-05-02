import { Link } from "react-router-dom";
import logoSaborSinestech from "../../assets/logos/logoSaborSinestech.png";

const BrandLink = () => {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3 no-underline"
      aria-label="Ir al inicio de SaborSinestech"
    >
      <img
        src={logoSaborSinestech}
        alt="SaborSinestech"
        className="h-10 w-10 rounded-[12px] object-contain shadow-[0_4px_14px_rgba(46,26,14,0.16)]"
      />

      <div className="hidden leading-none sm:block">
        <span className="block font-serif text-[20px] font-bold text-[#2e1a0e]">
          SaborSinestech
        </span>
        <span className="mt-1 block font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[#b05c2e]">
          Sinestesia Gastronómica
        </span>
      </div>
    </Link>
  );
};

export default BrandLink;