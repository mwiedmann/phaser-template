import * as Phaser from 'phaser'

export type Controls = {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  p1Shoot: Phaser.Input.Keyboard.Key
  p1Special: Phaser.Input.Keyboard.Key
  p1Death: Phaser.Input.Keyboard.Key
  pause: Phaser.Input.Keyboard.Key
  mute: Phaser.Input.Keyboard.Key
}

export const initControls = (scene: Phaser.Scene): Controls => ({
  cursors: scene.input.keyboard.createCursorKeys(),
  p1Shoot: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
  p1Special: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
  p1Death: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
  pause: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
  mute: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
})
