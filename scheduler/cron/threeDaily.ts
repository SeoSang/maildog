import { getLogger, Schedule } from "../logger";
import beAxios from "../axios";

const schedule = require("node-schedule");

const logger = getLogger(Schedule.ThreeDaily);

const threeDailyJob = schedule.scheduleJob("0 */72 * * *", function () {
  beAxios
    .post(`/cron`, {
      schedule: Schedule.ThreeDaily,
    })
    .then((res) => logger.log(res))
    .catch((err) => {
      logger.error(err);
    });
});
