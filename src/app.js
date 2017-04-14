import './../styles/styles.scss';

import View from './view';
import Controller from './controller';
import Model from './model';
import Store from './store';
import Template from './template';

/**
 * Sets up a brand new Todo list.
 *
 * @param {string} name The name of your new to do list.
 */
function Todo(name) {
  this.storage = new Store(name)
  this.model = new Model(this.storage)
  this.template = new Template()
  this.view = new View(this.template)
  this.controller = new Controller(this.model, this.view)
}

function onLoad() {
  var todo = new Todo('todos-vanillajs')
  todo.controller.setView(document.location.hash)
}

export { onLoad };