interface FetchSchemaApi<DefaultApiResponse = unknown> {
  statusCode: number
  data: DefaultApiResponse
}
// https://github.com/unjs/nitro/issues/470#issuecomment-1879972686
declare module 'nitropack' {
  interface $Fetch<DefaultT = unknown, DefaultR extends NitroFetchRequest = NitroFetchRequest> {
    <T = DefaultT, R extends NitroFetchRequest = DefaultR, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(request: R, opts?: O): Promise<TypedInternalResponse<R, FetchSchemaApi<T>, ExtractedRouteMethod<R, O>>>
    raw<T = DefaultT, R extends NitroFetchRequest = DefaultR, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(request: R, opts?: O): Promise<FetchResponse<TypedInternalResponse<R, FetchSchemaApi<T>, ExtractedRouteMethod<R, O>>>>
    create<T = DefaultT, R extends NitroFetchRequest = DefaultR>(defaults: FetchOptions): $Fetch<FetchSchemaApi<T>, R>
  }
}

interface Window {
  Gleam: {
    openPopupCampaign: () => void
  }

  onGleamEvent: (event: any) => void
}
