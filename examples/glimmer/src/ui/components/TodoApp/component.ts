import microstates from 'microstates';
import Component, { tracked } from '@glimmer/component';
import TodoModel, { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'microstates-todomvc';
import Navigo from 'navigo';
import { ENTER } from '../../../utils/keys';

const router = new Navigo(null, true);
const filterStates = { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE };

export default class TodoApp extends Component {
  /** Microstate */
  @tracked ms;

  filterStates = filterStates;

  private localStorageKey = 'glimmer:todoDB';

  constructor(options) {
    super(options);

    this.ms = microstates(TodoModel, {
      filter: SHOW_ALL,
      todos: this.getTodosFromLocalStore()
    });

    this.setupRouter()
  }

  getTodosFromLocalStore() {
    let todos = [];

    const storeValue = localStorage.getItem(this.localStorageKey);
    if (storeValue) {
      todos = JSON.parse(storeValue).todos;
    }
    return todos
  }

  setupRouter() {
    const updateFilter = (text = SHOW_ALL) => this.updateState(this.ms.filter.set, text);

    router
      .on({
        '/': updateFilter,
        '/active': () => updateFilter(SHOW_ACTIVE),
        '/completed': () => updateFilter(SHOW_COMPLETED)
      })
      .notFound(updateFilter)
      .resolve();
  };

  addTodo(event) {
    const { which, target: { value: newTodoText } } = event;
    if (which !== ENTER) {
      return;
    }
    this.updateState(this.ms.addTodo, newTodoText);
    event.target.value = '';
  }

  updateState(fn, args?) {
    this.ms = fn(args);
    localStorage.setItem(this.localStorageKey, JSON.stringify({ todos: this.ms.state.todos }));
  }

}
