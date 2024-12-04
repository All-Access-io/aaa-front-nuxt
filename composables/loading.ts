
function _useGlobalLoading() {
  const [globalLoading, toggleGlobalLoading] = useToggle(false)
  const { start, finish } = useLoadingIndicator()
  watch(globalLoading, (value) => {
    if (value)
      start()
    else
      finish()
  })
  return {
    globalLoading,
    toggleGlobalLoading,

    clear() {
      toggleGlobalLoading(false)
      finish()
    },
  }
}

export const useGlobalLoading = createSharedComposable(_useGlobalLoading)
