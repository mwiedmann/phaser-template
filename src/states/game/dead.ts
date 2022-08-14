import * as Phaser from 'phaser'
import { GameChildStates } from '.'
import { MainStates } from '..'
import { controls } from '../../controls'
import { worldSettings } from '../../settings'
import { StateContainer, StateManager } from '../../engine'
import { textStyle } from '../styles'

export class Dead extends StateContainer<MainStates, GameChildStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<MainStates, GameChildStates>) {
    super(scene, stateManager)
  }

  startText?: Phaser.GameObjects.Text
  continueText?: Phaser.GameObjects.Text

  continueHandler?: () => void
  quitHandler?: () => void

  override init() {
    this.startText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'You died', textStyle)
      .setOrigin(0.5, 0.5)
    this.continueText = this.scene.add
      .text(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid + 50, '[shift] to continue, X to quit', textStyle)
      .setOrigin(0.5, 0.5)

    this.continueHandler = () => {
      this.stateManager.stateChange('start')
    }
    controls.p1Shoot.on('down', this.continueHandler)

    this.quitHandler = () => {
      this.stateManager.exitState('title')
    }
    controls.p1Special.on('down', this.quitHandler)
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.startText?.destroy()
    this.continueText?.destroy()
    controls.p1Shoot.off('down', this.continueHandler)
    controls.p1Special.off('down', this.quitHandler)
  }
}

export default Dead
