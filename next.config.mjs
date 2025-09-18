import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
          rules: {
            '*.mp4': ['file-loader'],
          },
        },
      },
};

export default withNextVideo(nextConfig);