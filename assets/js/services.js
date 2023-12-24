const url = "https://mindicador.cl/api";

export async function getAllIndicators() {
	try {
		const response = await fetch(url);

		if (response.status == 200) {
			const { uf, ivp, dolar, euro, ipc, utm } = await response.json();

			return { error: false, indicators: [uf, ivp, dolar, euro, ipc, utm] };
		} else {
			throw new Error(
				`Something went wrong... we couldn't get the indicators, status code: ${response.status}`
			);
		}
	} catch (e) {
		return { error: true, message: e.message };
	}
}

export async function getIndicatorInfo(indicator) {
    try {
        const response = await fetch(`${url}/${indicator}`);

        if(response.status == 200) {
            const { nombre, serie } = await response.json();

            const firstSeries = serie.slice(0, 10);

            return { error: false, response: { nombre, firstSeries }}
        } else {
            throw new Error(
                `Something went wrong... we could't get the indicator selected, status code: ${response.status}`
            );
        }
    } catch (e) {
        return { error: true, message: e.message}
    }
}