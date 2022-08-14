import * as Phaser from 'phaser'
import { worldSettings } from './settings'
import { initControls } from './controls'
import { TopState } from './states'
import { createPrimaryStateContainer } from './engine'

export class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene')

    this.topState = createPrimaryStateContainer(this, TopState)
  }

  topState: TopState

  /** Load all the images we need and assign them names */
  preload() {
    // Title image
    this.load.image('title', 'images/title.png')
    this.load.image('in-game', 'images/in-game.png')
  }

  create() {
    initControls(this)
    this.topState._init()
  }

  update(time: number, delta: number) {
    this.topState._update(time, delta)
    this.topState._postUpdate(time, delta)
    this.topState._stateChange()
  }
}

export const startGame = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: worldSettings.screenWidth,
    height: worldSettings.screenHeight,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'matter',
      matter: {
        // debug: {
        //   showBody: true
        // },
        gravity: {
          y: 0,
          x: 0
        }
      } as any
    },
    scene: [GameScene],
    input: {
      gamepad: true
    },
    parent: 'root'
  })
}
