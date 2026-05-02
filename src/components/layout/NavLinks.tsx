import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "../../contexts/I18nProvider";
import { NAV_LINKS } from "./headerData";

type NavLinksProps = {
  isActive: (to: string) => boolean;
};

const NavLinks = ({ isActive }: NavLinksProps) => {
  const { t } = useI18n();

  return (
    <nav
      className="hidden flex-1 items-center justify-center lg:flex"
      aria-label="Navegación principal"
    >
      {NAV_LINKS.map((link) => {
        const active = isActive(link.to);

        return (
          <Link
            key={link.name}
            to={link.to}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex flex-col items-center whitespace-nowrap px-3.5 py-1.5 font-sans text-[12.5px] uppercase tracking-[0.08em] no-underline transition-colors duration-300 ${
              active
                ? "font-semibold text-[#2e1a0e]"
                : "font-medium text-[#5a3820]/75 hover:text-[#2e1a0e]"
            }`}
          >
            {t(link.labelKey)}

            {active && (
              <motion.span
                className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] rounded-sm bg-[#b05c2e]"
                layoutId="nav-active-underline"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;