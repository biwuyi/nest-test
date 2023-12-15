module.exports = {
  apps: [
    {
      name: 'nest-test',
      exec_mode: 'cluster',
      instances: '1',
      script: './dist/main.js',
      port: 8000,
    },
  ],
};
