module.exports = {
  root: true,
  env: {
    node: true,
  },
<<<<<<< HEAD
  extends: ['plugin:vue/essential', '@vue/airbnb'],
=======
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
>>>>>>> discovery
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'operator-linebreak': ['error', 'after'],
<<<<<<< HEAD
=======
    'implicit-arrow-linebreak': ['warn', 'beside'],
>>>>>>> discovery
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
