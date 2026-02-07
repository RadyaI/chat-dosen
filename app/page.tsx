"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTemplates } from "@/lib/templates";
import { ChatTemplate } from "@/types";
import { Search, ArrowRight, MessageSquare, Sparkles, Terminal } from "lucide-react";

const CARD_COLORS = [
    "bg-[#FFDE59]",
    "bg-[#FF914D]",
    "bg-[#FF5757]",
    "bg-[#CBF1F5]",
    "bg-[#E3DFFD]",
    "bg-[#7ED957]",
];

export default function Dashboard() {
    const [templates, setTemplates] = useState<ChatTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTemplates();
            setTemplates(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredTemplates = templates.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.slug.toLowerCase().includes(search.toLowerCase())
    );

    const brutalBox = "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
    const brutalBoxHover = "hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all";
    const badgeStyle = "text-xs font-black border-2 border-black px-2 py-1 uppercase tracking-wider bg-white text-black";

    return (
        <main className="min-h-screen bg-[#f4f4f0] text-black font-sans selection:bg-black selection:text-[#FFDE59] relative overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ 
                backgroundImage: "radial-gradient(#000 2px, transparent 2px)", 
                backgroundSize: "24px 24px" 
            }} />

            <div className="fixed top-20 left-[-40px] w-32 h-32 bg-[#FFDE59] border-4 border-black rounded-full z-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse" />
            <div className="fixed bottom-40 right-[-20px] w-40 h-40 bg-[#CBF1F5] border-4 border-black rotate-12 z-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
            <div className="fixed top-1/2 right-10 w-12 h-12 bg-[#FF5757] border-4 border-black rotate-45 z-0" />
            <div className="fixed bottom-10 left-10 w-20 h-20 border-4 border-dashed border-black rounded-full z-0 opacity-50" />

            <div className="relative z-10">
                <header className="pt-20 pb-12 px-6">
                    <div className="max-w-4xl mx-auto text-center">

                        <div className="inline-block mb-6 rotate-[-2deg]">
                            <span className={`bg-[#FF5757] text-white px-4 py-2 text-sm font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase`}>
                                TEMPLATE
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-6 tracking-tighter">
                            Chat <span className="bg-[#FFDE59] px-2 border-4 border-black inline-block -rotate-1">Dosen</span>
                        </h1>

                        <div className="relative max-w-2xl mx-auto group">
                            <div className={`absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-none ${search ? 'translate-x-2 translate-y-2' : ''} transition-all`} />
                            <div className="relative flex items-center bg-white border-4 border-black">
                                <div className="p-4 border-r-4 border-black bg-[#E3DFFD]">
                                    <Search size={32} strokeWidth={3} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari: Skripsi, Izin, Nilai..."
                                    className="w-full p-4 text-xl md:text-2xl font-bold uppercase placeholder:text-gray-400 focus:outline-none bg-transparent"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                    </div>
                </header>

                <section className="max-w-7xl mx-auto px-6 pb-24">

                    {loading ? (
                        <div className="text-center text-2xl font-black py-20 animate-pulse">
                            LOADING ASSETS...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredTemplates.length > 0 ? (
                                filteredTemplates.map((t, idx) => {
                                    const cardColor = CARD_COLORS[idx % CARD_COLORS.length];

                                    return (
                                        <Link href={`/${t.slug}`} key={t.id} className="group block h-full">
                                            <article className={`h-full bg-white ${brutalBox} ${brutalBoxHover} flex flex-col justify-between p-0 overflow-hidden`}>

                                                <div className={`${cardColor} border-b-4 border-black p-4 flex justify-between items-start`}>
                                                    <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        <MessageSquare size={24} strokeWidth={2.5} />
                                                    </div>
                                                    <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1">
                                                        /{t.slug}
                                                    </span>
                                                </div>

                                                <div className="p-6 flex-1 bg-white">
                                                    <h3 className="text-2xl font-black uppercase leading-tight mb-4 group-hover:underline decoration-4 decoration-[#FFDE59]">
                                                        {t.title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-2 mt-auto">
                                                        {t.contentFormatted && (
                                                            <span className={badgeStyle}>
                                                                <span className="mr-1">📄</span> Formatted
                                                            </span>
                                                        )}
                                                        {t.contentParagraph && (
                                                            <span className={badgeStyle}>
                                                                <span className="mr-1">¶</span> Paragraph
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="bg-black text-white p-3 flex justify-between items-center group-hover:bg-[#FFDE59] group-hover:text-black transition-colors border-t-4 border-black">
                                                    <span className="font-bold uppercase tracking-widest text-sm pl-2">
                                                        Pakai Template
                                                    </span>
                                                    <ArrowRight size={20} strokeWidth={3} />
                                                </div>

                                            </article>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-10 text-center">
                                    <div className={`inline-block bg-white p-8 ${brutalBox} max-w-md mx-auto`}>
                                        <Terminal size={48} className="mx-auto mb-4" strokeWidth={2} />
                                        <h3 className="text-2xl font-black mb-2">???! GAK KETEMU.</h3>
                                        <p className="font-medium mb-6">Template "{search}" belum dibuat.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <footer className="bg-black text-white py-8 border-t-8 border-[#FFDE59]">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} className="text-[#FFDE59]" />
                            <span className="font-bold uppercase tracking-widest">ChatDosen &copy; 2026</span>
                        </div>
                        <p className="font-mono text-sm text-gray-400">
                            <Link href="/admin">
                                Admin.
                            </Link>
                        </p>
                    </div>
                </footer>
            </div>

        </main>
    );
}