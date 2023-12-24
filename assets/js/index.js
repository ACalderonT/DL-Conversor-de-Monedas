import { getAllIndicators } from "./services.js";
import { myIndicatorChart, buildChart } from "./indicator-chart.js";
import { optionsTemplate } from "./option-template.js";

const mainContent = document.getElementById("main-content");
const errorContent = document.getElementById("error-content");
const coinSelector = document.getElementById("coin-selector");
const coinInput = document.getElementById("clp-input");
const submitBtn = document.getElementById("submit-btn");
const spanResult = document.getElementById("result");

const indicatorResponse = await getAllIndicators();

const onChangeInputOrSelectedValue = () => {
    
	if (coinInput.value.trim() != "" && coinSelector.value != "") {
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
        spanResult.innerHTML = "";

        if(myIndicatorChart){
            myIndicatorChart.destroy()
        }
	}
};

const getSelectedIndicator = (value) => {
    const selectedIndicator = indicatorResponse.indicators.filter((indicator) => indicator.valor == value );

    return selectedIndicator[0]
}

const onSubmit = () => {
    const coinConverted = (coinInput.value / coinSelector.value).toFixed(2);
    const indicator = getSelectedIndicator(coinSelector.value);

    buildChart(indicator.codigo);
    spanResult.innerHTML = `Resultado: \$${coinConverted}`
};


if (indicatorResponse.error) {
	mainContent.hidden = true;
	errorContent.hidden = false;
	errorContent.classList.add("error-content");

	errorContent.innerHTML = `&#128517; ${indicatorResponse.message}`;
} else {

	let options =
		'<option value="" disabled selected>--Selecciona un indicador--</option>';
	Object.entries(indicatorResponse.indicators).forEach(([key, option]) => {
		options += optionsTemplate(option);
	});

	coinSelector.innerHTML = options;
}

coinInput.addEventListener("input", () => onChangeInputOrSelectedValue());
coinSelector.addEventListener("change", () => onChangeInputOrSelectedValue());
submitBtn.addEventListener("click", () => onSubmit())

