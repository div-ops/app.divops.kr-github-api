import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onCompleteGitHubOAuth } from "@divops/github-oauth-sdk";

const Callback: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = router.query.code;

    if (code == null || Array.isArray(code)) {
      alert("잘못된 접근인데, 어떻게 오셨어요? 다시 접근해보세용! 2");
      setTimeout(() => {
        window.history.back();
      }, 3000);
      return;
    }

    onCompleteGitHubOAuth({ url: "/github-api/api/user-token", code });
  }, [router]);

  return <></>;
};

export default Callback;
