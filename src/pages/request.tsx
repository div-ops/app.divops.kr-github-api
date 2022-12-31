import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { requestGitHubOAuth } from "@divops/github-oauth-sdk";

const CLIENT_ID = "0a82fd2fc4d4d7e7162d";

const TestLogin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const referrer = router.query.referrer;

    if (referrer == null || Array.isArray(referrer)) {
      alert("잘못된 접근인데, 어떻게 오셨어요? 다시 접근해보세용! 3");
      setTimeout(() => {
        window.history.back();
      }, 3000);
      return;
    }

    requestGitHubOAuth({ CLIENT_ID, referrer });
  }, [router]);

  return <></>;
};

export default TestLogin;
