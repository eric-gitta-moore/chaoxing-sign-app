/**
 *
 * @type {import('@types/lint-staged').Config}
 */
const config = {
  "*.(css|scss)": ["prettier --check"],
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --check"],
};

module.exports = config;
