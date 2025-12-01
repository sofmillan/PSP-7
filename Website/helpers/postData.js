const postDataFetch = async (url, objeto) => {
	try {
		const option = {
			method: "POST",
			body: JSON.stringify(objeto),
			headers: { "Content-type": "application/json; charset=UTF-8" },
		};
		console.log("RECEIVED" + option)
		const response = await fetch(url, option);
		const resp = await response.json();
		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};


export default postDataFetch;