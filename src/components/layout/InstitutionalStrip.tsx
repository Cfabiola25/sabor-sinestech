import React from "react";
import { INSTITUTIONS } from "./headerData";
import logoColombiaMexico from "../../assets/logos/logoColombiaMexico.png";

const InstitutionalStrip = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[74px] border-b border-[#b05c2e]/10 bg-[#faf6ef]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between gap-6 px-5 md:px-8">
        
        {/* IZQUIERDA */}
        <div className="flex min-w-0 items-center gap-5">
          <img
            src={logoColombiaMexico}
            alt="Colombia y México"
            className="h-14 w-auto shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(46,26,14,0.18)]"
          />

          <span className="hidden font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2e1a0e] sm:inline">
            COIL MX · COL
          </span>

          <span
            className="hidden h-[5px] w-[5px] rounded-full bg-[#b05c2e]/40 sm:block"
            aria-hidden="true"
          />
        </div>

        {/* DERECHA */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          {INSTITUTIONS.map((inst, index) => (
            <React.Fragment key={inst.id}>
              
              {index > 0 && (
                <span
                  className="hidden h-9 w-px bg-[#b05c2e]/20 sm:block"
                  aria-hidden="true"
                />
              )}

              <div
                className="flex h-[58px] min-w-[150px] items-center justify-center gap-4 rounded-[20px] border border-[#b05c2e]/20 bg-white/90 px-6 shadow-[0_8px_24px_rgba(46,26,14,0.08)] backdrop-blur-sm transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[0_12px_32px_rgba(46,26,14,0.12)]"
                title={inst.full}
                aria-label={inst.full}
              >
                {inst.logos.map((logo, logoIndex) => (
                  <img
                    key={`${inst.id}-${logoIndex}`}
                    src={logo}
                    alt=""
                    className="h-[42px] max-w-[120px] object-contain"
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