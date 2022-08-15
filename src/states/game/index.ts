import main from './main'
import start from './start'
import dead from './dead'

import { StateContainer, StateManager } from '../../engine'
import { MainStates } from '..'
import { GameSettings, GameState } from '../../settings'
import { Controls } from '../../controls'

export type GameChildStates = 'start' | 'main' | 'dead'

export class GameIndex extends StateContainer<GameSettings, GameState, Controls, '', MainStates, GameChildStates> {
  constructor(
    scene: Phaser.Scene,
    gameSettings: GameSettings,
    gameState: GameState,
    controls: Controls,
    stateManager: StateManager<'', MainStates>
  ) {
    super(scene, gameSettings, gameState, controls, stateManager, {
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
    this.gameScreen = this.scene.add.image(this.gameSettings.fieldWidthMid, this.gameSettings.fieldHeightMid, 'in-game')
  }

  override update(time: number, delta: number) {}
  override postUpdate(time: number, delta: number): void {}
  override cleanup() {
    this.gameScreen.destroy()
  }
}

export default GameIndex
