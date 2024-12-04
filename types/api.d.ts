declare namespace Api {
  namespace Common {

    interface Response {
      IsSuccess: boolean
      Error: string
      ErrorMessage: string
    }

    interface ResponseList<T> {
      IsSuccess: boolean
      TotalCount: number
      TotalPages: number
      CurrentPage: number
      PageSize: number
      Records: T[]
    }

    interface ApiResponse<T> {
      IsSuccess: boolean
      Data: T & { IsSuccess: boolean, Error: string, ErrorMessage: string }
      Error: string
      ErrorMessage: string
    }

    interface ApiResponseList<T> {
      IsSuccess: boolean
      Data: {
        IsSuccess: boolean
        TotalCount: number
        TotalPages: number
        CurrentPage: number
        PageSize: number
        Records: T[]
      }
      Error: string
      ErrorMessage: string
    }

    interface PaginateParams {
      PageNumber: number | null
      PageSize: number | null
      sort: import('~/lib/models').Sorting
    }
  }

  namespace Auth {
    interface LoginParams {
      email?: string
      code: string
      oAuthToken: string
      oAuthVerifier: string
      ssoProvider: import('~/composables/authStore').SsoProvider
    }
    interface LoginEmailResponse extends Common.Response {
      IsRegister: boolean
      UserId: string
    }

    interface CommonSSOResponse {
      code: string
    }

    interface FacebookSSOResponse extends CommonSSOResponse {
    }

    export interface User {
      Id: number
      ReferralCode: string
      Email: string
      UserName: string
      FullName: string
      FirstName: string
      LastName: string
      SsoProvider: import('~/composables/authStore').SsoProvider
      RoleId: number
      WalletAddress: string
      ProfileCompleted: boolean
      IsVerify: boolean
    }

    export interface UserPointResponse extends Common.Response {
      Points: number
    }

    interface VerifyEmailParams {
      userId: number
      verificationCode: number
    }

    interface VerifyEmailResponse extends Common.Response {
      AccessToken: string
      IsRegister: boolean
      UserId: number
    }

    interface ResendVerificationParams {
      id: number
    }
  }

  namespace Task {
    type TaskType = 0 | 1

    export interface Task {
      Id: number
      QuestType: import('~/lib/models').TaskType
      Title: string
      Description: string
      Tag: string[]
      Points: number
      PointsGet: number
      Recurring: number
      RecurringDay: string
      QuestCompletionStatus: import('~/lib/models').QuestStateEnum
      QuestAvailability: import('~/lib/models').QuestAvailabilityEnum
      QuestImage: string | null
      StartDate: Date | null
      EndDate: Date | null
      PreRequisiteQuest: null | {
        Id: number
        Title: string
        IsComplete: boolean
      }
      GleamLink: string | null
    }

    interface GetQuestListItem extends Task {
      IsComplete: number
    }

    interface ScanQrCodeResponse extends Common.Response {
      QuestId: number
      QuestPoint: number
      UserId: number
      CurrentPoints: number
      CurrentAvailPoints: number
    }

    export interface QuestResponse {
      Id: number
      QuestType: number
      Title: string
      Description: string
      Tag: string[] | null
      Points: number
      PointsGet: number
      Recurring: number
      RecurringDay: string
      QuestImage: string | null
      StartDate: Date | null
      EndDate: Date | null
      QuestCompletionStatus: import('~/lib/models').QuestStateEnum
      QuestAvailability: import('~/lib/models').QuestAvailabilityEnum
      PreRequisiteQuest: null | {
        Id: number
        Title: string
        IsComplete: number
      }
      GleamLink: string | null
      DetailLink: string | null
    }

    interface GetQuestListParams extends Common.PaginateParams {
      tagFilter: string | null
      titleFilter: string | null
      isToday: boolean | null
    }

    export interface McqQuestionParams {
      questId: number
      questionIds: number[]
      questType: number
    }
    export interface AnswerMcqQuestionResponse extends Common.Response {
      IsCorrect: boolean
      PointsRewarded: number
      AdditionalPoint?: number
    }
    export interface AnswerPollQuestionResponse extends Common.Response {
      PointsRewarded: number
      AdditionalPoint?: number
      PollSummary: PollSummary[]
    }
    export interface PollSummary {
      AnswerId: number
      VotePercentage: number
    }

    export interface OpenEndedQuestionParams {
      questId: number
    }
    export interface OpenEndedQuestionResponse extends Common.Response {
      Id: number
      QuestId: number
      Question: string
    }
    export interface CompleteOpenEndedTaskParams {
      questId: number
      questionId: number
      answer: string
    }
    export interface CompleteOpenEndedTaskResponse extends Common.Response {
      IsCorrect: boolean
      PointsRewarded: number
      UserId: number
      CurrentPoints: number
      CurrentAvailPoints: number
    }

    export interface CompleteSocialTaskResponse extends Common.Response {
      QuestId: number
      QuestPoint: number
      UserId: number
      CurrentPoints: number
      CurrentAvailPoints: number
    }

    export interface McqQuestionResponse extends Common.Response {
      QuestId: number
      Id: number
      Question: string
      Answers: McqAnswer[]
      IsLastQuestion: boolean
    }
    export interface McqAnswer {
      Id: number
      Answer: string
    }

    export interface AnswerMcqQuestionParams {
      questId: number
      questionId: number
      answerId: number
    }
    export interface GetMcqTotalPointByUserResponse extends Common.Response {
      QuestId: number
      UserId: number
      TotalPoints: number
    }

    export interface CompleteMediaTaskParams {
      questId: number
      link: string
    }
    export interface CompleteMediaTaskResponse extends Common.Response {
      QuestId: number
      QuestPoint: number
      UserId: number
      IsApprove: number
    }
  }

  namespace Reward {
    interface Reward {
      Id: number
      RewardType: import('~/lib/models').RewardType
      Title: string
      Description: string
      DetailDescription: string
      DetailLink: null | string
      Point: number
      ImageBase64: string
      Tag: string[]
      Limit: number
      AvailableLimit: number
      LimitPerUser: number
      StartDate: Date | null | string
      EndDate: Date | null | string
      IsClaimedFinish: boolean
      IsWin: boolean
      RewardHistory: Array<{
        Id: number
        QrCode: string
        IsWin: boolean
      }> | null
      ClaimedDate: Date | null
    }

    interface DerivedReward extends Reward {
      WinQrCode: {
        Id: number
        QrCode: string
        IsWin: boolean
      } | null
    }

    interface RewardListParams extends Common.PaginateParams {
      tagFilter: string | null
      titleFilter: string | null
      isClaimed: boolean | null
    }

    interface ClaimRewardParams {
      rewardId: number
    }
  }

  namespace Point {
    export interface LeaderboardParams extends Common.SortParam {
      tierId: null
    }

    export interface LeaderboardItem {
      Rank: number
      UserId: number
      DisplayName: string
      Points: number
    }

    export interface RankDifference {
      Difference: number
      CurrentRank: number
      DaysLeft: number
      HoursLeft: number
      MinsLeft: number
    }

    export interface UserTierResponse extends Common.Response {
      Point: number
      TargetPoint: number
      TierName: string
      TierImage: string | null
    }
  }

  namespace Spin {
    interface GetSpinByIdResponse extends Common.Response {
      Id: number
      Title: string
      Slices: number
      Point: number
      StartDate: Date | null
      EndDate: Date | null
      Prizes: Array<{
        Title: string
        Image: string
        Quantity: number
        WinRate: number
        IsFinishRedeem: boolean

        Id: number
      }>
    }

    type GetTopTenLiveSpinHistoryResponse = Common.ResponseList<{
      UserEmail: string
      PrizeImage: string
      PrizeName: string
    }>

    interface SpinWheelResponse extends Common.Response {
      IsWin: boolean
      Image: string | null
      Id: number
    }
  }
}
