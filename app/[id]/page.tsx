import { Metadata } from "next";
import { getTemplateBySlug } from "@/lib/templates";
import DetailClient from "./DetailClient"; 

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const template = await getTemplateBySlug(resolvedParams.id);

  if (!template) return { title: "Template Tidak Ditemukan" };

  return {
    title: template.title,
    description: `Template chat dosen: ${template.title}.`,
    openGraph: {
      title: `${template.title} | Chat Dosen`,
      description: "Klik buat copy template chat-nya langsung.",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <DetailClient id={resolvedParams.id} />;
}