# Nous Discord Community for Hermes Desktop

A local Hermes Desktop plugin that opens the official Nous Research Discord web client in a native, draggable Hermes pane.

You operate Discord directly. The plugin does **not** automate your account, read your credentials, send messages for you, use a bot token, or expose Discord APIs to Hermes Agent.

## Features

- Official Discord web UI inside Hermes Desktop
- Opens the Nous Research server after login
- Persistent, per-user Chromium partition for login state
- Pane remains mounted while hidden or tabbed, avoiding needless reauthentication
- Sandboxed guest: `contextIsolation=yes`, `nodeIntegration=no`, `sandbox=yes`
- Chrome-compatible user agent for Discord's embedded-browser login checks
- No build step or third-party package dependencies

## Install

In Hermes Desktop, open **Settings → Plugins**, reveal the Desktop plugins folder, create `nous-discord-community`, copy `plugin.js` into it, then run **Reload desktop plugins** from the command palette.

Final path:

```text
<HERMES_HOME>/desktop-plugins/nous-discord-community/plugin.js
```

Windows: run `.\install.ps1` from this repository. macOS/Linux: run `./install.sh`.

## Privacy and security

Login state is owned by Electron/Chromium in `persist:hermes-nous-discord-community`. It is not part of this repository or plugin folder. Never upload a Hermes profile, Chromium `Partitions` directory, cookies database, Local Storage, or screenshots containing private chats.

The source contains only the public Nous Discord guild ID (`1053877538025386074`). It contains no user IDs, emails, passwords, cookies, access tokens, refresh tokens, bot tokens, or personal paths.

To sign out, use Discord's own **Log Out** action. To uninstall, delete `<HERMES_HOME>/desktop-plugins/nous-discord-community/` and reload Desktop plugins.

## Troubleshooting

- Missing plugin: verify the folder name, then run **Reload desktop plugins**.
- Repeated login: update Hermes Desktop so its bundled Chromium is current.
- Blank pane: resize it, then reload Desktop plugins.

## Disclaimer

Independently maintained; not an official Discord client. Discord and its trademarks belong to Discord Inc. Nous Research and Hermes Agent retain their trademarks.

## License

MIT — see [LICENSE](LICENSE).
