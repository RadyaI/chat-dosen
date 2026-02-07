import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chatdosen.radya.my.id'),
  title: {
    default: "Chat Dosen - Template Chat Dosen",
    template: "%s | Chat Dosen"
  },
  description: "Tools buat mahasiswa yang bingung nyusun kata-kata chat ke dosen. Ada template izin sakit, bimbingan skripsi, minta nilai, dll. Tingal copas!",
  keywords: ["chat dosen", "cara chat dosen", "template chat dosen", "etika chat dosen", "mahasiswa", "kuliah", "skripsi"],
  authors: [{ name: "Radya Iftikhar" }],
  openGraph: {
    title: "Chat Dosen - Template Chat",
    description: "Jangan sampe dimarahin dosen gara-gara salah ketik. Pake template ini, aman!",
    url: 'https://chatdosen.radya.my.id',
    siteName: 'Chat Dosen',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chat Dosen - Generator Chat Dosen",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Template Chat Dosen",
              "url": "https://chatdosen.radya.my.id",
              "description": "Template kata-kata sopan untuk chat dosen.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "author": {
                "@type": "Person",
                "name": "Radya Iftikhar"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              }
            }),
          }}
        />

        {children}

        <Toaster
          position="top-center"
          toastOptions={{
            className: 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold rounded-none bg-white text-black',
            duration: 2000,
            style: {
              background: '#fff',
              color: '#000',
            },
            success: {
              iconTheme: {
                primary: '#000',
                secondary: '#FFDE59',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
