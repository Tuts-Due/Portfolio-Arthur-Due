import { useCallback, useState } from "react";
import { Code, ExternalLink, Globe, Database, Smartphone, Gamepad2 } from "lucide-react";
import Modal from "../Modal/Modal";
import TiltCard from "../TiltCard/TiltCard";
import GitHubIntegration from "../GitHubIntegration/GitHubIntegration";

const Projects = () => {
  const [modalContent, setModalContent] = useState(null);
  const [filter, setFilter] = useState("todos");
  const [githubProjects, setGithubProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapeamento de tecnologias para ícones e cores
  const techIcons = {
    React: { icon: "⚛️", color: "#61DAFB", symbol: "React" },
    JavaScript: { icon: "🟨", color: "#F7DF1E", symbol: "JS" },
    TypeScript: { icon: "🔷", color: "#3178C6", symbol: "TS" },
    "Node.js": { icon: "🟢", color: "#339933", symbol: "Node" },
    Python: { icon: "🐍", color: "#3776AB", symbol: "Py" },
    MongoDB: { icon: "🍃", color: "#47A248", symbol: "Mongo" },
    PostgreSQL: { icon: "🐘", color: "#336791", symbol: "PG" },
    CSS: { icon: "🎨", color: "#1572B6", symbol: "CSS" },
    HTML: { icon: "📄", color: "#E34F26", symbol: "HTML" },
    "Vue.js": { icon: "💚", color: "#4FC08D", symbol: "Vue" },
    Angular: { icon: "🔺", color: "#DD0031", symbol: "NG" },
    Docker: { icon: "🐳", color: "#2496ED", symbol: "Docker" },
    AWS: { icon: "☁️", color: "#FF9900", symbol: "AWS" },
    Firebase: { icon: "🔥", color: "#FFCA28", symbol: "Firebase" },
    GraphQL: { icon: "💜", color: "#E10098", symbol: "GQL" },
    Redux: { icon: "🔄", color: "#764ABC", symbol: "Redux" },
    Tailwind: { icon: "💨", color: "#06B6D4", symbol: "TW" },
    Express: { icon: "🚀", color: "#000000", symbol: "Express" },
    "Next.js": { icon: "▲", color: "#000000", symbol: "Next" },
    Flutter: { icon: "🦋", color: "#02569B", symbol: "Flutter" },
    Unity: { icon: "🎮", color: "#FFFFFF", symbol: "Unity" },
    "C#": { icon: "🟦", color: "#512BD4", symbol: "C#" },
    Kotlin: { icon: "🟣", color: "#A97BFF", symbol: "Kotlin" },
    Java: { icon: "☕", color: "#E11D48", symbol: "Java" },
  };

  // ✅ Projetos de EXEMPLO (layout) — não são projetos reais
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "fullstack",
      description:
        "Exemplo de card para definir layout. Projeto real em breve.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Tailwind"],
      links: [], // ⛔ sem links pra não abrir outra guia com "#"
      details:
        "Este é um exemplo (placeholder) para demonstrar a aparência do portfólio. Vou substituir por projetos reais em breve.",
      status: "Exemplo (layout)",
      year: "2023",
      isPlaceholder: true,
    },
    {
      id: 2,
      title: "Task Management App",
      category: "frontend",
      description:
        "Exemplo de card para definir layout. Projeto real em breve.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind", "Redux"],
      links: [],
      details:
        "Este é um exemplo (placeholder) para demonstrar a aparência do portfólio. Vou substituir por projetos reais em breve.",
      status: "Exemplo (layout)",
      year: "2023",
      isPlaceholder: true,
    },
    {
      id: 3,
      title: "API RESTful - Blog System",
      category: "backend",
      description:
        "Exemplo de card para definir layout. Projeto real em breve.",
      image: "/api/placeholder/600/400",
      technologies: ["Node.js", "Express", "PostgreSQL", "Docker"],
      links: [],
      details:
        "Este é um exemplo (placeholder) para demonstrar a aparência do portfólio. Vou substituir por projetos reais em breve.",
      status: "Exemplo (layout)",
      year: "2022",
      isPlaceholder: true,
    },
  ];

  const categories = [
    { id: "todos", label: "Todos", icon: Code },
    { id: "frontend", label: "Frontend", icon: Globe },
    { id: "backend", label: "Backend", icon: Database },
    { id: "fullstack", label: "Full Stack", icon: Code },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "games", label: "Games", icon: Gamepad2 },
  ];

  // ✅ Normaliza repos do GitHub para o formato do card (e evita loop com useCallback)
  const handleGitHubProjectsUpdate = useCallback((repos) => {
    const mapped = (repos || []).map((repo) => {
      const lang = repo.language || "";
      const normalizedTechs = lang ? [lang] : [];

      const normalizedCategory =
        lang.toLowerCase().includes("kotlin") || lang.toLowerCase().includes("dart")
          ? "mobile"
          : lang.toLowerCase().includes("c#") || lang.toLowerCase().includes("unity")
          ? "games"
          : "backend";

      return {
        id: `gh-${repo.id}`,
        title: repo.name,
        category: normalizedCategory,
        description: repo.description || "Sem descrição",
        image: "/api/placeholder/600/400",
        technologies: normalizedTechs,
        links: [{ label: "GitHub", url: repo.html_url }],
        details: repo.description || "Repositório importado do GitHub.",
        status: "GitHub",
        year: repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : "",
        isPlaceholder: false,
      };
    });

    setGithubProjects(mapped);
  }, []);

  // Combina projetos (exemplo + GitHub)
  const allProjects = [...projects, ...githubProjects];

  const filteredProjects =
    filter === "todos"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

  const openModal = (project) => {
    setModalContent(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const TechBadge = ({ tech }) => {
    const techInfo = techIcons[tech] || { icon: "⚡", color: "#6B7280", symbol: tech };

    return (
      <div
        className="flex items-center space-x-1 px-2 py-1 bg-white dark:bg-gray-700 
                    rounded-full border border-gray-200 dark:border-gray-600 
                    hover:scale-105 transition-transform duration-200"
        style={{ borderColor: techInfo.color + "40" }}
      >
        <span className="text-sm">{techInfo.icon}</span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {techInfo.symbol}
        </span>
      </div>
    );
  };

  const getStatusClass = (status) => {
    if (status === "GitHub") {
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    }
    if (status?.toLowerCase().includes("exemplo")) {
      return "bg-gray-500/20 text-gray-200 border border-gray-500/30";
    }
    if (status === "Concluído") {
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    }
    return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
  };

  const hasPlaceholdersShowing = filteredProjects.some((p) => p.isPlaceholder);
  const hasRealProjects = allProjects.some((p) => !p.isPlaceholder);

  return (
    <section id="projetos" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Meus Projetos
          </h2>

          {/* ✅ Mensagem clara */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Uma seleção dos meus projetos mais relevantes, demonstrando diferentes
              tecnologias e soluções criativas.
            </p>

            {/* banner de aviso */}
            {(hasPlaceholdersShowing || !hasRealProjects) && (
              <div
                className="mt-5 text-sm text-gray-700 dark:text-gray-200 
                           bg-gray-100 dark:bg-gray-900 border border-purple-500/30
                           rounded-lg px-4 py-3"
              >
                <span className="mr-2">🚧</span>
                <strong>Projetos reais em breve (em construção).</strong>{" "}
                Os cards marcados como <strong>“Exemplo (layout)”</strong> são apenas
                placeholders para mostrar a aparência do portfólio.
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 bg-gray-100 dark:bg-gray-900 rounded-lg p-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 m-1 rounded-lg 
                          transition-all duration-300 ${
                            filter === category.id
                              ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold"
                              : "text-gray-600 dark:text-gray-300 hover:text-cyan-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                          }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Empty state se não tiver nada real e filtro não bater */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            Nenhum projeto encontrado para esse filtro.
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const technologies = project.technologies ?? [];
            const links = project.links ?? [];
            const image = project.image ?? "/api/placeholder/600/400";
            const status = project.status ?? "Em Desenvolvimento";
            const year = project.year ?? "";

            const firstLink = links[0];
            const canOpenExternal =
              firstLink?.url && firstLink.url !== "#" && firstLink.url !== "";

            return (
              <TiltCard
                key={project.id}
                className="group"
                tiltOptions={{ maxTilt: 8, scale: 1.03, glare: true }}
              >
                <div
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden 
                            border-2 border-purple-500/20 hover:border-purple-500/40 
                            transition-all duration-300 hover:shadow-xl h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {year}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Code className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Tecnologias:
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {technologies.slice(0, 4).map((tech, index) => (
                          <TechBadge key={index} tech={tech} />
                        ))}

                        {technologies.length > 4 && (
                          <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              +{technologies.length - 4}
                            </span>
                          </div>
                        )}

                        {technologies.length === 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Sem tecnologias informadas
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(project)}
                        className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 
                                 text-black font-semibold py-2 px-4 rounded-lg 
                                 hover:scale-105 transition-transform duration-200"
                      >
                        Ver Detalhes
                      </button>

                      {canOpenExternal && (
                        <button
                          onClick={() => window.open(firstLink.url, "_blank")}
                          className="p-2 border-2 border-purple-500 text-purple-500 
                                   rounded-lg hover:bg-purple-500/10 transition-colors duration-200"
                          title={firstLink?.label || "Abrir link"}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* GitHub Integration */}
        <div className="mt-12">
          <GitHubIntegration onProjectsUpdate={handleGitHubProjectsUpdate} />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </section>
  );
};

export default Projects;
