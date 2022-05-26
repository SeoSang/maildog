module.exports = {
  apps: [
    {
      name: 'maildog',
      script: 'node_modules/next/dist/bin/next start',
      instance_var: 'maildog', // 편한 이름으로 설정하면 됩니다.
      min_uptime: 5000,
      max_restarts: 5,
      args: '',
      env: {
        NODE_ENV: 'production',
        DB_PATH: '/var/tmp/prod.sqlite3',
      },
    },
  ],
}
