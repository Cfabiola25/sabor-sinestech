import { Facebook, Send, Share2 } from "lucide-react";
import { useMemo } from "react";
import { useI18n } from "../../contexts/I18nProvider";
import { createShareLinks, getCurrentShareUrl } from "../../utils/share";

type ShareButtonsProps = {
  title: string;
  text: string;
  path?: string;
};

const ShareButtons = ({ title, text, path }: ShareButtonsProps) => {
  const { t } = useI18n();

  const shareUrl = getCurrentShareUrl(path);
  const links = useMemo(() => createShareLinks(shareUrl, text), [shareUrl, text]);

  const canUseNativeShare =
    typeof navigator !== "undefined" && "share" in navigator;

  const handleNativeShare = async () => {
    if (!canUseNativeShare) return;

    await navigator.share({
      title,
      text,
      url: shareUrl,
    });
  };

  return (
    <section
      className="rounded-2xl border border-[#b05c2e]/15 bg-white/75 p-5 shadow-[0_16px_40px_rgba(46,26,14,0.08)] backdrop-blur"
      aria-labelledby="share-title"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3
          id="share-title"
          className="font-serif text-xl font-black text-[#4b2a21]"
        >
          {t("share.title")}
        </h3>

        {canUseNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-full bg-[#2e1a0e] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#f5e8d8] transition hover:bg-[#b05c2e]"
          >
            <Share2 size={14} aria-hidden="true" />
            {t("share.native")}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          className="rounded-full border border-[#b05c2e]/20 px-4 py-2 text-xs font-bold text-[#5a3820] transition hover:bg-[#f5e8d8]"
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("share.whatsapp")}
        </a>

        <a
          className="inline-flex items-center gap-1.5 rounded-full border border-[#b05c2e]/20 px-4 py-2 text-xs font-bold text-[#5a3820] transition hover:bg-[#f5e8d8]"
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={13} aria-hidden="true" />
          {t("share.facebook")}
        </a>

        <a
          className="inline-flex items-center gap-1.5 rounded-full border border-[#b05c2e]/20 px-4 py-2 text-xs font-bold text-[#5a3820] transition hover:bg-[#f5e8d8]"
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send size={13} aria-hidden="true" />
          {t("share.x")}
        </a>
      </div>
    </section>
  );
};

export default ShareButtons;