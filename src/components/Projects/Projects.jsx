import { useState } from 'react';
import { Code, ExternalLink, Github, Globe, Database, Smartphone } from 'lucide-react';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import Modal from '../Modal/Modal';
import TiltCard from '../TiltCard/TiltCard';
import GitHubIntegration from '../GitHubIntegration/GitHubIntegration';

const Projects = () => {
  const [modalContent, setModalContent] = useState(null);
  const [filter, setFilter] = useState('todos');
  const [githubProjects, setGithubProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapeamento de tecnologias para ícones e cores
  const techIcons = {
    'React': { icon: '⚛️', color: '#61DAFB', symbol: 'React' },
    'JavaScript': { icon: '🟨', color: '#F7DF1E', symbol: 'JS' },
    'TypeScript': { icon: '🔷', color: '#3178C6', symbol: 'TS' },
    'Node.js': { icon: '🟢', color: '#339933', symbol: 'Node' },
    'Python': { icon: '🐍', color: '#3776AB', symbol: 'Py' },
    'MongoDB': { icon: '🍃', color: '#47A248', symbol: 'Mongo' },
    'PostgreSQL': { icon: '🐘', color: '#336791', symbol: 'PG' },
    'CSS': { icon: '🎨', color: '#1572B6', symbol: 'CSS' },
    'HTML': { icon: '📄', color: '#E34F26', symbol: 'HTML' },
    'Vue.js': { icon: '💚', color: '#4FC08D', symbol: 'Vue' },
    'Angular': { icon: '🔺', color: '#DD0031', symbol: 'NG' },
    'Docker': { icon: '🐳', color: '#2496ED', symbol: 'Docker' },
    'AWS': { icon: '☁️', color: '#FF9900', symbol: 'AWS' },
    'Firebase': { icon: '🔥', color: '#FFCA28', symbol: 'Firebase' },
    'GraphQL': { icon: '💜', color: '#E10098', symbol: 'GQL' },
    'Redux': { icon: '🔄', color: '#764ABC', symbol: 'Redux' },
    'Tailwind': { icon: '💨', color: '#06B6D4', symbol: 'TW' },
    'Express': { icon: '🚀', color: '#000000', symbol: 'Express' },
    'Next.js': { icon: '▲', color: '#000000', symbol: 'Next' },
    'Flutter': { icon: '🦋', color: '#02569B', symbol: 'Flutter' }
  };

  // Dados de exemplo dos projetos
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'fullstack',
      description: 'Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de estoque.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Tailwind'],
      links: [
        { label: 'Ver Demo', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'Sistema completo de e-commerce desenvolvido com arquitetura moderna, incluindo autenticação JWT, integração com gateway de pagamento, sistema de avaliações e painel administrativo completo.',
      status: 'Concluído',
      year: '2023'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'frontend',
      description: 'Aplicativo de gerenciamento de tarefas com interface intuitiva, drag & drop e colaboração em tempo real.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind', 'Redux'],
      links: [
        { label: 'Ver Demo', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'Aplicação de produtividade com funcionalidades avançadas como boards Kanban, colaboração em tempo real, notificações push e sincronização offline.',
      status: 'Concluído',
      year: '2023'
    },
    {
      id: 3,
      title: 'API RESTful - Blog System',
      category: 'backend',
      description: 'API robusta para sistema de blog com autenticação, CRUD completo e sistema de comentários.',
      image: '/api/placeholder/600/400',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
      links: [
        { label: 'Documentação', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'API completa com documentação Swagger, testes automatizados, rate limiting, validação de dados e deploy containerizado.',
      status: 'Concluído',
      year: '2022'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      category: 'frontend',
      description: 'Dashboard interativo para visualização de dados com gráficos dinâmicos e filtros avançados.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'JavaScript', 'Python', 'PostgreSQL', 'CSS'],
      links: [
        { label: 'Ver Demo', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'Dashboard responsivo com múltiplos tipos de gráficos, exportação de relatórios, filtros dinâmicos e atualização em tempo real.',
      status: 'Concluído',
      year: '2022'
    },
    {
      id: 5,
      title: 'Mobile App - Fitness Tracker',
      category: 'mobile',
      description: 'Aplicativo móvel para acompanhamento de exercícios com sincronização na nuvem.',
      image: '/api/placeholder/600/400',
      technologies: ['Flutter', 'Firebase', 'GraphQL'],
      links: [
        { label: 'Ver Demo', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'App móvel multiplataforma com tracking de exercícios, metas personalizadas, gráficos de progresso e integração com wearables.',
      status: 'Em Desenvolvimento',
      year: '2024'
    },
    {
      id: 6,
      title: 'Microservices Architecture',
      category: 'backend',
      description: 'Arquitetura de microserviços para sistema de delivery com alta disponibilidade.',
      image: '/api/placeholder/600/400',
      technologies: ['Node.js', 'Docker', 'AWS', 'MongoDB', 'GraphQL'],
      links: [
        { label: 'Documentação', url: '#' },
        { label: 'Código GitHub', url: '#' }
      ],
      details: 'Sistema distribuído com API Gateway, service discovery, circuit breakers e monitoramento completo.',
      status: 'Concluído',
      year: '2023'
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Globe },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'fullstack', label: 'Full Stack', icon: Code },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  // Função para atualizar projetos do GitHub
  const handleGitHubProjectsUpdate = (newGithubProjects) => {
    setGithubProjects(newGithubProjects);
  };

  // Combinar projetos estáticos e do GitHub
  const allProjects = [...projects, ...githubProjects];

  const filteredProjects = filter === 'todos' 
    ? allProjects 
    : allProjects.filter(project => project.category === filter);

  const openModal = (project) => {
    setModalContent(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const TechBadge = ({ tech }) => {
    const techInfo = techIcons[tech] || { icon: '⚡', color: '#6B7280', symbol: tech };
    
    return (
      <div className="flex items-center space-x-1 px-2 py-1 bg-white dark:bg-gray-700 
                    rounded-full border border-gray-200 dark:border-gray-600 
                    hover:scale-105 transition-transform duration-200"
           style={{ borderColor: techInfo.color + '40' }}>
        <span className="text-sm">{techInfo.icon}</span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {techInfo.symbol}
        </span>
      </div>
    );
  };

  return (
    <section id="projetos" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Meus Projetos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Uma seleção dos meus projetos mais relevantes, demonstrando 
            diferentes tecnologias e soluções criativas.
          </p>
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
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard 
              key={project.id} 
              className="group"
              tiltOptions={{ maxTilt: 8, scale: 1.03, glare: true }}
            >
              {/* Project Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden 
                            border-2 border-purple-500/20 hover:border-purple-500/40 
                            transition-all duration-300 hover:shadow-xl h-full">
                
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 
                             transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Concluído' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Title and Year */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Code className="w-4 h-4 text-cyan-400 mr-2" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tecnologias:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                      {project.technologies.length > 4 && (
                        <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            +{project.technologies.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(project)}
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 
                               text-black font-semibold py-2 px-4 rounded-lg 
                               hover:scale-105 transition-transform duration-200"
                    >
                      Ver Detalhes
                    </button>
                    {project.links.length > 0 && (
                      <button
                        onClick={() => window.open(project.links[0].url, '_blank')}
                        className="p-2 border-2 border-purple-500 text-purple-500 
                                 rounded-lg hover:bg-purple-500/10 transition-colors duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* GitHub Integration */}
        <div className="mt-12">
          <GitHubIntegration onProjectsUpdate={handleGitHubProjectsUpdate} />
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
      />
    </section>
  );
};

export default Projects;

