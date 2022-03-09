export interface CronAddParam {
  url: string
  cron_expression: string
  cron_job_name?: string
  http_method?: string
  http_headers?: string
  http_message_body?: any
}
