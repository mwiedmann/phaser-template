import * as Phaser from 'phaser'
import { StateContainerClass, StateManager } from './types'

export const createPrimaryStateContainer = <
  T,
  TGameSettings extends Record<string, any> = {},
  TGameState extends Record<string, any> = {},
  TControls extends Record<string, any> = {}
>(
  scene: Phaser.Scene,
  gameSettings: TGameSettings,
  gameState: TGameState,
  controls: TControls,
  primary: StateContainerClass<T, TGameSettings, TGameState, TControls>
): T => {
  // State changes should not be called on the primary state container
  const stateManager: StateManager = {
    stateChange: (state: unknown) => {
      console.error('Illegal stateChange called in primary state container', state)
    },
    exitState: (state: unknown) => {
      console.error('Illegal exitState called in primary state container', state)
    }
  }

  return new primary(scene, gameSettings, gameState, controls, stateManager)
}
