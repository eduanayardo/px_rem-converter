import { RadioComponent } from './components/RadioComponent';

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
const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
const labelInputElements = document.querySelectorAll('.labelInput') as NodeListOf<HTMLLabelElement>;
const spanInput = document.getElementById('spanInput') as HTMLSpanElement;
const labelOutputElements = document.querySelectorAll('.labelOutput') as NodeListOf<HTMLLabelElement>;
const spanOutput = document.getElementById('spanOutput') as HTMLSpanElement;

let conversionType = 'pxToRem'; // Tipo de conversión inicial
let baseFontSize = 16; // Tamaño de fuente base inicial


// Funciones de conversión
const conversionFunctions: { [key: string]: (input: number, context?: number) => number } = {
	pxToRem: (px: number) => px / baseFontSize,
	remToPx: (rem: number) => rem * baseFontSize,
	pxToEm: (px: number) => px / baseFontSize,
	emToPx: (em: number) => em * baseFontSize,
	pxToPercentage: (px: number, context: number = baseFontSize) => (px / context) * 100,
	percentageToPx: (percentage: number, context: number = baseFontSize) => (percentage / 100) * context,
	pxToBaseUnit: (px: number, base: number = baseFontSize) => px / base,
	baseUnitToPx: (unit: number, base: number = baseFontSize) => unit * base,
	pxToPt: (px: number) => (px / 96) * 72,
	ptToPx: (pt: number) => (pt / 72) * 96,
	pxToCm: (px: number) => (px / 96) * 2.54,
	cmToPx: (cm: number) => (cm / 2.54) * 96,
	pxToMm: (px: number) => (px / 96) * 25.4,
	mmToPx: (mm: number) => (mm / 25.4) * 96,
	pxToPc: (px: number) => (px / 96) * 6,
	pcToPx: (pc: number) => (pc / 6) * 96
};

// Actualizar la conversión
const updateConversion = () => {
	const inputValue = parseFloat(inputValueElement.value);
	const convert = conversionFunctions[conversionType];
	const outputValue = convert ? convert(inputValue, baseFontSize) : 0;
	outputValueElement.value = isNaN(inputValue) ? '0' : outputValue.toFixed(3);
};

// Actualizar las etiquetas y placeholders
const updateLabelsAndPlaceholders = () => {
	const labelMapping: { [key: string]: { input: string, inputUnit: string, output: string, outputUnit: string } } = {
		pxToRem: { input: 'Pixeles', inputUnit: 'px', output: 'REM', outputUnit: 'rem' },
		remToPx: { input: 'REM', inputUnit: 'rem', output: 'Pixeles', outputUnit: 'px' },
		pxToEm: { input: 'Pixeles', inputUnit: 'px', output: 'EM', outputUnit: 'em' },
		emToPx: { input: 'EM', inputUnit: 'em', output: 'Pixeles', outputUnit: 'px' },
		pxToPercentage: { input: 'Pixeles', inputUnit: 'px', output: 'Porcentaje', outputUnit: '%' },
		percentageToPx: { input: 'Porcentaje', inputUnit: '%', output: 'Pixeles', outputUnit: 'px' },
		pxToBaseUnit: { input: 'Pixeles', inputUnit: 'px', output: 'Unidad base', outputUnit: 'unit' },
		baseUnitToPx: { input: 'Unidad base', inputUnit: 'unit', output: 'Pixeles', outputUnit: 'px' },
		pxToPt: { input: 'Pixeles', inputUnit: 'px', output: 'Puntos', outputUnit: 'pt' },
		ptToPx: { input: 'Puntos', inputUnit: 'pt', output: 'Pixeles', outputUnit: 'px' },
		pxToCm: { input: 'Pixeles', inputUnit: 'px', output: 'Centímetros', outputUnit: 'cm' },
		cmToPx: { input: 'Centímetros', inputUnit: 'cm', output: 'Pixeles', outputUnit: 'px' },
		pxToMm: { input: 'Pixeles', inputUnit: 'px', output: 'Milímetros', outputUnit: 'mm' },
		mmToPx: { input: 'Milímetros', inputUnit: 'mm', output: 'Pixeles', outputUnit: 'px' },
		pxToPc: { input: 'Pixeles', inputUnit: 'px', output: 'Picas', outputUnit: 'pc' },
		pcToPx: { input: 'Picas', inputUnit: 'pc', output: 'Pixeles', outputUnit: 'px' }
	};

	const labels = labelMapping[conversionType] || { input: '', inputUnit: '', output: '', outputUnit: '' };
	labelInputElements.forEach(label => label.innerHTML = labels.input);
	labelOutputElements.forEach(label => label.innerHTML = labels.output);
	spanInput.innerHTML = labels.inputUnit;
	spanOutput.innerHTML = labels.outputUnit;
};

