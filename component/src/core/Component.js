export default class Component {
  $target;
  $state;
  $props;
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {};
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  } 
  setEvent() {}
  mounted () {};
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  //이벤트 버블링 추상화
  addEvent(eventType, selector, callback) {
    const children = [ ...this.$target.querySelectorAll(selector)];
    //selector에 명시된 것 보다 더 하위 요소가 선택될 시 closest을 이용해서 처리한다.
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
        //target이 없다면 
      if(!isTarget(event.target)) return false; 
      callback(event);
    })
  }  
}