/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'none',
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'avoid',
  semi: false,
  bracketSpacing: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    'prettier-plugin-organize-imports'
  ]
}

module.exports = config
