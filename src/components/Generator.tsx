"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { QrCode, Barcode as BarcodeIcon, Download, RefreshCw } from "lucide-react";

export default function Generator() {
  const [activeTab, setActiveTab] = useState<"qr" | "barcode">("qr");
  const [inputValue, setInputValue] = useState("");
  const [generatedValue, setGeneratedValue] = useState("NSU ACM SC");

  // Customization states
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeLogo, setIncludeLogo] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setGeneratedValue(inputValue);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    // Scale up the resolution for the download (16x for ultra-high-res 4K export)
    const scale = 16;
    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
    const originalWidth = parseInt(clonedSvg.getAttribute("width") || "240");
    const originalHeight = parseInt(clonedSvg.getAttribute("height") || "240");

    clonedSvg.setAttribute("width", (originalWidth * scale).toString());
    clonedSvg.setAttribute("height", (originalHeight * scale).toString());

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const encodedData = unescape(encodeURIComponent(svgData));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const finalizeDownload = () => {
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "qrcode.png";
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };

        if (includeLogo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Draw diamond background with border and shadow
            const rectSize = 72 * scale;
            const borderWidth = 4 * scale;
            const shadowOff = 6 * scale;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(45 * Math.PI / 180);

            // Draw Shadow
            ctx.fillStyle = '#000000';
            ctx.fillRect(-rectSize / 2 + shadowOff, -rectSize / 2 + shadowOff, rectSize, rectSize);

            // Draw Fill
            ctx.fillStyle = bgColor;
            ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);

            // Draw Border
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);

            // Draw Logo image rotated back to upright
            ctx.rotate(-45 * Math.PI / 180);

            const maxImgSize = 52 * scale;
            const aspect = logoImg.width / logoImg.height;
            let drawW = maxImgSize;
            let drawH = maxImgSize;

            if (aspect > 1) {
              drawH = maxImgSize / aspect;
            } else {
              drawW = maxImgSize * aspect;
            }

            ctx.drawImage(logoImg, -drawW / 2, -drawH / 2, drawW, drawH);

            ctx.restore();

            finalizeDownload();
          };
          logoImg.src = "./acm-logo.webp";
        } else {
          finalizeDownload();
        }
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(encodedData);
  };

  const handleDownloadBarcode = () => {
    const container = document.getElementById("barcode-container");
    const svg = container?.querySelector("svg");
    if (!svg) return;

    const scale = 8;
    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
    const originalWidth = parseInt(clonedSvg.getAttribute("width") || "300");
    const originalHeight = parseInt(clonedSvg.getAttribute("height") || "100");

    clonedSvg.setAttribute("width", (originalWidth * scale).toString());
    clonedSvg.setAttribute("height", (originalHeight * scale).toString());

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const encodedData = unescape(encodeURIComponent(svgData));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      if (!ctx) return;

      const finalizeDownload = (finalCanvas: HTMLCanvasElement) => {
        const pngFile = finalCanvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "barcode.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };

      if (includeLogo) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const addedHeight = 70 * scale;
          canvas.width = img.width;
          canvas.height = img.height + addedHeight;

          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw barcode at the bottom
          ctx.drawImage(img, 0, addedHeight, img.width, img.height);

          // Draw logo at top center
          const maxImgSize = 60 * scale;
          const aspect = logoImg.width / logoImg.height;
          let drawW = maxImgSize;
          let drawH = maxImgSize;
          if (aspect > 1) { drawH = maxImgSize / aspect; }
          else { drawW = maxImgSize * aspect; }

          ctx.drawImage(logoImg, (canvas.width - drawW) / 2, (addedHeight - drawH) / 2 + (10 * scale), drawW, drawH);

          finalizeDownload(canvas);
        };
        logoImg.src = "./acm-logo.webp";
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        finalizeDownload(canvas);
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(encodedData);
  };

  return (
    <div className="neo-box p-6 sm:p-10 flex flex-col md:flex-row gap-8 bg-[#fdfbf7]">
      {/* Input Section */}
      <div className="flex-1 space-y-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 py-3 px-4 border-3 border-acm-ink font-bold text-lg flex items-center justify-center gap-2 transition-all ${activeTab === "qr" ? "bg-acm-orange text-white shadow-neo translate-x-[-2px] translate-y-[-2px]" : "bg-white hover:bg-gray-100"
              }`}
            style={{ borderWidth: '3px' }}
          >
            <QrCode size={24} /> QR Code
          </button>
          <button
            onClick={() => setActiveTab("barcode")}
            className={`flex-1 py-3 px-4 border-3 border-acm-ink font-bold text-lg flex items-center justify-center gap-2 transition-all ${activeTab === "barcode" ? "bg-acm-purple text-white shadow-neo translate-x-[-2px] translate-y-[-2px]" : "bg-white hover:bg-gray-100"
              }`}
            style={{ borderWidth: '3px' }}
          >
            <BarcodeIcon size={24} /> Barcode
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="space-y-2">
            <label className="font-black text-xl uppercase block">Enter Data</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://nsuacmsc.org"
              className="neo-input w-full"
            />
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label className="font-bold uppercase text-sm block">Foreground</label>
              <div className="flex items-center gap-2 neo-input p-1 pr-3 focus-within:border-[#5227FF] focus-within:shadow-[5px_5px_0px_0px_#5227FF] transition-all">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 border-0 p-0 cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="font-mono text-sm uppercase w-full bg-transparent border-none outline-none focus:ring-0"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <label className="font-bold uppercase text-sm block">Background</label>
              <div className="flex items-center gap-2 neo-input p-1 pr-3 focus-within:border-[#5227FF] focus-within:shadow-[5px_5px_0px_0px_#5227FF] transition-all">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 border-0 p-0 cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="font-mono text-sm uppercase w-full bg-transparent border-none outline-none focus:ring-0"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 mt-2">
            <input
              type="checkbox"
              id="includeLogo"
              checked={includeLogo}
              onChange={(e) => setIncludeLogo(e.target.checked)}
              className="w-6 h-6 border-3 border-acm-ink cursor-pointer accent-acm-orange"
            />
            <label htmlFor="includeLogo" className="font-bold uppercase cursor-pointer">Include ACM Logo</label>
          </div>

          <button type="submit" className="neo-button w-full py-4 text-xl flex items-center justify-center gap-2 mt-4 hover:bg-acm-purple">
            <RefreshCw size={24} /> Generate
          </button>
        </form>
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-polka bg-[#f4f4f4] border-4 border-acm-ink p-8 shadow-ultra relative min-h-[450px] overflow-hidden rounded-xl">
        <div className="absolute top-4 right-4 bg-acm-orange text-white font-black px-6 py-2 border-4 border-acm-ink transform rotate-6 z-10 shadow-neo text-lg">
          RESULT
        </div>

        <div className="flex-1 flex items-center justify-center w-full p-4 relative z-0 mt-8">
          {activeTab === "qr" ? (
            <div className="relative group">
              {/* SCAN ME Badge */}
              <div className="absolute -left-8 -top-8 bg-acm-purple text-white font-black text-xl px-5 py-2 border-4 border-acm-ink transform -rotate-12 shadow-neo z-20 transition-transform group-hover:scale-110 group-hover:rotate-[-8deg]">
                SCAN ME!
              </div>

              {/* QR Container */}
              <div className="p-6 bg-white border-4 border-acm-ink shadow-ultra-hover rounded-2xl relative transition-all duration-300" style={{ backgroundColor: bgColor }}>
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-acm-ink opacity-20"></div>
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-acm-ink opacity-20"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-acm-ink opacity-20"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-acm-ink opacity-20"></div>

                <div className="mt-4 mb-2 mx-2 relative flex items-center justify-center">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={generatedValue}
                    size={240}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="L"
                    includeMargin={false}
                  />
                  {includeLogo && (
                    <div className="absolute flex items-center justify-center z-10 w-[72px] h-[72px] border-4 border-acm-ink shadow-[6px_6px_0px_0px_#000]" style={{ backgroundColor: bgColor, transform: 'rotate(45deg)' }}>
                      <img src="./acm-logo.webp" alt="ACM Logo" className="w-[52px] h-[52px] object-contain" style={{ transform: 'rotate(-45deg)' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="p-8 bg-white border-4 border-acm-ink shadow-ultra-hover rounded-2xl w-full flex flex-col items-center justify-center overflow-visible relative transition-all duration-300" style={{ backgroundColor: bgColor }}>
                {includeLogo && (
                  <div className="absolute -top-2 z-20 group-hover:-translate-y-2 transition-transform drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    <img src="./acm-logo.webp" alt="ACM Logo" className="h-20 w-20 object-contain" />
                  </div>
                )}
                <div id="barcode-container" className="mt-6">
                  <Barcode
                    value={generatedValue || "NSU ACM SC"}
                    lineColor={fgColor}
                    background={bgColor}
                    displayValue={true}
                    height={80}
                    width={2.5}
                    margin={24}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={activeTab === "qr" ? handleDownloadQR : handleDownloadBarcode}
          className="mt-10 py-4 px-8 bg-[#4ade80] text-black border-4 border-acm-ink shadow-ultra font-black text-xl flex items-center gap-3 hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_#000] active:translate-y-0 active:shadow-none transition-all rounded-xl z-10 relative cursor-pointer"
        >
          <Download size={28} /> Download {activeTab === "qr" ? "QR" : "Barcode"}
        </button>
      </div>
    </div>
  );
}
