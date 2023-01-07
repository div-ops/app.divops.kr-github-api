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

  if (process.env.MODE == null || process.env.MODE === "") {
    return nextConfig;
  }

  console.log("TEST 모드입니다.");

  delete nextConfig.basePath;

  nextConfig.trailingSlash = true;

  nextConfig.rewrites = () => {
    return [
      {
        source: "/memory-map/",
        destination: "https://www.creco.services/memory-map/",
      },
      {
        source: "/memory-map/:slug*",
        destination: "https://www.creco.services/memory-map/:slug*",
      },
      {
        source: "/github-api/:slug*",
        destination: "/:slug*",
      },
    ];
  };

  return nextConfig;
};
