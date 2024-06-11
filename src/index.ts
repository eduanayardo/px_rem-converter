// src/index.ts
const bodyTheme = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	bodyTheme.setAttribute("data-theme", savedTheme)
} else {
	// Detectar la preferencia del sistema
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

let base_font_size = 16; // px

const pxToRem = (px: number): number => px / base_font_size;
const remToPx = (rem: number): number => rem * base_font_size;

document.addEventListener('DOMContentLoaded', () => {
	const baseValueElement = document.getElementById('baseValue') as HTMLInputElement
	const labelInput = document.getElementById('labelInput') as HTMLLabelElement
	const inputValueElement = document.getElementById('inputValue') as HTMLInputElement;
	const spanInput = document.getElementById('spanInput') as HTMLSpanElement;
	const labelOutput = document.getElementById('labelOutput') as HTMLLabelElement
	const outputValueElement = document.getElementById('outputValue') as HTMLInputElement;
	const spanOutput = document.getElementById('spanOutput') as HTMLSpanElement;
	const toggleButton = document.getElementById('toggleButton') as HTMLButtonElement;
	const themeToggleButton = document.getElementById('theme-toggle');


	themeToggleButton?.addEventListener("click", () => {
		if (bodyTheme.getAttribute("data-theme") == "dark") {
			bodyTheme.setAttribute("data-theme", "light")
			localStorage.setItem('theme', "light");
		} else {
			bodyTheme.setAttribute("data-theme", "dark")
			localStorage.setItem('theme', "dark");
		}
	})

	let isPxToRem = true;

	const convert = () => {
		const inputValue = parseFloat(inputValueElement.value);
		if (isNaN(inputValue)) {
			outputValueElement.value = '0';
			return;
		}
		const outputValue = isPxToRem ? pxToRem(inputValue) : remToPx(inputValue);
		outputValueElement.value = outputValue.toFixed(3).toString();
	};

	inputValueElement.addEventListener('input', convert);
	baseValueElement.addEventListener('input', () => {
		base_font_size = parseFloat(baseValueElement.value)
		convert()
	});
	toggleButton.addEventListener('click', () => {
		isPxToRem = !isPxToRem;

		labelInput.innerHTML = isPxToRem ? 'Pixels' : 'REM';
		inputValueElement.placeholder = isPxToRem ? 'PX' : 'REM';
		spanInput.innerHTML = isPxToRem ? 'px' : 'rem';

		labelOutput.innerHTML = isPxToRem ? 'REM' : 'Pixels';
		outputValueElement.placeholder = isPxToRem ? 'REM' : 'PX';
		spanOutput.innerHTML = isPxToRem ? 'rem' : 'px';

		convert();
	});

});
