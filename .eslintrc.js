module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  Plugin: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOFLine: "auto" }],
    "prefer-destructuring": ["error", { Object: true, array: false }],
  },
};
