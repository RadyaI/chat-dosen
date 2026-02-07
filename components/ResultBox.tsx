"use client";

import { useState, useEffect } from "react";
import { Copy, MessageCircle, RotateCcw, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { brutalSwal } from "@/lib/utils";

interface ResultBoxProps {
  initialFormatted: string;
  initialParagraph: string;
}

export default function ResultBox({ initialFormatted, initialParagraph }: ResultBoxProps) {
  const [activeTab, setActiveTab] = useState<"formatted" | "paragraph">("formatted");

  const [textFormatted, setTextFormatted] = useState(initialFormatted);
  const [textParagraph, setTextParagraph] = useState(initialParagraph);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTextFormatted(initialFormatted);
    setTextParagraph(initialParagraph);
  }, [initialFormatted, initialParagraph]);

  const currentText = activeTab === "formatted" ? textFormatted : textParagraph;
  const isAvailable = currentText !== undefined;

  const handleChange = (val: string) => {
    if (activeTab === "formatted") setTextFormatted(val);
    else setTextParagraph(val);
  };

  const handleReset = () => {
    brutalSwal.fire({
      title: "RESET TEKS?",
      text: "Tulisanmu bakal balik ke template awal.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "RESET",
      cancelButtonText: "BATAL",
    }).then((result) => {
      if (result.isConfirmed) {
        if (activeTab === "formatted") setTextFormatted(initialFormatted);
        else setTextParagraph(initialParagraph);
        toast("Sudah di-reset.", { icon: '🔄' });
      }
    });
  };

  const handleCopy = () => {
    if (!currentText) return;
    navigator.clipboard.writeText(currentText);
    toast.success("Teks berhasil dicopy!", {
      icon: '📋',
      style: {
        background: '#CBF1F5',
      }
    });
  };

  const handleWA = () => {
    if (!currentText) return;
    const url = `https://wa.me/?text=${encodeURIComponent(currentText)}`;
    window.open(url, "_blank");
  };

  const tabActive = "bg-[#FFDE59] text-black border-b-0 translate-y-[2px] z-10";
  const tabInactive = "bg-gray-100 text-gray-500 hover:bg-gray-200 border-b-4 border-black";
  const btnBase = "flex-1 flex items-center justify-center gap-2 font-black border-2 border-black py-3 uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]";

  return (
    <div className="relative max-w-3xl mx-auto w-full">


      <div className="flex gap-2 pl-4 items-end">
        <button
          onClick={() => setActiveTab("formatted")}
          className={`px-6 py-3 border-2 border-black rounded-t-lg font-bold text-sm transition-all relative ${activeTab === "formatted" ? tabActive : tabInactive
            }`}
        >
          Format Rapi
        </button>
        <button
          onClick={() => setActiveTab("paragraph")}
          className={`px-6 py-3 border-2 border-black rounded-t-lg font-bold text-sm transition-all relative ${activeTab === "paragraph" ? tabActive : tabInactive
            }`}
        >
          Satu Paragraf
        </button>


        {isAvailable && (
          <button
            onClick={handleReset}
            className="ml-auto mr-2 mb-2 text-xs font-bold underline text-gray-500 hover:text-red-500 flex items-center gap-1"
            title="Reset ke awal"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>


      <div className="bg-white border-4 border-black p-0 min-h-[400px] flex flex-col relative z-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">


        <div className="flex-1 p-0 relative">
          {isAvailable ? (
            <textarea
              value={currentText}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Ketik pesan di sini..."
              className="w-full h-full min-h-[350px] p-6 bg-white resize-none text-black text-lg font-mono focus:outline-none focus:bg-yellow-50/30 transition-colors leading-relaxed selection:bg-[#FFDE59]"
            />
          ) : (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <X size={48} className="mb-2" />
              <p className="font-bold uppercase">Versi ini kosong bro.</p>
            </div>
          )}
        </div>


        <div className="p-4 bg-white border-t-4 border-black flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopy}
            disabled={!currentText}
            className={`${btnBase} bg-white text-black hover:bg-gray-100`}
          >
            {copied ? <><Check size={20} /> Copied!</> : <><Copy size={20} /> Copy Teks</>}
          </button>

          <button
            onClick={handleWA}
            disabled={!currentText}
            className={`${btnBase} bg-[#25D366] text-white hover:bg-[#128C7E]`}
          >
            <MessageCircle size={20} /> Kirim WA
          </button>
        </div>
      </div>

    </div>
  );
}