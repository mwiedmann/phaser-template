import * as Phaser from 'phaser'
import { MainStates } from '..'
import { Controls } from '../../controls'
import { StateContainer, StateManager } from '../../engine'
import { GameSettings, GameState } from '../../settings'

export class Title extends StateContainer<GameSettings, GameState, Controls, '', MainStates> {
  constructor(
    scene: Phaser.Scene,
    gameSettings: GameSettings,
    gameState: GameState,
    controls: Controls,
    stateManager: StateManager<'', MainStates>
  ) {
    super(scene, gameSettings, gameState, controls, stateManager)
  }

  titleScreen?: Phaser.GameObjects.Image

  override init() {
    this.titleScreen = this.scene.add.image(this.gameSettings.fieldWidthMid, this.gameSettings.fieldHeightMid, 'title')

    this.controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('game')
    })
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.titleScreen?.destroy()
    this.controls.p1Shoot.removeAllListeners()
  }
}

export default Title
