import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".figma-tmp/**",
  ]),
  {
    files: ["src/emails/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["src/components/navbar.tsx", "src/components/tours/tour-sidebar.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
