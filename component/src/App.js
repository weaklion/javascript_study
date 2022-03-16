import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {

  setup () {
    this.$state = {
      isFilter: 0,
      items: [
        {
          id: 1,
          contents: 'item1',
          active: false,
        },
        {
          id: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template () {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  //mounted에서 자식 컴포넌트 마운트
  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');


    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this)
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this)
    });
  }

  get filteredItems () { //호출할 함수 바인딩
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
      (isFilter === 2 && !active) ||
      isFilter === 0);
  }

  addItem (contents) {
    const {items} = this.$state;
    const id = Math.max(0, ...items.map(v => v.id) + 1);
    const active = false;
    this.setState({
      items : [
        ...items,
        {id, contents, active}
      ]
    })
  }

  deleteItem (id) {
    const items = [ ...this.$state.items ];
    items.splice(items.findIndex(el => el.id === id), 1);
    this.setState({items});
  }

  toggleItem(id) {
    const items = [ ...this.$state.items ];
    const index = items.findIndex(el => el.id === id);
    items[index].active = !items[index].active;
    this.setState({items});
  }

  filterItem (isFilter) {
    this.setState({ isFilter });
  }



}