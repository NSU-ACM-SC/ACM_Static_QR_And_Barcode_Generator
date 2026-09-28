import Generator from "@/components/Generator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-acm-paper text-acm-ink selection:bg-acm-purple selection:text-white">
      {/* Header */}
      <header className="border-b-4 border-acm-ink bg-acm-blue p-6 shadow-neo-lg z-50 sticky top-0">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={(process.env.NODE_ENV === "production" ? "/ACM_Static_QR_And_Barcode_Generator" : "") + "/acm-logo.webp"} alt="NSU ACM Logo" className="w-12 h-12 bg-white rounded-full border-2 border-acm-ink" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white" style={{ textShadow: '2px 2px 0 #000' }}>
                NSU ACM SC
              </h1>
              <p className="text-sm font-bold bg-acm-orange text-black px-2 inline-block border-2 border-acm-ink shadow-neo-sm transform -rotate-2">
                Tools
              </p>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-white px-4 py-2 border-4 border-acm-ink shadow-neo-sm text-center">
            QR & BARCODE GEN
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-4xl">
          <Generator />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
