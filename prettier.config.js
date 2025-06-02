/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  trailingComma: "es5",
  singleQuote: true,
  tabWidth: 2,
  printWidth: 160,
  plugins: ['prettier-plugin-organize-imports']
};

export default config;