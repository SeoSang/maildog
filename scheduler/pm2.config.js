module.exports = {
  apps: [
    {
      name: "daily",
      script: "ts-node cron/daily.ts",
      instance_var: "INSTANCE_ID", // 편한 이름으로 설정하면 됩니다.
      min_uptime: 5000,
      max_restarts: 5,
      args: "",
      env: {
        NODE_ENV: "production",
        API_KEY_BEAXIOS: "mingmingming",
      },
    },
    {
      name: "weekly",
      script: "ts-node cron/weekly.ts",
      instance_var: "weekly", // 편한 이름으로 설정하면 됩니다.
      min_uptime: 5000,
      max_restarts: 5,
      args: "",
      env: {
        NODE_ENV: "production",
        API_KEY_BEAXIOS: "mingmingming",
      },
    },
    {
      name: "threeDaily",
      script: "ts-node cron/threeDaily.ts",
      instance_var: "threeDaily", // 편한 이름으로 설정하면 됩니다.
      min_uptime: 5000,
      max_restarts: 5,
      args: "",
      env: {
        NODE_ENV: "production",
        API_KEY_BEAXIOS: "mingmingming",
      },
    },
  ],
};
