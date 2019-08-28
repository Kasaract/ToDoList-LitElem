import { LitElement, html } from 'lit-element';

import { styles } from './styles';

class TodoView extends LitElement {
	static get styles() {
		return styles;
	}

	static get properties() {
		return {
			todos: { type: Array },
			task: { type: String }
		};
	}

	constructor() {
		super();
		this.todos = [];
		this.task = '';
	}

	render() {
		return html`
			<div class="input-layout" @keyup="${this.shortcutListener}">
				<input
					type="text"
					placeholder="Task"
					value="${this.task}"
					@change="${this.updateTask}"
				/>

				<button theme="primary" @click="${this.addTodo}">
					Add Todo
				</button>
			</div>

			<div class="todos-list">
				${this.todos.map(
					todo => html`
						<div class="todo-item">
							<label>
								<input
									type="checkbox"
									?checked="${todo.complete}"
									@change="${e =>
										this.updateTodoStatus(todo, e.target.checked)}"
								/>${todo.task}
							</label>
						</div>
					`
				)}
			</div>

			<button @click="${this.clearCompleted}">
				Clear Completed
			</button>
		`;
	}

	addTodo() {
		if (this.task) {
			this.todos = [
				...this.todos,
				{
					task: this.task,
					complete: false
				}
			];
			this.task = '';
		}
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addTodo();
		}
	}

	updateTask(e) {
		this.task = e.target.value;
	}

	updateTodoStatus(updatedTodo, complete) {
		this.todos = this.todos.map(todo =>
			updatedTodo === todo ? { ...updatedTodo, complete } : todo
		);
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.complete);
	}

	// createRenderRoot() {
	// 	return this;
	// }
}

customElements.define('todo-view', TodoView);
