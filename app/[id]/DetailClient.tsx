"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTemplateBySlug } from "@/lib/templates";
import { ChatTemplate } from "@/types";
import ResultBox from "@/components/ResultBox";
import { ArrowLeft, Edit3, Zap } from "lucide-react";

export default function DetailClient({ id }: { id: string }) {
  const router = useRouter();

  const [template, setTemplate] = useState<ChatTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTemplateBySlug(id); 
      if (!data) {
        router.push("/");
        return;
      }
      setTemplate(data);
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  if (loading) return (
    <div className="min-h-screen bg-[#E0E7FF] flex items-center justify-center font-black text-2xl uppercase tracking-widest text-indigo-600">
      Loading Assets...
    </div>
  );

  if (!template) return null;

  return (
    <main className="min-h-screen relative overflow-x-hidden text-black font-sans selection:bg-[#FF00FF] selection:text-white">

      {}
      <div className="fixed inset-0 bg-[#FFFDF5] z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {}
      <div className="fixed top-20 right-[-50px] w-40 h-40 bg-[#FF6B6B] border-4 border-black rounded-full z-0 animate-bounce delay-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
      <div className="fixed bottom-20 left-[-20px] w-32 h-32 bg-[#4ECDC4] border-4 border-black rotate-12 z-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
      <div className="fixed top-1/2 left-10 w-8 h-8 bg-black z-0 rounded-none rotate-45" />
      <div className="fixed top-1/3 right-20 w-12 h-12 border-4 border-black bg-[#FFE66D] z-0 rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

        <nav className="flex justify-between items-center">
          <Link href="/" className="group relative">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative bg-white border-2 border-black px-4 py-2 font-bold uppercase flex items-center gap-2 hover:-translate-y-1 transition-transform">
              <ArrowLeft size={20} strokeWidth={3} />
              Back
            </div>
          </Link>
        </nav>

        <header className="mb-10 text-center relative">
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mix-blend-hard-light relative z-10">
            {template.title}
          </h1>
          <div className="h-4 bg-[#4ECDC4] w-1/2 mx-auto -mt-4 border-2 border-black rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

          <p className="mt-6 font-bold bg-black text-white inline-block px-4 py-1 rotate-[-1deg]">
            👇 ISI SENDIRI DATA KAMU DI BAWAH 👇
          </p>
        </header>

        <div className="relative">
          <div className="absolute -top-6 -right-4 z-30 rotate-12 bg-[#FF6B6B] text-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <Zap size={24} fill="yellow" className="text-yellow-300" />
          </div>

          <ResultBox
            initialFormatted={template.contentFormatted}
            initialParagraph={template.contentParagraph}
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block border-2 border-dashed border-black p-4 bg-white/80 backdrop-blur-sm rotate-1">
            <p className="font-mono text-xs font-bold uppercase text-gray-500">
              Peringatan: Mohon baca ulang sebelum mengirim chat.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}