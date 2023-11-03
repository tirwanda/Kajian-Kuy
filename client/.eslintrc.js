module.exports = {
  root: true,
  extends: '@react-native',
};
module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false, // <== ADD THIS
  },
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
