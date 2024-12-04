interface Options {
  lastItemRef: Ref<HTMLElement | undefined>
}

export function useInfiniteScroll<T extends Api.Common.ResponseList<any>>({
  lastItemRef,
}: Options) {
  return {
    infiniteQueryParams: {
      initialPageParam: 1,
      getNextPageParam(lastPage: T) {
        if (!lastPage?.CurrentPage || !lastPage?.TotalPages)
          return 2

        if (lastPage.CurrentPage + 1 > lastPage.TotalPages)
          return undefined
        return lastPage.CurrentPage + 1
      },
      getPreviousPageParam(lastPage: T) {
        if (!lastPage?.CurrentPage)
          return 1

        if (lastPage.CurrentPage - 1 <= 0)
          return undefined
        return lastPage.CurrentPage - 1
      },
    },
    setupObserver(infiniteQuery: ReturnType<typeof useInfiniteQuery>) {
      watch(lastItemRef, () => {
        if (!lastItemRef.value)
          return
        try {
          const observer = new IntersectionObserver((entries, _observer) => {
            if (entries[0].isIntersecting && infiniteQuery.hasNextPage.value && !infiniteQuery.isFetching.value)
              infiniteQuery.fetchNextPage()
          })
          observer.observe(lastItemRef.value!)
        }
        catch (e) {
          console.error(e)
        }
      })
    },
  }
}
