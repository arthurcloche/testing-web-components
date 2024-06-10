class MyP5Sketch extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		const style = document.createElement("style");
		style.textContent = `
        canvas {
          display: block !important;
          visibility: visible !important;
        }
      `;
		this.shadowRoot.appendChild(style);
	}

	static get observedAttributes() {
		return ["bg-color", "width", "height"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "bg-color") {
			this.bgColor = newValue;
		} else if (name === "width") {
			this.width = newValue;
		} else if (name === "height") {
			this.height = newValue;
		}
	}

	connectedCallback() {
		this.loadP5Script().then(() => {
			this.initP5();
		});
	}

	loadP5Script() {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js";
			script.onload = resolve;
			script.onerror = reject;
			this.shadowRoot.appendChild(script);
		});
	}

	initP5() {
		const sketch = (p) => {
			p.setup = () => {
				const canvas = p.createCanvas(
					parseInt(this.width) || 200,
					parseInt(this.height) || 200,
				);
				p.background(this.bgColor || 200);
				// Append the canvas to the shadow DOM and ensure it is visible
				canvas.elt.style.display = "block";
				this.shadowRoot.appendChild(canvas.elt);
			};

			p.draw = () => {
				p.ellipse(p.width / 2, p.height / 2, 50, 50);
			};
		};

		new p5(sketch);
	}
}

customElements.define("my-p5-sketch", MyP5Sketch);

class P5 extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		const style = document.createElement("style");
		style.textContent = `
        canvas {
          display: block !important;
          visibility: visible !important;
        }
      `;
		this.shadowRoot.appendChild(style);
	}

	static get observedAttributes() {
		return ["bg-color", "width", "height", "setup", "draw"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "bg-color") {
			this.bgColor = newValue;
		} else if (name === "width") {
			this.width = newValue;
		} else if (name === "height") {
			this.height = newValue;
		} else if (name === "setup") {
			this.customSetup = new Function("p", newValue);
		} else if (name === "draw") {
			this.customDraw = new Function("p", newValue);
		}
	}

	connectedCallback() {
		this.loadP5Script().then(() => {
			this.initP5();
		});
	}

	loadP5Script() {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js";
			script.onload = resolve;
			script.onerror = reject;
			this.shadowRoot.appendChild(script);
		});
	}

	initP5() {
		const sketch = (p) => {
			p.setup = () => {
				if (this.customSetup) {
					this.customSetup(p);
				} else {
					const canvas = p.createCanvas(
						parseInt(this.width) || 200,
						parseInt(this.height) || 200,
					);
					p.background(this.bgColor || 200);
				}
			};

			p.draw = () => {
				if (this.customDraw) {
					this.customDraw(p);
				} else {
					p.ellipse(p.width / 2, p.height / 2, 50, 50);
				}
			};
		};

		new p5(sketch, this.shadowRoot);
	}
}

customElements.define("my-p5", P5);
