import { Button, Codicon } from '@hermes/plugin-sdk'
import { useEffect, useRef, useState } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

const ID = 'nous-discord-community'
const DISCORD_LOGIN_URL = 'https://discord.com/login'
const DISCORD_GUILD_URL = 'https://discord.com/channels/1053877538025386074'
const DISCORD_PARTITION = 'persist:hermes-nous-discord-community'
const DISCORD_USER_AGENT = navigator.userAgent.replace(/\sElectron\/[^\s]+/gi, '').replace(/\sHermes\/[^\s]+/gi, '')

function DiscordCommunityPane() {
  const hostRef = useRef(null)
  const webviewRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const webview = document.createElement('webview')
    webview.className = 'h-full w-full flex-1 bg-(--ui-bg-base)'
    webview.setAttribute('partition', DISCORD_PARTITION)
    webview.setAttribute('src', DISCORD_LOGIN_URL)
    webview.setAttribute('useragent', DISCORD_USER_AGENT)
    webview.setAttribute('webpreferences', 'contextIsolation=yes,nodeIntegration=no,sandbox=yes')

    let routedToGuild = false
    const onStart = () => { setLoading(true); setError(null) }
    const onStop = () => setLoading(false)
    const onNavigate = event => {
      if (!routedToGuild && event.url?.startsWith('https://discord.com/channels/@me')) {
        routedToGuild = true
        void webview.loadURL(DISCORD_GUILD_URL)
      }
    }
    const onFail = event => {
      if (event.errorCode === -3) return
      setLoading(false)
      setError(event.errorDescription || 'Discord could not be loaded.')
    }

    webview.addEventListener('did-start-loading', onStart)
    webview.addEventListener('did-stop-loading', onStop)
    webview.addEventListener('did-fail-load', onFail)
    webview.addEventListener('did-navigate', onNavigate)
    webview.addEventListener('did-navigate-in-page', onNavigate)
    webviewRef.current = webview
    host.replaceChildren(webview)
    const loadingFallback = window.setTimeout(onStop, 10_000)

    return () => {
      window.clearTimeout(loadingFallback)
      webview.removeEventListener('did-start-loading', onStart)
      webview.removeEventListener('did-stop-loading', onStop)
      webview.removeEventListener('did-fail-load', onFail)
      webview.removeEventListener('did-navigate', onNavigate)
      webview.removeEventListener('did-navigate-in-page', onNavigate)
      webview.remove()
      webviewRef.current = null
    }
  }, [])

  return jsxs('div', {
    className: 'relative flex h-full min-h-0 flex-col overflow-hidden bg-(--ui-bg-base)',
    children: [
      jsx('div', { ref: hostRef, className: 'absolute inset-0 flex' }),
      loading && !error ? jsxs('div', {
        className: 'pointer-events-none absolute inset-0 grid place-items-center bg-(--ui-bg-base)',
        children: [jsx(Codicon, { className: 'animate-spin', name: 'loading' }), jsx('span', { className: 'sr-only', children: 'Loading Discord' })]
      }) : null,
      error ? jsxs('div', {
        className: 'absolute inset-0 grid place-items-center bg-(--ui-bg-base) px-6 text-center',
        children: [
          jsx('p', { className: 'text-sm text-(--ui-text-secondary)', children: error }),
          jsx(Button, { className: 'mt-3', variant: 'secondary', onClick: () => { setError(null); setLoading(true); webviewRef.current?.reload() }, children: 'Retry' })
        ]
      }) : null
    ]
  })
}

export default {
  id: ID,
  name: 'Nous Discord Community',
  register(ctx) {
    ctx.register({
      id: 'community', area: 'panes', title: 'Nous Discord',
      data: { placement: 'right', dock: { pane: 'workspace', pos: 'right' }, width: '520px', minWidth: '360px', lifecycleKeepAlive: true },
      render: () => jsx(DiscordCommunityPane, {})
    })
  }
}
