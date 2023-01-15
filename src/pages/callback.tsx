import type { NextPage } from "next";
import { useCallbackGitHubOAuth } from "@divops/github-oauth-sdk";

const Callback: NextPage = () => {
  useCallbackGitHubOAuth({ url: "/github-api/api/user-token" });

  return <>loading</>;
};

export default Callback;
