import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "app/generated/**",
      "components/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "app/components/products/**"
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    
    rules:{
      //  "no-console": "error",
      "no-unused-vars": "error",
      "prefer-const":"off",
      "@typescript-eslint/no-explicit-any":"off",
      // "@no-console:":2
    }
  },

];

export default eslintConfig;
