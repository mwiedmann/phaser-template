import * as Phaser from 'phaser'
import { MainStates } from '..'
import { controls } from '../../controls'
import { worldSettings } from '../../settings'
import { StateContainer, StateManager } from '../../engine'

export class Title extends StateContainer<'', MainStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<'', MainStates>) {
    super(scene, stateManager)
  }

  titleScreen?: Phaser.GameObjects.Image

  override init() {
    this.titleScreen = this.scene.add.image(worldSettings.fieldWidthMid, worldSettings.fieldHeightMid, 'title')

    controls.p1Shoot.on('down', () => {
      this.stateManager.stateChange('game')
    })
  }

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {
    this.titleScreen?.destroy()
    controls.p1Shoot.removeAllListeners()
  }
}

export default Title
