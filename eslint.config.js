import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/inline-script-id": "error",
      "@next/next/next-script-for-ga": "warn",
      "@next/next/no-css-tags": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-duplicate-head": "error",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".pnpm-store/**",
      "dist/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
]

export default eslintConfig
