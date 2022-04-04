module.exports = {
  apps: [
    {
      name: "appName",
      script: "src/index.js",
      instance_var: "INSTANCE_ID", // 편한 이름으로 설정하면 됩니다.
      instance: 0,
      exec_mode: "cluster",
      min_uptime: 5000,
      max_restarts: 5,
      args: "",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
