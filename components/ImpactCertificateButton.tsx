"use client";

import { useState } from "react";
import { Award, ArrowRight } from "lucide-react";
import ImpactCertificateModal from "@/components/ImpactCertificateModal";

interface ImpactCertificateButtonProps {
  className?: string;
  label?: string;
  userName?: string;
  medicinesCount?: number;
}

export default function ImpactCertificateButton({
  className,
  label = "View Eco-Warrior Certificate",
  userName = "Rahul Sharma",
  medicinesCount = 6,
}: ImpactCertificateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300/80 px-3 py-1 text-[11px] font-bold transition-all cursor-pointer"
        }
      >
        <Award size={13} className="text-emerald-700" />
        <span>{label}</span>
        <ArrowRight size={11} />
      </button>

      {isOpen && (
        <ImpactCertificateModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userName={userName}
          medicinesCount={medicinesCount}
        />
      )}
    </>
  );
}
