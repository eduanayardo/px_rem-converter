// src/index.ts

// Detectar y aplicar el tema guardado o la preferencia del sistema
const initializeTheme = () => {
	const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
	const bodyTheme = document.body;
	const savedTheme = localStorage.getItem('theme');

	if (savedTheme) { // Si hay un tema guardado en localStorage, aplícalo
		if (savedTheme === "light") {
			themeToggleButton.setAttribute("checked", "checked");
		}
		bodyTheme.setAttribute("data-theme", savedTheme);
	} else { // Si no hay un tema guardado, usa la preferencia del sistema
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		bodyTheme.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
	}
};

// Inicializar el tema
initializeTheme();

// Referencias a los elementos del DOM
const baseFontSizeInput = document.getElementById('baseValue') as HTMLInputElement;
const inputValueElement = document.getElementById('inputValue') as HTMLInputElement;
const outputValueElement = document.getElementById('outputValue') as HTMLInputElement;
const toggleButton = document.getElementById('toggleButton') as HTMLButtonElement;
const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
const labelInput = document.getElementById('labelInput') as HTMLLabelElement;
const spanInput = document.getElementById('spanInput') as HTMLSpanElement;
const labelOutput = document.getElementById('labelOutput') as HTMLLabelElement;
const spanOutput = document.getElementById('spanOutput') as HTMLSpanElement;

// Tamaño de fuente base inicial
let baseFontSize = 16; // px
let isPxToRem = true;

// Función para convertir PX a REM
const pxToRem = (px: number): number => px / baseFontSize;

// Función para convertir REM a PX
const remToPx = (rem: number): number => rem * baseFontSize;

// Actualizar la conversión
const updateConversion = () => {
	const inputValue = parseFloat(inputValueElement.value);
	const outputValue = isPxToRem ? pxToRem(inputValue) : remToPx(inputValue);
	outputValueElement.value = isNaN(inputValue) ? '0' : outputValue.toFixed(3);
};

// Actualizar las etiquetas y placeholders
const updateLabelsAndPlaceholders = () => {
	labelInput.innerHTML = isPxToRem ? 'Pixels' : 'REM';
	inputValueElement.placeholder = isPxToRem ? 'PX' : 'REM';
	spanInput.innerHTML = isPxToRem ? 'px' : 'rem';

	labelOutput.innerHTML = isPxToRem ? 'REM' : 'Pixels';
	outputValueElement.placeholder = isPxToRem ? 'REM' : 'PX';
	spanOutput.innerHTML = isPxToRem ? 'rem' : 'px';
};

// Alternar entre temas claro y oscuro
const toggleTheme = () => {
	const currentTheme = document.body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	document.body.setAttribute("data-theme", newTheme);
	localStorage.setItem('theme', newTheme);
};

// Agregar event listeners después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
	// Actualizar la conversión cuando el valor de entrada cambia
	inputValueElement.addEventListener('input', updateConversion);

	// Actualizar el tamaño de fuente base y la conversión cuando el valor cambia
	baseFontSizeInput.addEventListener('input', () => {
		const newValue = parseFloat(baseFontSizeInput.value);
		baseFontSize = isNaN(newValue) || newValue === 0 ? 1 : newValue;
		baseFontSizeInput.value = baseFontSize.toString();
		updateConversion();
	});

	// Alternar entre PX a REM y REM a PX
	toggleButton.addEventListener('click', () => {
		isPxToRem = !isPxToRem;
		updateLabelsAndPlaceholders();
		updateConversion();
	});

	// Alternar el tema
	themeToggleButton.addEventListener('click', toggleTheme);

	// Inicializar valores y etiquetas
	updateLabelsAndPlaceholders();
	updateConversion();
});
