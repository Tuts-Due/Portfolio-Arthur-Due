import { useState, useEffect } from "react";

export const useGitHub = (username) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const fetchRepositories = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const headers = {
        Accept: "application/vnd.github+json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        { headers }
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API Error: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      const filteredRepos = repos.filter((repo) => !repo.fork && !repo.private);

      const reposWithLanguages = await Promise.all(
        filteredRepos.map(async (repo) => {
          try {
            const languagesResponse = await fetch(repo.languages_url, { headers });
            const languages = languagesResponse.ok
              ? await languagesResponse.json()
              : {};

            return {
              ...repo,
              languages: Object.keys(languages),
            };
          } catch {
            return {
              ...repo,
              languages: [],
            };
          }
        })
      );

      setRepositories(reposWithLanguages);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao buscar repositórios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
  };
};