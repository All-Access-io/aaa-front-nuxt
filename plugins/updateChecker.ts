export default defineNuxtPlugin(() => {
  let currentVersion = ''
  let needUpdateApp = false
  async function getCurrentVersion() {
    const html = await fetch(`/?timestamp=${Date.now()}`).then(res => res.text())
    const scriptReg = /<script.*src="(.*?)" .*?<\/script>/g
    scriptReg.lastIndex = 0
    const match = scriptReg.exec(html)
    if (match?.at(1))
      return match.at(1)

    return ''
  }
  async function needUpdate() {
    const newVersion = await getCurrentVersion()// 调用newScripts
    if (!currentVersion && newVersion) { // 如果之前没有保存页面js地址的话，进行一次保存，初始化并存下当前数据
      currentVersion = newVersion
      return false
    }
    if (currentVersion !== newVersion && newVersion) { // 如果当前页面js地址与新版本不一致，则进行更新
      currentVersion = newVersion
      return true
    }
  }

  setInterval(async () => {
    const needUpdateRes = await needUpdate()
    if (needUpdateRes)
      needUpdateApp = needUpdateRes
  }, 60 * 1000 * 10) // every 10 minutes check update

  onNuxtReady(() => {
    const router = useRouter()
    router.afterEach(() => {
      if (needUpdateApp)
        window.location.reload()
    })
  })
})
