import * as Phaser from 'phaser'
import { MainStates } from '..'
import { GameSettings, GameState } from '../../settings'
import { StateContainer, StateManager } from '../../engine'
import { textStyle } from '../styles'
import { Controls } from '../../controls'

export class GameOver extends StateContainer<GameSettings, GameState, Controls, '', MainStates> {
  constructor(
    scene: Phaser.Scene,
    gameSettings: GameSettings,
    gameState: GameState,
    controls: Controls,
    stateManager: StateManager<'', MainStates>
  ) {
    super(scene, gameSettings, gameState, controls, stateManager)
  }

  gameOverText?: Phaser.GameObjects.Text

  override init() {
    this.gameOverText = this.scene.add
      .text(this.gameSettings.fieldWidthMid, this.gameSettings.fieldHeightMid, 'GAME OVER', textStyle)
      .setOrigin(0.5, 0.5)

    this.controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('game')
    })
  }

  override update(time: number, delta: number): void {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.gameOverText?.destroy()
    this.controls.p1Shoot.removeAllListeners()
  }
}

export default GameOver
