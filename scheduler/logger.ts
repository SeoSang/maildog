// create a custom timestamp format for log statements
const SimpleNodeLogger = require("simple-node-logger");

export enum Schedule {
  Daily = "Daily",
  ThreeDaily = "ThreeDaily",
  Weekly = "Weekly",
}

export const getLogger = (type: Schedule) => {
  let logFilePath = "mylogfile.log";
  switch (type) {
    case Schedule.Daily:
      logFilePath = "daily.log";
    case Schedule.ThreeDaily:
      logFilePath = "threeDaily.log";
    case Schedule.Weekly:
      logFilePath = "weekly.log";
  }
  const opts = {
    logFilePath,
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
  };
  return SimpleNodeLogger.createSimpleLogger(opts);
};
