import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PdfThumbnail from "../PdfThumbnail/PdfThumbnail";

const Modal = ({ isOpen, onClose, content }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !content) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const pdfLink =
    content?.links?.find((l) => (l?.url || "").toLowerCase().endsWith(".pdf"))?.url || null;

  const primaryLink = content?.links?.[0]?.url;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] w-full 
                   overflow-y-auto border-2 border-purple-500/30 relative animate-in 
                   fade-in-0 zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 
                   border-red-500 text-red-500 hover:bg-red-500/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold gradient-text mb-6 pr-12">{content.title}</h2>

          {/* ✅ Preview (imagem ou PDF) */}
          {content.image ? (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={content.image}
                alt={content.title}
                className="w-full max-h-96 object-contain bg-gray-100 dark:bg-gray-700"
              />
            </div>
          ) : pdfLink ? (
            <div className="mb-6">
              <PdfThumbnail url={pdfLink} heightClassName="h-96" />
            </div>
          ) : null}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Descrição</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {content.description}
            </p>
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 
                             text-cyan-400 rounded-full border border-cyan-400/30 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {content.links && content.links.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Links</h3>
              <div className="flex flex-wrap gap-3">
                {content.links.map((link, index) => (
                  <Button
                    key={index}
                    onClick={() => window.open(link.url, "_blank")}
                    className="btn-portfolio text-black font-semibold"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          {content.details && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Detalhes Adicionais</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.details}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-purple-500/20">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Fechar
            </Button>

            {primaryLink && (
              <Button
                onClick={() => window.open(primaryLink, "_blank")}
                className="btn-portfolio text-black font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Certificado
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
