export interface GleamEvent {
  type: string
  action: {
    id: string
    title: string
  }
  campaign: {
    name: string
    key: string
  }
}

export function useGleam({
  gleamLink,
  onEnteredTask,
}: {
  gleamLink: string
  onEnteredTask: (event: GleamEvent) => void
}) {
  function loadGleam() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
    (function(d, t){
if(window.location.hash!='#gleam'&&(''+document.cookie).match(/(^|;)\s*GleamCnfsS=X($|;)/)){return;}

var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
g.src = "${gleamLink}"; s.parentNode.insertBefore(g, s);
}(document, "script"));
`
    document.body.appendChild(script)
  }
  window.onGleamEvent = (event: GleamEvent) => {
    // eslint-disable-next-line no-console
    console.log('Gleam Widget Callback triggered', event)
    if (event.type === 'loaded') {
      // eslint-disable-next-line no-console
      console.log(
        `The widget has loaded for campaign ${event.campaign.name
        } (${event.campaign.key})`,
      )
    }
    else if (event.type === 'entered') {
      // eslint-disable-next-line no-console
      console.log(
        `The user has entered ${event.action.title
        } (${event.action.id})`
        + ` in ${event.campaign.name
        } (${event.campaign.key})`,
        event,
      )
      onEnteredTask(event)
    }
  }
  onMounted(async () => {
    await nextTick()
    loadGleam()
  })
  //   useHead({
  //     script: [
  //       {
  //         innerHTML: `
  //       (function(d, t){
  // if(window.location.hash!='#gleam'&&(''+document.cookie).match(/(^|;)\s*GleamCnfsS=X($|;)/)){return;}

  // var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  // g.src = "https://widget.gleamjs.io/CnfsS/ol.js"; s.parentNode.insertBefore(g, s);
  // }(document, "script"));
  //       `,
  //         type: 'text/javascript',
  //         tagPosition: 'head',
  //       },
  //     ],
  //   })
  function handleGleam() {
    // @ts-expect-error cannot find name Gleam
    Gleam.openPopupCampaign()
  }

  return {
    handleGleam,
  }
}

// export const useGleam = createSharedComposable(_useGleam)
