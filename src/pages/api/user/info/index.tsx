import { GitHubOAuthServer } from "@divops/github-oauth";
import { createCors } from "../../../../api/index";

export default GitHubOAuthServer.of({ name: "app-divops-kr" }).UserInfo({
  before: createCors,
});