// Alternar entre temas claro y oscuro
const toggleTheme = () => {
	const currentTheme = document.body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	document.body.setAttribute("data-theme", newTheme);
	localStorage.setItem('theme', newTheme);
};

// Manejar el cambio de tipo de conversión
const handleRadioChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	conversionType = target.id;
	updateLabelsAndPlaceholders();
	updateConversion();
};

// Agregar event listeners después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
	// Inicializar componentes de radio
	new RadioComponent('pxToRem', 'PX a REM', 'conversionType', true, 'radio-pxToRem');
	new RadioComponent('remToPx', 'REM a PX', 'conversionType', false, 'radio-RemToPx');
	new RadioComponent('pxToEm', 'PX a EM', 'conversionType', false, 'radio-pxToEm');
	new RadioComponent('emToPx', 'EM a PX', 'conversionType', false, 'radio-emToPx');
	new RadioComponent('pxToPercentage', 'PX a Porcentaje', 'conversionType', false, 'radio-pxToPercentage');
	new RadioComponent('percentageToPx', 'Porcentaje a PX', 'conversionType', false, 'radio-percentageToPx');
	new RadioComponent('pxToBaseUnit', 'PX a Unidad base', 'conversionType', false, 'radio-pxToBaseUnit');
	new RadioComponent('baseUnitToPx', 'Unidad base a PX', 'conversionType', false, 'radio-baseUnitToPx');
	new RadioComponent('pxToPt', 'PX a PT', 'conversionType', false, 'radio-pxToPt');
	new RadioComponent('ptToPx', 'PT a PX', 'conversionType', false, 'radio-ptToPx');
	new RadioComponent('pxToCm', 'PX a CM', 'conversionType', false, 'radio-pxToCm');
	new RadioComponent('cmToPx', 'CM a PX', 'conversionType', false, 'radio-cmToPx');
	new RadioComponent('pxToMm', 'PX a MM', 'conversionType', false, 'radio-pxToMm');
	new RadioComponent('mmToPx', 'MM a PX', 'conversionType', false, 'radio-mmToPx');
	new RadioComponent('pxToPc', 'PX a PC', 'conversionType', false, 'radio-pxToPc');
	new RadioComponent('pcToPx', 'PC a PX', 'conversionType', false, 'radio-pcToPx');

	const radioButtons = document.querySelectorAll('input[name="conversionType"]') as NodeListOf<HTMLInputElement>;

	// Verificar que los elementos existan antes de agregar event listeners
	if (inputValueElement && outputValueElement && themeToggleButton && baseFontSizeInput && radioButtons.length) {
		// Actualizar la conversión cuando el valor de entrada cambia
		inputValueElement.addEventListener('input', updateConversion);

		// Actualizar el tamaño de fuente base y la conversión cuando el valor cambia
		baseFontSizeInput.addEventListener('input', () => {
			const newValue = parseFloat(baseFontSizeInput.value);
			baseFontSize = isNaN(newValue) || newValue === 0 ? 1 : newValue;
			baseFontSizeInput.value = baseFontSize.toString();
			updateConversion();
		});

		// Alternar el tema
		themeToggleButton.addEventListener('click', toggleTheme);

		// Agregar event listeners para los botones de radio
		radioButtons.forEach(radio => {
			radio.addEventListener('change', handleRadioChange);
		});

		// Inicializar valores y etiquetas
		updateLabelsAndPlaceholders();
		updateConversion();
	} else {
		console.error('Uno o más elementos del DOM no se encontraron.');
	}
});
