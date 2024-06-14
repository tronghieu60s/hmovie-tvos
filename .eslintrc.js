module.exports = {
  extends: "expo",
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
  },
};
