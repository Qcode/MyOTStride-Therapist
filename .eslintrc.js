module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/destructuring-assignment': 'never',
    'jsx-a11y/label-has-for': 'never',
  },
};
