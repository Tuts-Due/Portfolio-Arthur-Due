import { useState, useEffect } from 'react';
import { Github, Star, GitFork, Calendar, ExternalLink, Settings, Check, X, Loader } from 'lucide-react';
import { useGitHub } from '../../hooks/useGitHub';

const GitHubIntegration = ({ onProjectsUpdate }) => {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const { repositories, loading, error, refetch, mapToPortfolioProjects } = useGitHub(savedUsername);

  
  useEffect(() => {
    const saved = localStorage.getItem('github-config');
    if (saved) {
      const config = JSON.parse(saved);
      setSavedUsername(config.username || '');
      setUsername(config.username || '');
      setSelectedRepos(config.selectedRepos || []);
    }
  }, []);


  useEffect(() => {
    if (selectedRepos.length > 0 && repositories.length > 0) {
      const selectedRepoData = repositories.filter(repo => 
        selectedRepos.includes(repo.id)
      );
      const portfolioProjects = mapToPortfolioProjects(selectedRepoData);
      onProjectsUpdate(portfolioProjects);
    }
  }, [selectedRepos, repositories, mapToPortfolioProjects, onProjectsUpdate]);

  const handleSaveConfig = () => {
    const config = {
      username: username.trim(),
      selectedRepos
    };
    
    localStorage.setItem('github-config', JSON.stringify(config));
    setSavedUsername(username.trim());
    setIsConfiguring(false);
  };

  const handleRepoToggle = (repoId) => {
    setSelectedRepos(prev => 
      prev.includes(repoId) 
        ? prev.filter(id => id !== repoId)
        : [...prev, repoId]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!isConfiguring && !savedUsername) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 border-2 border-purple-500/20">
        <div className="text-center">
          <Github className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Integração com GitHub
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Esta seção será automaticamente atualizada com seus projetos do GitHub
          </p>
          <button
            onClick={() => setIsConfiguring(true)}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black 
                     font-semibold px-6 py-3 rounded-lg hover:scale-105 
                     transition-transform duration-200"
          >
            <Settings className="w-5 h-5 inline mr-2" />
            Configurar Integração
          </button>
        </div>
      </div>
    );
  }

  if (isConfiguring) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 border-2 border-purple-500/20">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Configurar Integração GitHub
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Digite seu username do GitHub para buscar seus repositórios
          </p>
        </div>

        <div className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Username do GitHub
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu-username"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-purple-500/30 
                         bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                         focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                onClick={handleSaveConfig}
                disabled={!username.trim() || loading}
                className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black 
                         font-semibold px-6 py-3 rounded-lg hover:scale-105 
                         transition-transform duration-200 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsConfiguring(false)}
                className="p-3 border-2 border-gray-300 dark:border-gray-600 
                         text-gray-600 dark:text-gray-400 rounded-lg 
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-400">
                Erro ao buscar repositórios: {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <Loader className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-300">
                Buscando repositórios...
              </p>
            </div>
          )}

          {/* Repository Selection */}
          {repositories.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Selecione os repositórios para exibir ({selectedRepos.length} selecionados)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedRepos.includes(repo.id)
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                    onClick={() => handleRepoToggle(repo.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-800 dark:text-white truncate">
                        {repo.name}
                      </h5>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedRepos.includes(repo.id)
                          ? 'border-cyan-400 bg-cyan-400'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedRepos.includes(repo.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {repo.description || 'Sem descrição'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-3">
                        {repo.language && (
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-1"></div>
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Configured state
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 border-2 border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Projetos do GitHub
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Integrado com @{savedUsername} • {selectedRepos.length} projetos selecionados
          </p>
        </div>
        <button
          onClick={() => setIsConfiguring(true)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-cyan-400 
                   transition-colors duration-200"
          title="Reconfigurar"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {selectedRepos.length > 0 ? (
        <div className="text-center text-green-600 dark:text-green-400">
          <Check className="w-8 h-8 mx-auto mb-2" />
          <p>Integração ativa! Seus projetos estão sendo exibidos na seção acima.</p>
        </div>
      ) : (
        <div className="text-center text-yellow-600 dark:text-yellow-400">
          <Settings className="w-8 h-8 mx-auto mb-2" />
          <p>Configure a integração para exibir seus projetos automaticamente.</p>
        </div>
      )}
    </div>
  );
};

export default GitHubIntegration;

