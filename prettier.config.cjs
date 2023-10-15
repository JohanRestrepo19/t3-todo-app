/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'none',
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'avoid',
  semi: false,
  bracketSpacing: true,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
}

module.exports = config
