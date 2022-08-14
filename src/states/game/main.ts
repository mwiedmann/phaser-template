import * as Phaser from 'phaser'
import { GameChildStates } from '.'
import { MainStates } from '..'
import { controls } from '../../controls'
import { worldSettings } from '../../settings'
import { StateContainer, StateManager } from '../../engine'
import { textStyle } from '../styles'

export class Main extends StateContainer<MainStates, GameChildStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<MainStates, GameChildStates>) {
    super(scene, stateManager)
  }

  gameMainText!: Phaser.GameObjects.Text

  override init() {
    this.gameMainText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'You are in the Game:Main state', textStyle)
      .setOrigin(0.5, 0.5)

    controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('dead')
    })
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.gameMainText?.destroy()
    controls.p1Shoot.removeAllListeners()
  }
}

export default Main
