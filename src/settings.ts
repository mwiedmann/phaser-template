const baseWorldSettings = {
  screenWidth: 1024,
  screenHeight: 768,
  gameCameraZoom: 1
}

export const gameSettings = {
  playerLives: 3
}

export const worldSettings = {
  ...baseWorldSettings,
  fieldWidthMid: baseWorldSettings.screenWidth / 2,
  fieldWidth3Quarters: baseWorldSettings.screenWidth - baseWorldSettings.screenWidth / 4,
  fieldWidth1Quarter: baseWorldSettings.screenWidth / 4,
  fieldHeightMid: baseWorldSettings.screenHeight / 2,
  fieldHeight3Quarters: baseWorldSettings.screenHeight - baseWorldSettings.screenHeight / 4,
  fieldHeight1Quarter: baseWorldSettings.screenHeight / 4,
  worldBoundWidth: baseWorldSettings.screenWidth,
  worldBoundHeight: baseWorldSettings.screenHeight
}
