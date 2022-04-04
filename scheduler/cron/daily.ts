import { getLogger, Schedule } from "../logger";
import beAxios from "../axios";

const schedule = require("node-schedule");

const logger = getLogger(Schedule.Daily);

const dailyJob = schedule.scheduleJob("0 0 12 * * ?", function () {
  beAxios
    .post(`/cron`, { schedule: Schedule.Daily })
    .then((res) => logger.log(res))
    .catch((err) => {
      logger.error(err);
    });
});
