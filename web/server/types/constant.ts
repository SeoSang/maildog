export const CONSTANT_KEY_PASSWORD_ENCRYPT = 13

export enum UserResultType {
  SUCCESS = 'SUCCESS',
  NOT_EXIST = 'NOT_EXIST',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
}

export enum CronCreateResultType {
  SUCCESS = 'SUCCESS',
  EXISTED = 'EXISTED',
  ERROR = 'ERROR',
}

export enum Schedule {
  Daily = 'Daily',
  ThreeDaily = 'ThreeDaily',
  Weekly = 'Weekly',
}

export enum Service {
  Email = 'Email',
  KakaoTalk = 'KakaoTalk',
}
