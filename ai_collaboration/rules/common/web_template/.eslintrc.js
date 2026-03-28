module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    // 优先使用 interface
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true, // 允许逻辑短路求值
        allowTernary: true, // 允许三元运算短路求值
      },
    ],
  },
};
