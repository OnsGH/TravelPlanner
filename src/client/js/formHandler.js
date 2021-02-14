

function handleSubmit(event) {
    event.preventDefault()
    
    
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
   
   const apiUrl = 'http://localhost:8081/sentimentAnalysisApi';
   
   
    console.log("::: Form Submitted :::")
    if(Client.isEmptyInput (formText)===false){

    const postData = async (url = "", data = {}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        try {
            const newData = await response.json();
            console.log(newData)
            return newData;
        } catch (error) {
            console.log('error', error);
        }
    };

    postData(apiUrl, {textToAnalyse : formText})
    .then(function(res) {
        console.log("es.score_tag",res.score_tag) ;
        Client.displaySentimentAnalysisInfo(res);
    })
    let table = document.querySelector('table');
    table.deleteRow(1);
   // console.log("table",table)
    

}
}

export { handleSubmit }
