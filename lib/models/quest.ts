export enum QuestTypeEnum {
  Mcq = 0,
  ScanQr = 1,
  OpenEnded = 2,
  SocialTask = 3,
  MediaTask = 4,
  PollTask = 5,

  ProfileTask = 6,
  EventTask = 7,
}

export enum PhysicalTaskTypeEnum {
  None = 0,
  NormalQrScan = 1,
  Attendance = 2,
}

export enum QuestState {
  All = 0,
  Incomplete = 1,
  Completed = 2,
}

export enum QrCodeUsedTypeEnum {
  NotUsed = 0,
  Used = 1,
  Repeatable = 2,
}

export function getRecurringText(value?: number, recurringDay?: string) {
  switch (value) {
    case 0:
      return ''
    case 1:
      return 'REPEATS EVERY DAY'
    case 7:
      return `REPEATS ${recurringDay?.toUpperCase()}`
    default:
      return ''
  }
}

export function getRecurringFailedText(value?: number, recurringDay?: string) {
  switch (value) {
    case 0:
      return ''
    case 1:
      return 'try again tomorrow!'
    case 7:
      return `try again next week!`
    default:
      return ''
  }
}
