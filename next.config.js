/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    // ...defaultConfig,
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/github-api",
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };

  // fs 모듈 in browser 문제 해결
  nextConfig.webpack5 = true;
  nextConfig.webpack = (config, { isServer } = {}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  };

  if (process.env.MODE == null || process.env.MODE === "") {
    return nextConfig;
  }

  console.log("TEST 모드입니다.");

  delete nextConfig.basePath;

  nextConfig.trailingSlash = true;

  nextConfig.rewrites = () => {
    const TEST_BASE_URL =
      process.env.TEST_BASE_URL ?? "https://www.creco.services";
    return [
      {
        source: "/memory-map/",
        destination: `${TEST_BASE_URL}/memory-map/`,
      },
      {
        source: "/memory-map/:slug*",
        destination: `${TEST_BASE_URL}/memory-map/:slug*`,
      },
      {
        source: "/github-api/:slug*",
        destination: "/:slug*",
      },
    ];
  };

  return nextConfig;
};
