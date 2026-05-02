import type { RefObject } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "../../contexts/I18nProvider";
import { INSTITUTIONS, NAV_LINKS } from "./headerData";

type MobileMenuProps = {
  isActive: (to: string) => boolean;
  firstLinkRef: RefObject<HTMLAnchorElement | null>;
};

const MobileMenu = ({ isActive, firstLinkRef }: MobileMenuProps) => {
  const { t } = useI18n();

  return (
    <motion.nav
      id="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden border-t border-[#b05c2e]/10 bg-[#faf6ef] lg:hidden"
      aria-label="Menú móvil"
    >
      <div className="flex flex-col px-8 py-5">
        {NAV_LINKS.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              to={link.to}
              aria-current={isActive(link.to) ? "page" : undefined}
              className={`block border-b border-[#b05c2e]/10 py-3 font-sans text-[13px] uppercase tracking-[0.08em] no-underline transition-all hover:pl-2 hover:text-[#2e1a0e] ${
                isActive(link.to)
                  ? "pl-2 font-semibold text-[#2e1a0e]"
                  : "font-normal text-[#5a3820]"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: NAV_LINKS.length * 0.045 + 0.05 }}
        >
          <Link
            to="/platillos"
            className="mt-5 block rounded-full bg-[#2e1a0e] px-6 py-3 text-center font-sans text-[13px] font-medium tracking-[0.04em] text-[#f5e8d8] no-underline transition hover:bg-[#b05c2e]"
          >
            {t("header.exploreDishes")}
          </Link>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#b05c2e]/10 pt-5">
          {INSTITUTIONS.map((inst) => (
            <div
              key={inst.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[#b05c2e]/15 bg-white/80 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                {inst.logos.map((logo, index) => (
                  <img
                    key={`${inst.id}-${index}`}
                    src={logo}
                    alt=""
                    className="h-7 max-w-[72px] object-contain"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <span className="text-right font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a3820]">
                {inst.country}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileMenu;