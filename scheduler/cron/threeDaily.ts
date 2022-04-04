import axios from "axios";
import { getLogger, Schedule } from "../logger";
import { API_URL } from "../config";

const schedule = require("node-schedule");

const logger = getLogger(Schedule.ThreeDaily);

const threeDailyJob = schedule.scheduleJob("0 */72 * * *", function () {
  axios
    .post(`${API_URL}/cron`)
    .then((res) => logger.log(res))
    .catch((err) => {
      logger.error(err);
    });
});
