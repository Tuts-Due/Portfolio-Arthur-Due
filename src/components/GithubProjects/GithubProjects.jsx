import { useMemo } from "react";
import { Github, Star, GitFork, Calendar, ExternalLink, Loader } from "lucide-react";
import { useGitHub } from "../../hooks/useGitHub";
import { GITHUB_USERNAME, FEATURED_REPOS } from "../../config/github";

const GitHubProjects = ({ onProjectsUpdate }) => {
  const { repositories, loading, error, mapToPortfolioProjects } = useGitHub(GITHUB_USERNAME);

  const filteredRepos = useMemo(() => {
    if (!repositories?.length) return [];
    // mantém a ordem do FEATURED_REPOS
    return FEATURED_REPOS
      .map((name) => repositories.find((r) => r.name === name))
      .filter(Boolean);
  }, [repositories]);

  // manda para o Projects atualizar automaticamente
  useMemo(() => {
    if (filteredRepos.length > 0 && onProjectsUpdate) {
      onProjectsUpdate(mapToPortfolioProjects(filteredRepos));
    }
  }, [filteredRepos, mapToPortfolioProjects, onProjectsUpdate]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("pt-BR");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 border-2 border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Projetos do GitHub
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Repositórios públicos de @{GITHUB_USERNAME}
          </p>
        </div>
        <Github className="w-7 h-7 text-cyan-400" />
      </div>

      {loading && (
        <div className="text-center py-10">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-300">Carregando repositórios...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Erro ao buscar repositórios: {String(error)}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border-2 border-purple-500/20 hover:border-cyan-400/60 transition-all duration-200 bg-white dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                  {repo.name}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {repo.description || "Sem descrição"}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-3">
                  {repo.language && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mr-1" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="w-3 h-3 mr-1" />
                    {repo.forks_count}
                  </span>
                </div>

                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;
