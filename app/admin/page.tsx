"use client";

import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from "firebase/auth";
import { getAllTemplates, saveTemplate, deleteTemplate } from "@/lib/templates";
import { ChatTemplate } from "@/types";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  LayoutDashboard,
  LogOut,
  Plus,
  Save,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  FileText,
  Type
} from "lucide-react";

import { brutalSwal } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<ChatTemplate[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ChatTemplate>({
    slug: "",
    title: "",
    contentFormatted: "",
    contentParagraph: "",
    createdAt: 0
  });

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      
      if (currentUser.email !== "radyaiftikhar@gmail.com") {
        toast.error("Eits! Kamu bukan Admin", {
             icon: '🚫',
             style: {
               border: '2px solid black',
               padding: '16px',
               color: '#000',
             },
        });
        
        signOut(auth); 
        setTimeout(() => {
          router.push("/");
        }, 1000);
        return;
      }
      
      setUser(currentUser);
      
    } else {
      setUser(null);
    }
    setLoading(false);
  });

    const q = query(collection(db, "chatdosen"), orderBy("createdAt", "desc"));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatTemplate));
      setTemplates(data);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, [router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title) return toast.error("Judul & Slug wajib diisi!");

    await saveTemplate({ ...form, createdAt: form.createdAt || Date.now() });

    setForm({ slug: "", title: "", contentFormatted: "", contentParagraph: "", createdAt: 0 });
    setIsEditing(false);

    brutalSwal.fire({
      title: "BERHASIL!",
      text: "Template udah tersimpan.",
      icon: "success",
      confirmButtonText: "sip"
    });
  };

  const handleEdit = (t: ChatTemplate) => {
    setForm(t);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const result = await brutalSwal.fire({
      title: "MAU DIHAPUS?",
      text: "Data yang dihapus gak bisa balik lagi.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "YA, HAPUS AJA",
      cancelButtonText: "GAJADI",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      await deleteTemplate(id);
      toast.success("Template berhasil dihapus!");
    }
  };

  const cardStyle = "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none";
  const inputStyle = "w-full bg-white border-2 border-black p-3 text-black placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-medium";
  const buttonPrimary = "bg-[#FFDE59] text-black font-bold border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2 uppercase tracking-wide";
  const buttonDanger = "bg-[#FF5757] text-white font-bold border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all";
  const buttonIcon = "bg-white text-black border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all";

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f4f4f0] font-bold text-xl">LOADING...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f0] p-4">
        <div className={`p-10 flex flex-col items-center text-center max-w-md w-full ${cardStyle}`}>
          <LayoutDashboard size={48} className="mb-4 text-black" strokeWidth={2.5} />
          <h1 className="text-3xl text-black font-semibold mb-2 uppercase">Admin Access</h1>
          <p className="text-gray-600 mb-8 font-medium">Masuk untuk mengelola template chat.</p>
          <button onClick={handleLogin} className={buttonPrimary}>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-black font-sans pb-20">


      <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:block font-bold text-sm bg-gray-200 px-3 py-1 border-2 border-black">
              {user.email}
            </span>
            <button onClick={() => signOut(getAuth())} className="text-black hover:text-red-600 font-bold border-2 border-black px-3 py-1 bg-white hover:bg-red-50 transition-colors flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">


          <div className="lg:col-span-5">
            <div className={`${cardStyle} p-6 sticky top-28`}>
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  {isEditing ? <Edit3 size={24} /> : <Plus size={24} />}
                  {isEditing ? "Edit Template" : "New Template"}
                </h2>
                {isEditing && (
                  <button
                    onClick={() => { setIsEditing(false); setForm({ slug: "", title: "", contentFormatted: "", contentParagraph: "", createdAt: 0 }); }}
                    className="text-xs font-bold underline hover:text-red-600"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Judul Template</label>
                  <input
                    type="text"
                    placeholder="Misal: Izin Sakit"
                    className={inputStyle}
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">Slug / URL</label>
                  <input
                    type="text"
                    placeholder="izin-sakit"
                    className={inputStyle}
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-black uppercase flex items-center gap-1">
                        <FileText size={14} /> Formatted Content
                      </label>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Versi rapi dengan baris baru..."
                      className={`${inputStyle} text-sm font-mono`}
                      value={form.contentFormatted}
                      onChange={e => setForm({ ...form, contentFormatted: e.target.value })}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-black uppercase flex items-center gap-1">
                        <Type size={14} /> Paragraph Content
                      </label>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Versi satu paragraf panjang..."
                      className={`${inputStyle} text-sm font-mono`}
                      value={form.contentParagraph}
                      onChange={e => setForm({ ...form, contentParagraph: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className={`w-full justify-center ${buttonPrimary}`}>
                  <Save size={20} />
                  {isEditing ? "Update Data" : "Save Data"}
                </button>
              </form>
            </div>
          </div>


          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block">
                All Templates ({templates.length})
              </h2>
            </div>

            {templates.length === 0 ? (
              <div className="border-2 border-dashed border-black p-10 text-center text-gray-500 font-medium">
                Belum ada data. Silakan input di form sebelah kiri.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {templates.map((t) => (
                  <div key={t.id} className={`${cardStyle} p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:bg-yellow-50 transition-colors`}>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg leading-tight">{t.title}</h3>
                        <span className="bg-black text-white text-[10px] px-2 py-0.5 font-mono">
                          /{t.slug}
                        </span>
                      </div>


                      <div className="flex gap-2 mt-2">
                        <div className={`flex items-center gap-1 text-xs font-bold border border-black px-2 py-0.5 ${t.contentFormatted ? 'bg-[#CBF1F5]' : 'bg-gray-200 text-gray-500 line-through'}`}>
                          {t.contentFormatted ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          Formatted
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold border border-black px-2 py-0.5 ${t.contentParagraph ? 'bg-[#E3DFFD]' : 'bg-gray-200 text-gray-500 line-through'}`}>
                          {t.contentParagraph ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          Paragraph
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEdit(t)} className={buttonIcon} title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(t.id!)} className={buttonDanger} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}