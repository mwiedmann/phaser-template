import * as Phaser from 'phaser'
import { StateManager } from './types'

export abstract class StateContainer<
  TParentStates extends string = '',
  TSiblingStates extends string = '',
  TChildStates extends string = ''
> {
  constructor(
    protected scene: Phaser.Scene,
    protected stateManager: StateManager<TParentStates, TSiblingStates>,
    childConfig?: {
      childStateClasses: Record<TChildStates, Class>
      startingChildState: TChildStates
    }
  ) {
    if (childConfig) {
      const childStateManager: StateManager<TSiblingStates, TChildStates> = {
        stateChange: (state: TChildStates) => {
          this.log(`StateChange from:${this.childState} to:${state}`)
          this.nextChildState = state
        },
        exitState: (state: TSiblingStates) => {
          this.log(`ExitState to:${state}`)
          this.stateManager.stateChange(state)
        }
      }

      this.childStateInstances = Object.entries(childConfig.childStateClasses).reduce(
        // (prev: Record<TChildStates, StateContainer<TSiblingStates, TChildStates>>, [k, v]: [TChildStates, any]) => {
        // TODO: Can't get the types quite right here but the code works
        (prev: any, [siblingStateKey, siblingClass]: [any, any]) => {
          prev[siblingStateKey] = new siblingClass(scene, childStateManager) as StateContainer<
            TSiblingStates,
            TChildStates
          >
          return prev
        },
        {} as Record<TChildStates, StateContainer<TSiblingStates, TChildStates>>
      )

      this.startingChildState = childConfig.startingChildState
    }
  }

  startingChildState: TChildStates | undefined = undefined
  nextChildState: TChildStates | undefined = undefined
  childState: TChildStates | undefined = undefined
  childStateInstances?: Record<TChildStates, StateContainer<TSiblingStates, TChildStates>>

  get childInstance(): StateContainer<TSiblingStates, TChildStates> | undefined {
    if (this.childState && this.childStateInstances) {
      return this.childStateInstances[this.childState]
    }
    return undefined
  }

  log(...args: any[]) {
    console.log(this.constructor.name, ...args)
  }

  _init() {
    this.log('_init')
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
      this.log(`Changing state from:${this.childState} to:${this.nextChildState}`)
      this.childInstance?._cleanup()
      this.childState = this.nextChildState
      this.childInstance?._init()
    }
  }

  _cleanup() {
    this.log('_cleanup')
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
