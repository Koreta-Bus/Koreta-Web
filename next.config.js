/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    // staticFolder: '/static',
  },
  images: {
    dangerouslyAllowSVG: true,
    // domains: ["api.koretabus.com"],
    minimumCacheTTL: 60,
  },
  env: {
    API_URL: "http://api.koretabus.com/api",
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBFfPV58KchWOJBuYWmvKXCLcByC7GpgNw",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "koretabus-a309f.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "koretabus-a309f",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "koretabus-a309f.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "593830735959",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:593830735959:web:253929212e67c437947312",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-X5WJLV9535",
  },
};


module.exports = nextConfig;