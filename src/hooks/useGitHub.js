import { useState, useEffect } from 'react';

export const useGitHub = (username) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepositories = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Buscar repositórios do usuário
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API Error: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      // Filtrar apenas repositórios públicos e não forks
      const filteredRepos = repos.filter(repo => !repo.fork && !repo.private);

      // Buscar linguagens para cada repositório
      const reposWithLanguages = await Promise.all(
        filteredRepos.map(async (repo) => {
          try {
            const languagesResponse = await fetch(repo.languages_url);
            const languages = languagesResponse.ok ? await languagesResponse.json() : {};
            
            return {
              ...repo,
              languages: Object.keys(languages)
            };
          } catch (err) {
            return {
              ...repo,
              languages: []
            };
          }
        })
      );

      setRepositories(reposWithLanguages);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar repositórios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  // Função para mapear repositórios para o formato do portfólio
  const mapToPortfolioProjects = (selectedRepos = []) => {
    return selectedRepos.map(repo => ({
      id: `github-${repo.id}`,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'Projeto desenvolvido e disponível no GitHub',
      image: '/api/placeholder/400/300', // Placeholder image
      year: new Date(repo.created_at).getFullYear(),
      status: repo.archived ? 'Arquivado' : 'Concluído',
      category: determineCategory(repo.languages),
      technologies: mapLanguagesToTech(repo.languages),
      links: [
        {
          type: 'github',
          url: repo.html_url,
          label: 'Ver no GitHub'
        },
        ...(repo.homepage ? [{
          type: 'demo',
          url: repo.homepage,
          label: 'Ver Demo'
        }] : [])
      ],
      github: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        lastUpdate: repo.updated_at
      }
    }));
  };

  // Determinar categoria baseada nas linguagens
  const determineCategory = (languages) => {
    const langSet = new Set(languages.map(lang => lang.toLowerCase()));
    
    if (langSet.has('javascript') || langSet.has('typescript') || 
        langSet.has('react') || langSet.has('vue') || langSet.has('angular')) {
      if (langSet.has('node.js') || langSet.has('express') || 
          langSet.has('python') || langSet.has('java')) {
        return 'fullstack';
      }
      return 'frontend';
    }
    
    if (langSet.has('python') || langSet.has('node.js') || 
        langSet.has('java') || langSet.has('go') || langSet.has('rust')) {
      return 'backend';
    }
    
    if (langSet.has('dart') || langSet.has('swift') || langSet.has('kotlin')) {
      return 'mobile';
    }
    
    return 'outros';
  };

  // Mapear linguagens para tecnologias com emojis
  const mapLanguagesToTech = (languages) => {
    const techMap = {
      'JavaScript': { name: 'JavaScript', emoji: '🟨', color: '#F7DF1E' },
      'TypeScript': { name: 'TypeScript', emoji: '🔷', color: '#3178C6' },
      'React': { name: 'React', emoji: '⚛️', color: '#61DAFB' },
      'Vue': { name: 'Vue', emoji: '💚', color: '#4FC08D' },
      'Angular': { name: 'Angular', emoji: '🔴', color: '#DD0031' },
      'Node.js': { name: 'Node.js', emoji: '🟢', color: '#339933' },
      'Python': { name: 'Python', emoji: '🐍', color: '#3776AB' },
      'Java': { name: 'Java', emoji: '☕', color: '#007396' },
      'Go': { name: 'Go', emoji: '🐹', color: '#00ADD8' },
      'Rust': { name: 'Rust', emoji: '🦀', color: '#000000' },
      'PHP': { name: 'PHP', emoji: '🐘', color: '#777BB4' },
      'C#': { name: 'C#', emoji: '💜', color: '#239120' },
      'C++': { name: 'C++', emoji: '⚡', color: '#00599C' },
      'Swift': { name: 'Swift', emoji: '🍎', color: '#FA7343' },
      'Kotlin': { name: 'Kotlin', emoji: '🎯', color: '#7F52FF' },
      'Dart': { name: 'Dart', emoji: '🎯', color: '#0175C2' },
      'HTML': { name: 'HTML', emoji: '🌐', color: '#E34F26' },
      'CSS': { name: 'CSS', emoji: '🎨', color: '#1572B6' },
      'SCSS': { name: 'SCSS', emoji: '💅', color: '#CF649A' },
      'Docker': { name: 'Docker', emoji: '🐳', color: '#2496ED' },
      'MongoDB': { name: 'MongoDB', emoji: '🍃', color: '#47A248' },
      'PostgreSQL': { name: 'PostgreSQL', emoji: '🐘', color: '#336791' },
      'MySQL': { name: 'MySQL', emoji: '🗄️', color: '#4479A1' },
      'Redis': { name: 'Redis', emoji: '🔴', color: '#DC382D' }
    };

    return languages.map(lang => 
      techMap[lang] || { name: lang, emoji: '⚙️', color: '#666666' }
    );
  };

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
    mapToPortfolioProjects
  };
};

