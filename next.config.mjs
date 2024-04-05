// next.config.mjs
const nextConfig = {
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "os": false,
          "dns": false,
          "net": false,
            "tls": false,
        }
      }
      return config
    }
  };
  
  export default nextConfig;
  