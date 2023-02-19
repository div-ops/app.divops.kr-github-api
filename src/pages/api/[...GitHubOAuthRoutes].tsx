import { GitHubOAuthRoutes } from "@divops/github-oauth";

export default GitHubOAuthRoutes({
  name: "app-divops-kr",
  origins: ["https://www.creco.services"],
  prefix: "/api",
});
