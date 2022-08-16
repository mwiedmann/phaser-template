import * as Phaser from 'phaser'
import { StateContainerClass, StateManager } from './types'

export abstract class StateContainer<
  TGameSettings extends Record<string, any>,
  TGameState extends Record<string, any>,
  TControls extends Record<string, any>,
  TParentStates extends string = '',
  TSiblingStates extends string = '',
  TChildStates extends string = '',
  TGrandchildStates extends string = ''
> {
  constructor(
    protected scene: Phaser.Scene,
    protected gameSettings: TGameSettings,
    protected gameState: TGameState,
    protected controls: TControls,
    protected stateManager: StateManager<TParentStates, TSiblingStates>,
    childConfig?: {
      childStateClasses: Record<
        TChildStates,
        StateContainerClass<
          StateContainer<TGameSettings, TGameState, TControls, TSiblingStates, TChildStates, TGrandchildStates>,
          TGameSettings,
          TGameState,
          TControls,
          TSiblingStates,
          TChildStates
        >
      >
      startingChildState: TChildStates
    }
  ) {
    // If this state container has child states, instantiate them
    if (childConfig) {
      const childStateManager: StateManager<TSiblingStates, TChildStates> = {
        stateChange: (state: TChildStates) => {
          this.debug(`StateChange from:${this.childState} to:${state}`)
          this.nextChildState = state
        },
        exitState: (state: TSiblingStates) => {
          this.debug(`ExitState to:${state}`)
          this.stateManager.stateChange(state)
        }
      }

      // Go through the child state classes, instantiate them, and store the class instances
      const keys = Object.keys(childConfig.childStateClasses) as TChildStates[]
      this.childStateInstances = keys.reduce((prev, nextKey) => {
        const siblingClass = childConfig.childStateClasses[nextKey]
        prev[nextKey] = new siblingClass(scene, gameSettings, gameState, controls, childStateManager)
        return prev
      }, {} as Record<TChildStates, StateContainer<TGameSettings, TGameState, TControls, TSiblingStates, TChildStates, TGrandchildStates>>)

      this.startingChildState = childConfig.startingChildState
    }
  }

  startingChildState: TChildStates | undefined = undefined
  nextChildState: TChildStates | undefined = undefined
  childState: TChildStates | undefined = undefined
  childStateInstances?: Record<
    TChildStates,
    StateContainer<TGameSettings, TGameState, TControls, TSiblingStates, TChildStates, TGrandchildStates>
  >

  get childInstance():
    | StateContainer<TGameSettings, TGameState, TControls, TSiblingStates, TChildStates, TGrandchildStates>
    | undefined {
    if (this.childState && this.childStateInstances) {
      return this.childStateInstances[this.childState]
    }
    return undefined
  }

  log(...args: any[]) {
    console.log(this.constructor.name, ...args)
  }

  debug(...args: any[]) {
    if (this.gameSettings.debug) {
      this.log(...args)
    }
  }

  _init() {
    this.debug('_init')
    // Transition to the starting state
    this.nextChildState = this.startingChildState
    this.childState = this.startingChildState

    this.init()
    this.childInstance?._init()
  }

  _update(time: number, delta: number) {
    this.update(time, delta)
    this.childInstance?._update(time, delta)
  }

  _postUpdate(time: number, delta: number) {
    this.childInstance?._postUpdate(time, delta)
    this.postUpdate(time, delta)
  }

  _stateChange() {
    this.childInstance?._stateChange()
    if (this.nextChildState !== this.childState) {
      this.debug(`Changing state from:${this.childState} to:${this.nextChildState}`)
      this.childInstance?._cleanup()
      this.childState = this.nextChildState
      this.childInstance?._init()
    }
  }

  _cleanup() {
    this.debug('_cleanup')
    this.childInstance?._cleanup()
    this.cleanup()

    // Clear state info
    this.nextChildState = undefined
    this.childState = undefined
  }

  abstract init(): void
  abstract update(time: number, delta: number): void
  abstract postUpdate(time: number, delta: number): void
  abstract cleanup(): void
}
