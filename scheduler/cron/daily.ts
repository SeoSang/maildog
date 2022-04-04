import axios from "axios";

import { API_URL } from "../config";
import { getLogger, Schedule } from "../logger";

const schedule = require("node-schedule");

const logger = getLogger(Schedule.Daily);

const dailyJob = schedule.scheduleJob("0 0 12 * * ?", function () {
  axios
    .post(`${API_URL}/cron`)
    .then((res) => logger.log(res))
    .catch((err) => {
      logger.error(err);
    });
});
