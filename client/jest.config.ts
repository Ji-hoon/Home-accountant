import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  // globals: {
  //   "import.meta.env": {
  //     VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
  //     VITE_FRONTEND_URL: process.env.VITE_FRONTEND_URL,
  //   },
  // },
  // transform: {
  //   "^.+\\.tsx?$": [
  //     "ts-jest",
  //     {
  //       diagnostics: {
  //         ignoreCodes: [1343],
  //       },
  //       astTransformers: {
  //         before: [
  //           {
  //             path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
  //             options: {
  //               metaObjectReplacement: {
  //                 VITE_BACKEND_URL: "http://localhost:5001",
  //                 VITE_FRONTEND_URL: "http://localhost:5173",
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // },
};

export default config;
