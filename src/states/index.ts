import * as Phaser from 'phaser'

import game from './game'
import over from './over'
import title from './title'
import { StateContainer, StateManager } from '../engine'

/*
TOPSTATE --
 -- TITLE <P='', S=TITLE|GAME|OVER, C=''>
 -- GAME <P='', S=TITLE|GAME|OVER, C=START|MAIN|DEAD>
   -- START <P=TITLE|GAME|OVER, S=START|MAIN|DEAD, C=''>
   -- MAIN <P=TITLE|GAME|OVER, S=START|MAIN|DEAD, C=''>
   -- DEAD <P=TITLE|GAME|OVER, S=START|MAIN|DEAD, C=''>
 -- OVER <P='', S=TITLE|GAME|OVER, C=''>
*/

export type MainStates = 'title' | 'game' | 'over'

export class TopState extends StateContainer<'', '', MainStates> {
  constructor(scene: Phaser.Scene, stateManager: StateManager<'', ''>) {
    super(scene, stateManager, {
      childStateClasses: {
        game,
        over,
        title
      },
      startingChildState: 'title'
    })
  }

  override init() {}

  override update(time: number, delta: number) {}

  override postUpdate(time: number, delta: number): void {}

  override cleanup() {}
}