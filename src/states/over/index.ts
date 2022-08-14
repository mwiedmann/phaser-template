import * as Phaser from 'phaser'
import { MainStates } from '..'
import { controls } from '../../controls'
import { worldSettings } from '../../settings'
import { StateContainer, StateManager } from '../../engine'
import { textStyle } from '../styles'

export class GameOver extends StateContainer<'', MainStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<'', MainStates>) {
    super(scene, stateManager)
  }

  gameOverText?: Phaser.GameObjects.Text

  override init() {
    this.gameOverText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'GAME OVER', textStyle)
      .setOrigin(0.5, 0.5)

    controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('game')
    })
  }

  override update(time: number, delta: number): void {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.gameOverText?.destroy()
    controls.p1Shoot.removeAllListeners()
  }
}

export default GameOver
