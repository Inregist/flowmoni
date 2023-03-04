/** @type {import("prettier").Config} */
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
