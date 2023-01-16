import type { NextPage } from "next";
import { GitHubOAuthApp } from "@divops/github-oauth";

const Callback: NextPage = () => {
  GitHubOAuthApp.useCallbackGitHubOAuth({ url: "/github-api/api/user-token" });

  return <>loading</>;
};

export default Callback;
