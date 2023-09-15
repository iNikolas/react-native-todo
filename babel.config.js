module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@utils': './src/utils',
          '@api': './src/api',
          '@constants': './src/constants',
          '@store': './src/store',
          '@types': './src/types',
        },
      },
    ],
  ],
};
