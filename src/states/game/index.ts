import main from './main'
import start from './start'
import dead from './dead'

import { StateContainer, StateManager } from '../../engine'
import { MainStates } from '..'
import { worldSettings } from '../../settings'

export type GameChildStates = 'start' | 'main' | 'dead'

export class GameIndex extends StateContainer<'', MainStates, GameChildStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<'', MainStates>) {
    super(scene, stateManager, {
      childStateClasses: {
        start,
        main,
        dead
      },
      startingChildState: 'start'
    })
  }

  gameScreen!: Phaser.GameObjects.Image

  override init() {
    this.gameScreen = this.scene.add.image(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'in-game')
  }

  override update(time: number, delta: number) {}
  override postUpdate(time: number, delta: number): void {}
  override cleanup() {
    this.gameScreen.destroy()
  }
}

export default GameIndex
