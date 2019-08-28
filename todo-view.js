import { LitElement, html } from 'lit-element';

import { styles } from './styles';

const VisibilityFilters = {
	SHOW_ALL: 'All',
	SHOW_ACTIVE: 'Active',
	SHOW_COMPLETED: 'Completed'
};

class TodoView extends LitElement {
	static get styles() {
		return styles;
	}

	static get properties() {
		return {
			todos: { type: Array },
			filter: { type: String },
			task: { type: String }
		};
	}

	constructor() {
		super();
		this.todos = [];
		this.filter = VisibilityFilters.SHOW_ALL;
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
				${this.applyFilter(this.todos).map(
					todo => html`
						<div class="todo-item">
							<input
								type="checkbox"
								?checked="${todo.complete}"
								@change="${e => this.updateTodoStatus(todo, e.target.checked)}"
							/>
							${todo.task}
						</div>
					`
				)}
			</div>

			<!-- Needs to be changed!!! -->
			<fieldset
				class="visibility-filters"
				value="${this.filter}"
				@value-changed="${this.filterChanged}"
			>
				${Object.values(VisibilityFilters).map(
					filter => html`
						<input type="radio" value="${filter}" />
					`
				)}
			</fieldset>
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

	filterChanged(e) {
		this.filter = e.target.value;
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.complete);
	}

	applyFilter(todos) {
		switch (this.filter) {
			case VisibilityFilters.SHOW_ACTIVE:
				return todos.filter(todo => !todo.complete);
			case VisibilityFilters.SHOW_COMPLETED:
				return todos.filter(todo => todo.complete);
			default:
				return todos;
		}
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define('todo-view', TodoView);
