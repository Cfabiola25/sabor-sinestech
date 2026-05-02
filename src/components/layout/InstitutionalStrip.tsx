import React from "react";
import { INSTITUTIONS } from "./headerData";
import logoColombiaMexico from "../../assets/logos/logoColombiaMexico.png";

const InstitutionalStrip = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[52px] border-b border-[#b05c2e]/10 bg-[#faf6ef]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between gap-4 px-4 md:px-8">
        
        {/* IZQUIERDA */}
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={logoColombiaMexico}
            alt="Colombia y México"
            className="h-10 w-auto shrink-0 object-contain drop-shadow-[0_2px_4px_rgba(46,26,14,0.2)]"
          />

          <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2e1a0e] sm:inline">
            COIL MX · COL
          </span>

          <span className="hidden h-[4px] w-[4px] rounded-full bg-[#b05c2e]/40 sm:block" />
        </div>

        {/* DERECHA */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {INSTITUTIONS.map((inst, index) => (
            <React.Fragment key={inst.id}>
              
              {index > 0 && (
                <span
                  className="hidden h-7 w-px bg-[#b05c2e]/20 sm:block"
                  aria-hidden="true"
                />
              )}

              <div
                className="flex h-11 min-w-[100px] items-center justify-center gap-3 rounded-[16px] border border-[#b05c2e]/20 bg-white/85 px-4 shadow-[0_6px_20px_rgba(46,26,14,0.08)] backdrop-blur-sm transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[0_10px_28px_rgba(46,26,14,0.12)] sm:min-w-[120px] sm:px-5"
                title={inst.full}
                aria-label={inst.full}
              >
                {inst.logos.map((logo, logoIndex) => (
                  <img
                    key={`${inst.id}-${logoIndex}`}
                    src={logo}
                    alt=""
                    className="h-[30px] max-w-[90px] object-contain"
                    aria-hidden="true"
                  />
                ))}
              </div>

            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalStrip;