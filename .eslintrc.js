module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    quotes: ['error', 'single'],
    // we use 2 spaces to indent our code
    indent: ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
