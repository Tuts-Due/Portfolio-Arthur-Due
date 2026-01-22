export default async function handler(req, res) {
  const username = "Tuts-Due";
  const token = process.env.GITHUB_TOKEN;

  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

  const ghRes = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-arthur-due",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const body = await ghRes.text();


  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  return res.status(ghRes.status).send(body);
}
