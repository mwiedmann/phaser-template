import * as Phaser from 'phaser'
import { StateContainer } from './StateContainer'
import { StateManager } from './types'

export const createPrimaryStateContainer = <T>(
  scene: Phaser.Scene,
  primary: { new (scene: Phaser.Scene, stateManager: StateManager): T }
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

  return new primary(scene, stateManager)
}
