import { getIndicatorInfo } from "./services.js";

export let myIndicatorChart = null;

export async function buildChart(indicatorCode) {
	const indicatorChart = document.getElementById("indicatorChart");
    const errorIndicator = document.getElementById("error-indicator");

	const indicatorInfo = await getIndicatorInfo(indicatorCode);

	if (indicatorInfo.error) {
        indicatorChart.hidden = true;
		errorIndicator.innerHTML = `&#128517; ${indicatorInfo.message}`;
	} else {
        indicatorChart.hidden = false;
        errorIndicator.innerHTML = "";
        if(myIndicatorChart){
            myIndicatorChart.destroy();
        }
        
        const indicatorName = indicatorInfo.response.nombre;
        const series = indicatorInfo.response.firstSeries;

		const labels = series.map(( serie )=> new Date(serie.fecha).toLocaleDateString());
        const data = series.map(( serie ) => serie.valor );

        const datasets = [
            {
                label: indicatorName,
                borderColor: "rgb(255, 99, 132)",
                data
            }
        ]

        const config = {
            type: "line",
            data: { labels, datasets }
        }

        indicatorChart.style.backgroundColor = "white";
        myIndicatorChart = new Chart(indicatorChart, config);
	}
}
