function handleSubmit(event) {
    event.preventDefault();
    console.log('Row counts   ',Client.getRowsCount());
    // check what text was put into the form field
    let formText = document.getElementById("name").value;
    let table = document.querySelector("table");
    let rowCount = Client.getRowsCount();
  

    const apiUrl = "http://localhost:8081/sentimentAnalysisApi";

    console.log("::: Form Submitted :::");
    if ((Client.isEmptyInput(formText) === false)&&(rowCount>1)) {
        const postData = async (url = "", data = {}) => {
            console.log(data);
            const response = await fetch(url, {
                method: "POST",
                credentials: "same-origin",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            try {
                const newData = await response.json();
                console.log(newData);
                return newData;
            } catch (error) {
                console.log("error", error);
            }
        };

        postData(apiUrl, { textToAnalyse: formText }).then(function (res) {
            console.log("es.score_tag", res.score_tag);
            Client.displaySentimentAnalysisInfo(res);
        });
        table.deleteRow(1); 
       
    }
}

export { handleSubmit };
