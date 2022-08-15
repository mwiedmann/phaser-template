export type GameSettings = {
  screenWidth: number
  screenHeight: number
  gameCameraZoom: number
  fieldWidthMid: number
  fieldWidth3Quarters: number
  fieldWidth1Quarter: number
  fieldHeightMid: number
  fieldHeight3Quarters: number
  fieldHeight1Quarter: number
  worldBoundWidth: number
  worldBoundHeight: number
}

export type GameState = {
  numDeaths: number
}

const baseWorldSettings = {
  screenWidth: 1024,
  screenHeight: 768,
  gameCameraZoom: 1
}

export const gameState: GameState = { numDeaths: 0 }

export const gameSettings: GameSettings = {
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
