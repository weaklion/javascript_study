import { observable } from "./observer.js";

export class Store {
  #state; //private
  #mutations; //private
  #actions;  //private

  state = {};

  constructor({ state, mutations, actions}) {
    this.#state = observable(state); 
    this.#mutations = mutations;
    this.#actions = actions;

    //state를 직접적으로 수정하지 못하도록 정의.
    Object.keys(state).forEach(key => {
      Object.defineProperty(
        this.state,
        key,
        { get : () => this.#state[key]},
      )
    })
  }

  commit (action, payload) {
    //state는 오직 commit을 통해서만 수정이 가능하다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {

    return this.#actions[action]({
      state : this.#state,
      commit : this.commit.bind(this),
      dispatch : this.dispatch.bind(this),
    }, payload);
  }


}