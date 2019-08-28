import { LitElement, html, css } from 'lit-element';

import { styles } from './styles';

class TodoList extends LitElement {

  static get styles() {
    return styles
  }

  static get properties() {
    return {
      list: { type: Array },
      newItem: { type: String },
      count: { type: Number }
    }
  }

  constructor() {
    super();
    this.list = [
      [1, "First item"],
      [2, "Second item"]
    ];
    this.newItem = "";
    this.count = this.list.length;
  }

  render() {
    return html`
      <h1>To-Do List</h1>
      <ol>
        ${this.list.map((item) => {
          return html`
            <li>${item[1]}</li>
          `
        })}
      </ol>
      <div id="listform" @keyup="${this.shortcutListener  }">
        <input type="text" value="${this.newItem}" placeholder="Add new item" @change="${(e) => {
          this.newItem = e.target.value;
          }}"/>
        <button type="button" @click=${(e) => {
          e.preventDefault();
          this.count++;
          this.list.push([this.count, this.newItem]);
          this.newItem = "";
          document.getElementById("listform").reset();
          }}>Add item</button>

      </div>
    `;
  }

}

customElements.define("todo-list", TodoList);