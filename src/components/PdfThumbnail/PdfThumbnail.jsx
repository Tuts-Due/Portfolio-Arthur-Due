import { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfThumbnail({
  url,
  className = "",
  heightClassName = "h-64",
  pageNumber = 1,
}) {
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderThumb() {
      try {
        setError(false);
        setImgSrc(null);

        const pdf = await pdfjs.getDocument({ url }).promise;
        const page = await pdf.getPage(pageNumber);

        // Renderiza em alta pra ficar nítido, depois o CSS reduz
        const viewport = page.getViewport({ scale: 1 });
        const desiredWidth = 1200;
        const scale = desiredWidth / viewport.width;
        const scaled = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = Math.floor(scaled.width);
        canvas.height = Math.floor(scaled.height);

        await page.render({ canvasContext: ctx, viewport: scaled }).promise;

        if (!cancelled) setImgSrc(canvas.toDataURL("image/png"));
      } catch (e) {
        if (!cancelled) setError(true);
        console.error("Erro ao gerar thumbnail do PDF:", e);
      }
    }

    if (url) renderThumb();

    return () => {
      cancelled = true;
    };
  }, [url, pageNumber]);

  if (error) {
    return (
      <div
        className={`w-full ${heightClassName} rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center ${className}`}
      >
        <span className="text-sm opacity-80">Preview indisponível</span>
      </div>
    );
  }

  return (
    <div className={`w-full ${heightClassName} rounded-lg overflow-hidden bg-white/5 ${className}`}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Preview do certificado"
          className="w-full h-full object-contain bg-white"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full animate-pulse bg-white/10" />
      )}
    </div>
  );
}
