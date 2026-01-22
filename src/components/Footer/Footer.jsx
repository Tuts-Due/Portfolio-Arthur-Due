import { Github, Linkedin, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arthur-du%C3%A9-59561a123/',
      icon: Linkedin,
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Tuts-Due',
      icon: Github,
      color: '#333'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5582987758569',
      icon: MessageCircle,
      color: '#25D366'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-cyan-400">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Portfólio Pessoal
              </h3>
              <p className="text-cyan-300 mb-6 leading-relaxed">
                Desenvolvedor Full Stack apaixonado por criar soluções digitais 
                inovadoras que fazem a diferença. Sempre em busca de novos 
                desafios e oportunidades de crescimento.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center 
                                    border-2 border-purple-400 hover:border-cyan-400 
                                    transition-all duration-300 hover:scale-110 tilt-hover">
                        <Icon className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 
                                       transition-colors duration-300" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                                    bg-black text-cyan-400 px-2 py-1 rounded text-sm 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    pointer-events-none whitespace-nowrap">
                        {social.name}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Navegação Rápida
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Sobre Mim', id: 'sobre' },
                  { label: 'Projetos', id: 'projetos' },
                  { label: 'Certificados', id: 'certificados' },
                  { label: 'Contato', id: 'contato' }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-cyan-300 hover:text-white transition-colors duration-300 
                               hover:translate-x-1 transform transition-transform"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Contato Direto
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-cyan-300 text-sm">E-mail:</p>
                  <a 
                    href="mailto:duetech.al@gmail.com"
                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                  >
                    duetech.al@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-cyan-300 text-sm">WhatsApp:</p>
                  <a 
                    href="https://wa.me/558287758569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                  >
                    +55 (82) 98775-8569
                  </a>
                </div>
                <div>
                  <p className="text-cyan-300 text-sm">Localização:</p>
                  <p className="text-white">Maceió, AL - Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-400/30"></div>

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-cyan-300">
              <span>&copy; {currentYear} Portfólio Pessoal. Feito com</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>e muito código.</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-sm text-cyan-300">
              <span>Desenvolvido com:</span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-black/30 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-black/30 rounded text-xs">Tailwind</span>
                <span className="px-2 py-1 bg-black/30 rounded text-xs">Vite</span>
              </div>
            </div>

           
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 
                       hover:scale-110 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Topo
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pb-4">
          <div className="text-center">
            <p className="text-xs text-cyan-300/70">
              Este portfólio está em constante evolução. Última atualização: {currentYear}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button (Mobile) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 
                 text-black rounded-full shadow-lg hover:scale-110 transition-all duration-300 
                 md:hidden z-40"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button>
    </footer>
  );
};

export default Footer;

