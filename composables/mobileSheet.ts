function _useMobileSheet() {
  const [isMobileSheetOpen, toggleMobileSheet] = useToggle(false)
  return {
    isMobileSheetOpen,
    toggleMobileSheet,
  }
}

export const useMobileSheet = createSharedComposable(_useMobileSheet)
