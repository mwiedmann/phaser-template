import * as Phaser from 'phaser'
import { GameChildStates } from '.'
import { MainStates } from '..'
import { worldSettings } from '../../settings'
import { StateContainer, StateManager } from '../../engine'
import { textStyle } from '../styles'

export class Start extends StateContainer<MainStates, GameChildStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<MainStates, GameChildStates>) {
    super(scene, stateManager)
  }

  startText!: Phaser.GameObjects.Text
  countText!: Phaser.GameObjects.Text
  countStopTime: number = 0

  override init() {
    this.startText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'Game:Main Starting in', textStyle)
      .setOrigin(0.5, 0.5)
    this.countText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid + 50, '3', textStyle)
      .setOrigin(0.5, 0.5)
    this.countStopTime = this.scene.time.now + 3000
  }

  override update(time: number, delta: number) {
    let remainingTime = (this.countStopTime - time) / 1000

    if (remainingTime < 0) {
      this.stateManager.stateChange('main')
    } else {
      this.countText.text = `${Math.ceil(remainingTime).toFixed(0)}`
    }
  }

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.startText.destroy()
    this.countText.destroy()
  }
}

export default Start
