import type { NextPage } from "next";
import { useRequestGitHubOAuth } from "@divops/github-oauth-sdk";

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("NEXT_PUBLIC_GITHUB_CLIENT_ID가 주어지지 않았습니다.");
}

const RequestPage: NextPage = () => {
  useRequestGitHubOAuth({ CLIENT_ID });

  return <>loading</>;
};

export default RequestPage;
