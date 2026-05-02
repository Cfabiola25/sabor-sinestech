import { Languages } from "lucide-react";
import { useI18n } from "../../contexts/I18nProvider";

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#2e1a0e]/15 bg-white/60 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2e1a0e] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#b05c2e]/40 hover:bg-[#fff7ed]"
      aria-label={`${t("language.label")}: ${language.toUpperCase()}`}
    >
      <Languages size={14} aria-hidden="true" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;