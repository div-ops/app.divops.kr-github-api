import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Test: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<null | string>(null);
  const { resetQueryParam } = useResetQueryParam();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = router.query.code;

    if (code == null || Array.isArray(code)) {
      setLoading(false);
      return;
    }

    setLoading(true);

    localStorage.setItem("Authorization", code);

    resetQueryParam("code");
  }, [router]);

  useEffect(() => {
    fetchUserInfo().then(({ data }) => {
      if (data == null) {
        return;
      }
      console.log(data);
      setUser(data.login);
    });
  }, []);

  if (loading) {
    return <div>로그인 중</div>;
  }

  if (user != null) {
    return (
      <div>
        <h1>환영합니다, {user}!</h1>
        <button
          onClick={() => {
            requestLogout();
            setUser(null);
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>로그인</title>
      </Head>

      <main>
        <h1>로그인하기</h1>
        <button
          onClick={() => {
            requestLogin();
          }}
        >
          로그인
        </button>
      </main>
    </div>
  );
};

export default Test;

function createAuthHeaders() {
  const Authorization = localStorage.getItem("Authorization");
  if (Authorization != null) {
    return { Authorization } as const;
  } else {
    return {} as any;
  }
}

async function requestLogout() {
  await fetch(`/github-api/api/logout`, {
    method: "GET",
    headers: {
      ...createAuthHeaders(),
    },
  });
}

async function fetchUserInfo() {
  const response = await fetch(`/github-api/api/user/info`, {
    method: "GET",
    headers: {
      ...createAuthHeaders(),
    },
  });

  return await response.json();
}

function requestLogin() {
  location.assign(`/github-api/request?referrer=${location.href}`);
}

function useResetQueryParam() {
  const router = useRouter();

  return {
    resetQueryParam: (key: string) => {
      const query = { ...router.query };

      delete query[key];

      router.replace({ pathname: router.pathname, query });
    },
  } as const;
}
