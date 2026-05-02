import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../../contexts/I18nProvider";
import BrandLink from "./BrandLink";
import InstitutionalStrip from "./InstitutionalStrip";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 80);
    }

    if (!open && wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <InstitutionalStrip />

      <header
        className={`fixed left-0 right-0 top-[52px] z-50 border-b border-[#b05c2e]/10 bg-[#faf6ef]/90 backdrop-blur-2xl transition-all duration-300 ${
          scrolled ? "bg-[#faf6ef]/95 shadow-[0_4px_32px_rgba(46,26,14,0.08)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-8 px-4 md:px-8">
          <BrandLink />

          <NavLinks isActive={isActive} />

          <Link
            to="/platillos"
            className="ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-[#2e1a0e] px-5 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em] text-[#f5e8d8] no-underline transition-all hover:-translate-y-0.5 hover:bg-[#b05c2e] hover:shadow-[0_6px_20px_rgba(176,92,46,0.28)] lg:inline-flex"
          >
            {t("header.explore")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="ml-auto flex items-center justify-center rounded-[10px] border border-[#2e1a0e]/15 bg-transparent p-2 text-[#2e1a0e] transition hover:border-[#b05c2e] hover:bg-[#b05c2e]/10 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {open && <MobileMenu isActive={isActive} firstLinkRef={firstMobileLinkRef} />}
        </AnimatePresence>
      </header>

      <div className="h-[98px]" aria-hidden="true" />
    </>
  );
};

export default Header;