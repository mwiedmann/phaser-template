export type StateManager<TParentStates extends string = '', TSiblingStates extends string = ''> = {
  exitState: (state: TParentStates) => void
  stateChange: (state: TSiblingStates) => void
}
