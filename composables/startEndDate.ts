type MabyeRef<T> = Ref<T> | T

interface StartEndDate {
  startDate?: Date | null | undefined | string
  endDate?: Date | null | undefined | string

  StartDate: Date | null | undefined | string
  EndDate: Date | null | undefined | string
}

const _useNow = createSharedComposable(useNow)

export function useStartEndDate(props: MabyeRef<StartEndDate>) {
  const _startDate = computed(() => {
    if (isRef(props))
      return props.value.StartDate
    return props?.StartDate
  })
  const _endDate = computed(() => {
    if (isRef(props))
      return props.value.EndDate
    return props?.EndDate
  })

  const dayjs = useDayjs()
  const today = computed(() => {
    return dayjs()
  })

  // const isValidDate = computed(() => {
  //   return !!props.startDate && !!props.endDate
  // })
  const startDate = computed(() => {
    return dayjs(_startDate.value)
  })
  const startDateString = computed(() => {
    return startDate.value.format('DD MMM YYYY')
  })
  const endDate = computed(() => {
    return dayjs(_endDate.value)
  })
  const endDateString = computed(() => {
    return endDate.value.format('DD MMM YYYY')
  })

  const isComingSoon = computed(() => {
    if (!_startDate.value)
      return false
    return startDate.value.isAfter(today.value)
  })
  const isLocked = isComingSoon
  const isExpired = computed(() => {
    if (!_endDate.value)
      return false
    return today.value.isAfter(endDate.value)
  })
  const isOnGoing = computed(() => {
    if (!_startDate.value || !_endDate.value)
      return true

    return !isComingSoon.value && !isExpired.value
  })

  // const isLeftOneDay = computed(() => {
  //   return endDate.value.diff(today.value, 'day') <= 1
  // })
  const isComingSoonOneDay = computed(() => {
    return startDate.value.diff(today.value, 'day') <= 1
  })

  const now = _useNow()
  const countdownTimer = computed(() => {
    if (isComingSoon.value) {
      const countdown = startDate.value.diff(now.value)
      const days = dayjs.duration(countdown).asDays()
      if (days <= 1)
        return dayjs.duration(countdown).format('HH:mm:ss')

      return `${Math.floor(dayjs.duration(countdown).asDays())} days`
    }
    else if (isOnGoing.value) {
      const countdown = endDate.value.diff(now.value)
      const days = dayjs.duration(countdown).asDays()
      if (days <= 1)
        return dayjs.duration(countdown).format('HH:mm:ss')

      return `${Math.floor(dayjs.duration(countdown).asDays())} days`
    }
    else {
      return 'Ended'
    }
  })

  const date = computed(() => {
    if (props === null || props === undefined)
      return null
    if (_startDate.value && _endDate.value)
      return `${startDate.value.format('DD MMM YYYY')} - ${endDate.value.format('DD MMM YYYY')}`
    else if (_endDate.value)
      return endDate.value.format('DD MMM YYYY')
    else
      return null
  })
  return {
    date,
    startDateString,
    endDateString,

    isComingSoon,
    isOnGoing,
    isExpired,
    isLocked,
    isComingSoonOneDay,

    countdownTimer,
  }
}

export function useIsExpired(data: Ref<Pick<StartEndDate, 'endDate'>>) {
  const dayjs = useDayjs()
  return computed(() => {
    const _endDate = dayjs(data.value?.endDate)
    return _endDate.isBefore(dayjs())
  })
}
