import * as Phaser from 'phaser'
import { GameChildStates } from '.'
import { MainStates } from '..'
import { Controls } from '../../controls'
import { StateContainer, StateManager } from '../../engine'
import { GameSettings, GameState } from '../../settings'
import { textStyle } from '../styles'

export class Dead extends StateContainer<GameSettings, GameState, Controls, MainStates, GameChildStates> {
  constructor(
    scene: Phaser.Scene,
    gameSettings: GameSettings,
    gameState: GameState,
    controls: Controls,
    stateManager: StateManager<MainStates, GameChildStates>
  ) {
    super(scene, gameSettings, gameState, controls, stateManager)
  }

  startText?: Phaser.GameObjects.Text
  continueText?: Phaser.GameObjects.Text

  continueHandler?: () => void
  quitHandler?: () => void

  override init() {
    this.startText = this.scene.add
      .text(this.gameSettings.fieldWidthMid, this.gameSettings.fieldHeightMid, 'You died', textStyle)
      .setOrigin(0.5, 0.5)
    this.continueText = this.scene.add
      .text(
        this.gameSettings.fieldWidthMid,
        this.gameSettings.fieldHeightMid + 50,
        '[shift] to continue, X to quit',
        textStyle
      )
      .setOrigin(0.5, 0.5)

    this.continueHandler = () => {
      this.stateManager.stateChange('start')
    }
    this.controls.p1Shoot.on('down', this.continueHandler)

    this.quitHandler = () => {
      this.stateManager.exitState('title')
    }
    this.controls.p1Special.on('down', this.quitHandler)
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.startText?.destroy()
    this.continueText?.destroy()
    this.controls.p1Shoot.off('down', this.continueHandler)
    this.controls.p1Special.off('down', this.quitHandler)
  }
}

export default Dead
