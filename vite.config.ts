import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default async function config(configEnv: { mode: string; command: "build" | "serve" }) {
  const serverEnv = loadEnv(configEnv.mode, process.cwd(), "");
  Object.assign(process.env, serverEnv);

  return defineConfig({
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      tanstackStart({
        server: { entry: "server" },
      }),
      viteReact(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
        "entities/lib/decode.js": path.resolve("node_modules/entities/lib/decode.js"),
        "entities/lib/encode.js": path.resolve("node_modules/entities/lib/encode.js"),
        entities: path.resolve("node_modules/entities"),
      },
    },
  });
}

