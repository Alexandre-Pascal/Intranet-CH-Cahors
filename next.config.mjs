// next.config.mjs
const nextConfig = {
  images : {
    domains: ['via.placeholder.com', 'localhost', 'res.cloudinary.com', 'cdn.pixabay.com', 'images.unsplash'],
  },

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
  