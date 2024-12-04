export const rewardTypeMap = {
  None: 0,
  Raffle: 1,
  Claim: 2,
  Ticket: 3,
}

export enum RewardTypeEnum {
  None = 0,
  Raffle = 1,
  Claim = 2,
  Ticket = 3,
}

export function useRewardState(reward: Api.Reward.Reward | Ref<Api.Reward.Reward>) {
  function _getReward(reward: Api.Reward.Reward | Ref<Api.Reward.Reward>) {
    if (isRef(reward))
      return reward.value
    return reward
  }

  return {
    hasClaimed: computed(() => _getReward(reward)?.RewardHistory?.length || [].length > 0),
  }
}

export function transformRewardResponse(reward: Api.Reward.Reward): Api.Reward.DerivedReward {
  const WinQrCode = reward.RewardHistory?.find(v => v.IsWin)
  let rewardWinQrCode = null
  if (WinQrCode) {
    rewardWinQrCode = {
      Id: WinQrCode.Id,
      QrCode: WinQrCode.QrCode,
      IsWin: WinQrCode.IsWin,
    }
  }
  return {
    ...reward,
    WinQrCode: rewardWinQrCode,
  }
}
