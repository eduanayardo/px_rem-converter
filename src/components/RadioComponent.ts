// src/components/CheckboxComponent.ts

export class RadioComponent {
	private radioId: string;
	private radioLabel: string;
	private radioName: string;
	private radioChecked: boolean;
	private container: HTMLElement;
	private change: void;

	constructor(radioId: string, radioLabel: string, radioName: string, radioChecked: boolean, containerId: string, change: void) {
		this.radioId = radioId;
		this.radioLabel = radioLabel;
		this.radioName = radioName;
		this.radioChecked = radioChecked;
		this.container = document.getElementById(containerId) as HTMLElement;
		this.change = change
		this.render();
	}

	private render() {
		const checked = this.radioChecked ? "checked" : "";
		const radioWrapper = document.createElement('div');
		radioWrapper.className = 'radio-wrapper-46';

		radioWrapper.innerHTML = `
		<input type="radio" id="${this.radioId}" ${checked} name="${this.radioName}" class="inp-cbx" />
		<label for="${this.radioId}" class="cbx">
		  <span>
			<svg viewBox="0 0 10 10" height="10px" width="10px">
			  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
			</svg>
		  </span>
		  <span>${this.radioLabel}</span>
		</label>
	  `;
		this.container.appendChild(radioWrapper);
	}
}
