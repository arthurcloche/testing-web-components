class MyComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin-top: 20px;
                }
            </style>
            <div>
                <h2>Web Component</h2>
                <p>This is a simple web component.</p>
            </div>
        `;
	}
}

customElements.define("my-component", MyComponent);
