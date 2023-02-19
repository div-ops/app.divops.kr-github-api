import { GitHubOAuthRoutes } from "@divops/github-oauth";

export default GitHubOAuthRoutes({
  server: "app-divops-kr",
  origins: ["https://www.creco.services"],
  prefix: "/api",
  allowedOrigins: {
    "https://www.creco.services": ["memory"],
  },
});
