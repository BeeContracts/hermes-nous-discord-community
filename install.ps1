$ErrorActionPreference = 'Stop'
if ($env:HERMES_HOME) { $HermesHome = $env:HERMES_HOME } else {
  $HermesCommand = Get-Command hermes -ErrorAction SilentlyContinue
  if ($HermesCommand -and (Split-Path $HermesCommand.Source -Leaf) -ieq 'hermes.exe') {
    $HermesHome = Split-Path (Split-Path $HermesCommand.Source -Parent) -Parent
  } else { $HermesHome = Join-Path $HOME '.hermes' }
}
$Destination = Join-Path $HermesHome 'desktop-plugins\nous-discord-community'
New-Item -ItemType Directory -Force -Path $Destination | Out-Null
Copy-Item -Force (Join-Path $PSScriptRoot 'plugin.js') (Join-Path $Destination 'plugin.js')
Write-Host "Installed to $Destination"
Write-Host "Run 'Reload desktop plugins' in Hermes Desktop."
