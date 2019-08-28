import { LitElement, css } from 'lit-element';

export const styles = css`
	todo-view {
		display: block;
		max-width: 800px;
		margin: 0 auto;
	}

	todo-view .input-layout {
		width: 100%;
		display: flex;
	}

	todo-view .input-layout input {
		flex: 1;
		margin-right: var(--spacing);
	}

	todo-view .todos-list {
		margin-top: var(--spacing);
	}
`;
