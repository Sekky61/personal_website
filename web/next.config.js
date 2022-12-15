const STUDIO_REWRITE = {
  source: "/admin/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/admin/:path*"
      : "/admin/index.html",
};

const BLOG_REWRITE = {
  source: "/blog",
  destination: "/blog/1",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [STUDIO_REWRITE, BLOG_REWRITE],
}

module.exports = nextConfig
