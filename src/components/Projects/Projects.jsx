import { useMemo, useState } from "react";
import {
  Code,
  ExternalLink,
  Globe,
  Database,
  Smartphone,
  Gamepad2,
} from "lucide-react";
import Modal from "../Modal/Modal";
import TiltCard from "../TiltCard/TiltCard";
import { useGitHub } from "../../hooks/useGitHub";
import { GITHUB_USERNAME } from "../../config/github";

const Projects = () => {
  const [modalContent, setModalContent] = useState(null);
  const [filter, setFilter] = useState("todos");
  const [techFilter, setTechFilter] = useState("todas");
  const [deployFilter, setDeployFilter] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { repositories, loading, error } = useGitHub(GITHUB_USERNAME);

  const techIcons = {
    React: { icon: "⚛️", color: "#61DAFB", symbol: "React" },
    "React Native": { icon: "📱", color: "#61DAFB", symbol: "RN" },
    JavaScript: { icon: "🟨", color: "#F7DF1E", symbol: "JS" },
    TypeScript: { icon: "🔷", color: "#3178C6", symbol: "TS" },
    "Node.js": { icon: "🟢", color: "#339933", symbol: "Node" },
    Python: { icon: "🐍", color: "#3776AB", symbol: "Py" },
    MongoDB: { icon: "🍃", color: "#47A248", symbol: "Mongo" },
    PostgreSQL: { icon: "🐘", color: "#336791", symbol: "PG" },
    MySQL: { icon: "🗄️", color: "#4479A1", symbol: "MySQL" },
    SQLite: { icon: "🧩", color: "#0F80CC", symbol: "SQLite" },
    Redis: { icon: "🔴", color: "#DC382D", symbol: "Redis" },
    CSS: { icon: "🎨", color: "#1572B6", symbol: "CSS" },
    HTML: { icon: "📄", color: "#E34F26", symbol: "HTML" },
    SCSS: { icon: "💅", color: "#CF649A", symbol: "SCSS" },
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
    Unreal: { icon: "🕹️", color: "#111111", symbol: "Unreal" },
    Godot: { icon: "🛠️", color: "#478CBF", symbol: "Godot" },
    "C#": { icon: "🟦", color: "#512BD4", symbol: "C#" },
    Kotlin: { icon: "🟣", color: "#A97BFF", symbol: "Kotlin" },
    Java: { icon: "☕", color: "#E11D48", symbol: "Java" },
    Dart: { icon: "🎯", color: "#0175C2", symbol: "Dart" },
    PHP: { icon: "🐘", color: "#777BB4", symbol: "PHP" },
    Go: { icon: "🐹", color: "#00ADD8", symbol: "Go" },
    Rust: { icon: "🦀", color: "#000000", symbol: "Rust" },
    "Spring Boot": { icon: "🍃", color: "#6DB33F", symbol: "Spring" },
    API: { icon: "🔌", color: "#6366F1", symbol: "API" },
  };

  const categories = [
    { id: "todos", label: "Todos", icon: Code },
    { id: "frontend", label: "Frontend", icon: Globe },
    { id: "backend", label: "Backend", icon: Database },
    { id: "fullstack", label: "Full Stack", icon: Code },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "games", label: "Games", icon: Gamepad2 },
  ];

  const deployOptions = [
    { id: "todos", label: "Todos" },
    { id: "com-deploy", label: "Com deploy" },
    { id: "sem-deploy", label: "Sem deploy" },
  ];

  const detectTechnologies = (repo) => {
    const source =
      `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase();

    const techs = new Set();

    // Mobile específicos
    if (source.includes("react native")) techs.add("React Native");
    if (source.includes("expo")) techs.add("Expo");
    if (source.includes("android")) techs.add("Android");
    if (source.includes("jetpack compose")) techs.add("Jetpack Compose");

    // Backend/mobile específicos
    if (source.includes("spring boot")) techs.add("Spring Boot");
    if (source.includes("ktor")) techs.add("Ktor");
    if (source.includes("node.js") || source.includes("node"))
      techs.add("Node.js");

    // Frontend
    if (source.includes("react") && !source.includes("react native"))
      techs.add("React");
    if (source.includes("typescript")) techs.add("TypeScript");
    if (source.includes("javascript")) techs.add("JavaScript");
    if (source.includes("tailwind")) techs.add("Tailwind");
    if (source.includes("html")) techs.add("HTML");
    if (source.includes("css")) techs.add("CSS");
    if (source.includes("scss")) techs.add("SCSS");
    if (source.includes("vue")) techs.add("Vue.js");
    if (source.includes("angular")) techs.add("Angular");
    if (source.includes("next")) techs.add("Next.js");

    // Backend
    if (source.includes("express")) techs.add("Express");
    if (source.includes("java")) techs.add("Java");
    if (source.includes("kotlin")) techs.add("Kotlin");
    if (source.includes("c#")) techs.add("C#");
    if (source.includes("python")) techs.add("Python");
    if (source.includes("php")) techs.add("PHP");
    if (source.includes("go")) techs.add("Go");
    if (source.includes("rust")) techs.add("Rust");
    if (source.includes("api")) techs.add("API");
    if (source.includes("docker")) techs.add("Docker");
    if (source.includes("backend")) techs.add("Backend");

    // Banco
    if (source.includes("postgres")) techs.add("PostgreSQL");
    if (source.includes("mongo")) techs.add("MongoDB");
    if (source.includes("mysql")) techs.add("MySQL");
    if (source.includes("sqlite")) techs.add("SQLite");
    if (source.includes("firebase")) techs.add("Firebase");
    if (source.includes("redis")) techs.add("Redis");

    // Mobile extra
    if (source.includes("flutter")) techs.add("Flutter");
    if (source.includes("dart")) techs.add("Dart");
    if (source.includes("ios")) techs.add("iOS");
    if (source.includes("mobile")) techs.add("Mobile");

    // Games
    if (source.includes("unity")) techs.add("Unity");
    if (source.includes("unreal")) techs.add("Unreal");
    if (source.includes("godot")) techs.add("Godot");

    if (techs.size === 0 && repo.language) {
      techs.add(repo.language);
    }

    return Array.from(techs);
  };

  const projects = useMemo(() => {
    if (!repositories?.length) return [];

    return repositories
      .filter((repo) => !repo.fork)
      .map((repo) => {
        const detectedTechnologies = detectTechnologies(repo);

        const technologies = Array.from(
          new Set([...(repo.languages || []), ...detectedTechnologies]),
        );

        const normalizedTechs = technologies.map((tech) => tech.toLowerCase());

        const hasReactNative =
          normalizedTechs.includes("react native") ||
          normalizedTechs.includes("expo");

        const hasFrontend =
          !hasReactNative &&
          (normalizedTechs.includes("react") ||
            normalizedTechs.includes("typescript") ||
            normalizedTechs.includes("javascript") ||
            normalizedTechs.includes("html") ||
            normalizedTechs.includes("css") ||
            normalizedTechs.includes("scss") ||
            normalizedTechs.includes("tailwind") ||
            normalizedTechs.includes("vue.js") ||
            normalizedTechs.includes("angular") ||
            normalizedTechs.includes("next.js"));

        const hasKotlinMobileHints =
          normalizedTechs.includes("android") ||
          normalizedTechs.includes("jetpack compose") ||
          normalizedTechs.includes("mobile") ||
          normalizedTechs.includes("ios");

        const hasKotlinBackendHints =
          normalizedTechs.includes("spring boot") ||
          normalizedTechs.includes("ktor") ||
          normalizedTechs.includes("api") ||
          normalizedTechs.includes("backend") ||
          normalizedTechs.includes("docker") ||
          normalizedTechs.includes("postgresql") ||
          normalizedTechs.includes("mysql") ||
          normalizedTechs.includes("mongodb") ||
          normalizedTechs.includes("sqlite");

        const hasBackend =
          normalizedTechs.includes("node.js") ||
          normalizedTechs.includes("express") ||
          normalizedTechs.includes("java") ||
          normalizedTechs.includes("spring boot") ||
          normalizedTechs.includes("ktor") ||
          normalizedTechs.includes("c#") ||
          normalizedTechs.includes("python") ||
          normalizedTechs.includes("php") ||
          normalizedTechs.includes("go") ||
          normalizedTechs.includes("rust") ||
          normalizedTechs.includes("postgresql") ||
          normalizedTechs.includes("mongodb") ||
          normalizedTechs.includes("mysql") ||
          normalizedTechs.includes("sqlite") ||
          normalizedTechs.includes("redis") ||
          normalizedTechs.includes("api") ||
          normalizedTechs.includes("docker") ||
          (normalizedTechs.includes("kotlin") && !hasKotlinMobileHints);

        const hasDeploy = Boolean(repo.homepage && repo.homepage.trim() !== "");

        const hasMobile =
          hasReactNative ||
          normalizedTechs.includes("flutter") ||
          normalizedTechs.includes("dart") ||
          (normalizedTechs.includes("kotlin") && hasKotlinMobileHints);

        const hasGame =
          normalizedTechs.includes("unity") ||
          normalizedTechs.includes("unreal") ||
          normalizedTechs.includes("godot");

        let category = "backend";

        if (hasGame) {
          category = "games";
        } else if (hasMobile) {
          category = "mobile";
        } else if (hasFrontend && hasBackend) {
          category = "fullstack";
        } else if (hasFrontend) {
          category = "frontend";
        } else if (hasBackend) {
          category = "backend";
        }
        return {
          id: `gh-${repo.id}`,
          type: "project",
          title: repo.name,
          category,
          description: repo.description || "Sem descrição",
          technologies,
          hasDeploy,
          links: [
            {
              type: "github",
              label: "Ver Repositório",
              url: repo.html_url,
            },
            ...(hasDeploy
              ? [
                  {
                    type: "deploy",
                    label: "Ver Projeto",
                    url: repo.homepage,
                  },
                ]
              : []),
          ],
          details:
            repo.description ||
            "Repositório público importado automaticamente do GitHub.",
          status: "GitHub",
          year: repo.updated_at
            ? new Date(repo.updated_at).getFullYear().toString()
            : "",
          updatedAt: repo.updated_at,
        };
      });
  }, [repositories]);

  const availableTechnologies = useMemo(() => {
    const allTechs = projects.flatMap((project) => project.technologies || []);
    return ["todas", ...Array.from(new Set(allTechs)).sort()];
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = filter === "todos" || project.category === filter;

    const techMatch =
      techFilter === "todas" || project.technologies.includes(techFilter);

    const deployMatch =
      deployFilter === "todos" ||
      (deployFilter === "com-deploy" && project.hasDeploy) ||
      (deployFilter === "sem-deploy" && !project.hasDeploy);

    return categoryMatch && techMatch && deployMatch;
  });

  const openModal = (project) => {
    setModalContent(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const TechBadge = ({ tech }) => {
    const techInfo = techIcons[tech] || {
      icon: "⚡",
      color: "#6B7280",
      symbol: tech,
    };

    return (
      <div
        className="flex items-center space-x-1 px-2.5 py-1 rounded-full border hover:scale-105 transition-transform duration-200 bg-slate-800 text-white dark:bg-gray-700 dark:text-white"
        style={{ borderColor: `${techInfo.color}66` }}
      >
        <span className="text-sm">{techInfo.icon}</span>
        <span className="text-xs font-medium text-white">
          {techInfo.symbol}
        </span>
      </div>
    );
  };

  return (
    <section id="projetos" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Meus Projetos
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Repositórios públicos importados automaticamente do meu GitHub.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mb-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 m-1 rounded-lg transition-all duration-300 ${
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-purple-500/20 p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                  Deploy
                </h3>

                <div className="flex flex-col gap-2">
                  {deployOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setDeployFilter(option.id)}
                      className={`px-4 py-2 rounded-lg text-left border transition ${
                        deployFilter === option.id
                          ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent font-semibold"
                          : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-purple-500/20 p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                  Tecnologias
                </h3>

                <div className="flex flex-wrap gap-2">
                  {availableTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setTechFilter(tech)}
                      className={`px-3 py-2 rounded-full border text-sm transition ${
                        techFilter === tech
                          ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent font-semibold"
                          : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40"
                      }`}
                    >
                      {tech === "todas" ? "Todas" : tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {loading && (
              <div className="text-center text-gray-600 dark:text-gray-300 py-10">
                Carregando projetos do GitHub...
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-10">
                Erro ao buscar projetos do GitHub: {String(error)}
              </div>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-300 py-10">
                Nenhum repositório público encontrado para esse filtro.
              </div>
            )}

            {!loading && !error && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((project) => {
                  const technologies = project.technologies ?? [];
                  const links = project.links ?? [];
                  const firstLink = links[0];
                  const canOpenExternal =
                    firstLink?.url &&
                    firstLink.url !== "#" &&
                    firstLink.url !== "";

                  return (
                    <TiltCard
                      key={project.id}
                      className="group"
                      tiltOptions={{ maxTilt: 8, scale: 1.03, glare: true }}
                    >
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl h-full">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white break-words">
                              {project.title}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 shrink-0">
                              {project.year}
                            </span>
                          </div>

                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {project.status}
                            </span>

                            {project.hasDeploy && (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                                Deploy
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <Code className="w-4 h-4 text-cyan-400 mr-2" />
                              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Tecnologias:
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {technologies.length > 0 ? (
                                technologies.map((tech, index) => (
                                  <TechBadge key={index} tech={tech} />
                                ))
                              ) : (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Sem tecnologias informadas
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(project)}
                              className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-200"
                            >
                              Ver Detalhes
                            </button>

                            {canOpenExternal && (
                              <button
                                onClick={() =>
                                  window.open(firstLink.url, "_blank")
                                }
                                className="p-2 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500/10 transition-colors duration-200"
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
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </section>
  );
};

export default Projects;
