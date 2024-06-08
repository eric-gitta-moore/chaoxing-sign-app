/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ["next/core-web-vitals", "plugin:import/typescript", "plugin:import/recommended"],
  plugins: ["json-files"],
  rules: {
    // eslint
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],

    "json-files/sort-package-json": "error",

    // import
    "import/first": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroupsExcludedImportTypes: ["type"],
      },
    ],
  },
};

module.exports = config;
