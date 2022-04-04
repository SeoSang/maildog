import { getLogger, Schedule } from "../logger";
import beAxios from "../axios";

const schedule = require("node-schedule");

const logger = getLogger(Schedule.Weekly);

const weeklyJob = schedule.scheduleJob("0 0 * * 0", function () {
  beAxios
    .post(`/cron`, {
      schedule: Schedule.Weekly,
    })
    .then((res) => logger.log(res))
    .catch((err) => {
      logger.error(err);
    });
});
