export type StateManager<TParentStates extends string = '', TSiblingStates extends string = ''> = {
  exitState: (state: TParentStates) => void
  stateChange: (state: TSiblingStates) => void
}

export type StateContainerClass<
  T,
  TGameSettings extends Record<string, any>,
  TGameState extends Record<string, any>,
  TControls extends Record<string, any>,
  TParentStates extends string = '',
  TSiblingStates extends string = '',
  TChildStates extends string = ''
> = {
  new (
    scene: Phaser.Scene,
    gameSettings: TGameSettings,
    gameState: TGameState,
    controls: TControls,
    stateManager: StateManager<TParentStates, TSiblingStates>,
    childConfig?: {
      childStateClasses: Record<TChildStates, Class>
      startingChildState: TChildStates
    }
  ): T
}
