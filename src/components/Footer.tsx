import { footerData } from "@/lib/data";
import { Youtube, Facebook, Linkedin, Github, MapPin } from "lucide-react";

export default function Footer() {
  const { brand, quickLinks, socialLinks, address, copyright, credits } = footerData;

  return (
    <footer className="mt-16 bg-acm-ink text-acm-paper border-t-8 border-acm-blue">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <img src={(process.env.NODE_ENV === "production" ? "/ACM_Static_QR_And_Barcode_Generator" : "") + "/acm-logo.webp"} alt="NSU ACM Logo" className="w-14 h-14 bg-white rounded-full border-2 border-acm-paper p-1" />
               <div>
                  <h3 className="text-2xl font-black uppercase text-acm-orange tracking-wider">{brand.title}</h3>
                  <p className="text-lg font-bold text-acm-blue">{brand.subtitle}</p>
               </div>
            </div>
            <p className="text-sm font-medium mt-4 border-l-4 border-acm-purple pl-4">
              {brand.description}
            </p>
          </div>

          {/* Address & Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-black uppercase border-b-2 border-acm-paper pb-2 inline-block">Contact</h4>
            <div className="flex items-start gap-3 mt-4 text-sm font-medium">
               <MapPin className="text-acm-orange shrink-0 mt-1" size={20} />
               <div>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <p>{address.line3}</p>
                  <a href={address.mapUrl} target="_blank" rel="noreferrer" className="text-acm-blue hover:text-acm-purple font-bold mt-2 inline-block underline underline-offset-4 decoration-2">
                     View on Maps
                  </a>
               </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-black uppercase border-b-2 border-acm-paper pb-2 inline-block">Connect</h4>
            <div className="flex gap-4 mt-4">
              <a href={socialLinks.YouTube} target="_blank" rel="noreferrer" className="bg-acm-paper text-acm-ink p-3 border-2 border-transparent hover:border-acm-orange hover:bg-acm-orange hover:text-white hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(244,123,43,0.5)]">
                <Youtube size={24} />
              </a>
              <a href={socialLinks.Facebook} target="_blank" rel="noreferrer" className="bg-acm-paper text-acm-ink p-3 border-2 border-transparent hover:border-acm-blue hover:bg-acm-blue hover:text-white hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(51,146,204,0.5)]">
                <Facebook size={24} />
              </a>
              <a href={socialLinks.LinkedIn} target="_blank" rel="noreferrer" className="bg-acm-paper text-acm-ink p-3 border-2 border-transparent hover:border-acm-blue hover:bg-acm-blue hover:text-white hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(51,146,204,0.5)]">
                <Linkedin size={24} />
              </a>
              <a href={socialLinks.GitHub} target="_blank" rel="noreferrer" className="bg-acm-paper text-acm-ink p-3 border-2 border-transparent hover:border-white hover:bg-black hover:text-white hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
                <Github size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400">
          <p>{copyright}</p>
          <p className="bg-acm-purple text-white px-3 py-1">{credits}</p>
        </div>
      </div>
    </footer>
  );
}
