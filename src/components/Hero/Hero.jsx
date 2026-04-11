import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Code, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const texts = [
    "Desenvolvedor Full Stack",
    "Designer UI/UX",
    "Criador de Soluções",
    "Inovador Digital",
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full px-4">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight md:leading-[1.05]">
              <span className="relative z-20 block text-white mb-5">
                Olá, eu sou
              </span>

              <span className="relative z-10 block gradient-text animate-glow">
                Arthur Dué
              </span>
            </h1>

            <div className="min-h-[3.5rem] flex items-center justify-center">
              <p className="text-2xl md:text-3xl text-cyan-400 font-semibold transition-all duration-500">
                {texts[currentText]}
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Transformo ideias em experiências digitais incríveis. Especializado em criar
              soluções inovadoras que combinam design elegante com tecnologia de ponta.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projetos")}
                className="btn-portfolio text-black font-semibold px-8 py-3 text-lg tilt-hover"
              >
                Ver Projetos
              </Button>

              <Button
                onClick={() => scrollToSection("contato")}
                variant="outline"
                className="border-2 border-purple-500 text-cyan-400 hover:bg-purple-500/20 px-8 py-3 text-lg tilt-hover"
              >
                Entre em Contato
              </Button>
            </div>

            <div className="mt-6 flex justify-center gap-8">
              <div className="flex flex-col items-center group">
                <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="text-sm text-gray-400">Desenvolvimento</span>
              </div>

              <div className="flex flex-col items-center group">
                <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-8 h-8 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Design</span>
              </div>

              <div className="flex flex-col items-center group">
                <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-400">Inovação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <button
          onClick={() => scrollToSection("sobre")}
          className="text-cyan-400 hover:text-white transition-colors duration-300"
          aria-label="Ir para seção Sobre"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
