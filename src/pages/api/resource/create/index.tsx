import { GitHubOAuthServer } from "@divops/github-oauth";
import { createCors } from "../../../../api";

export default GitHubOAuthServer.of({ name: "app-divops-kr" }).CreateResource({
  before: createCors,
});
