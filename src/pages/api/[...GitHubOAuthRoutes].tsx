import { GitHubOAuthRoutes } from "@divops/github-oauth";

export default GitHubOAuthRoutes({
  server: "app-divops-kr",
  prefix: "/api",
  allowedOrigins: {
    "https://www.creco.services": ["memory"],
    "https://div.homes": ["gtd-todo"],
  },
});
