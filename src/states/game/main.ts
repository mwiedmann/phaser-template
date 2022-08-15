import * as Phaser from 'phaser'
import { GameChildStates } from '.'
import { MainStates } from '..'
import { Controls } from '../../controls'
import { StateContainer, StateManager } from '../../engine'
import { GameSettings, GameState } from '../../settings'
import { textStyle } from '../styles'

export class Main extends StateContainer<GameSettings, GameState, Controls, MainStates, GameChildStates> {
  constructor(
    scene: Phaser.Scene,
    gameSettings: GameSettings,
    gameState: GameState,
    controls: Controls,
    stateManager: StateManager<MainStates, GameChildStates>
  ) {
    super(scene, gameSettings, gameState, controls, stateManager)
  }

  gameMainText!: Phaser.GameObjects.Text

  override init() {
    this.gameMainText = this.scene.add
      .text(
        this.gameSettings.fieldWidthMid,
        this.gameSettings.fieldHeightMid,
        'You are in the Game:Main state',
        textStyle
      )
      .setOrigin(0.5, 0.5)

    this.controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('dead')
    })
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.gameMainText?.destroy()
    this.controls.p1Shoot.removeAllListeners()
  }
}

export default Main
