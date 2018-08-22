import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './style.css';

let key = 'microstates-todomvc';

let restore = () => JSON.parse(localStorage.getItem(key) || "null");
let save = value => localStorage.setItem(key, JSON.stringify(value));

let initial = restore() || {
  todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }]
};

render(<App value={initial} onChange={save} />, document.getElementById('root'))
