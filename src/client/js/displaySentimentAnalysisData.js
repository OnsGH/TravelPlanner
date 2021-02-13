
function displaySentimentAnalysisData(data)
{

    const sentimentData = document.querySelector("section.form__result");

    const getTable = document.getElementById("analysis__table");//
    console.log("getTable",getTable);

    const divElement = document.createElement("tbody");
    
    const markup = `
   
    <tr>
      <td class="td">${data.model}</td>
      <td class="td">${data.agreement}</td>
      <td class="td">${data.subjectivity}</td>
      <td class="td">${data.confidence}</td>
      <td class="td">${data.irony}</td>
    </tr>
    </tbody>
  </table>
 
`;
   
divElement.innerHTML = markup;
getTable.appendChild(divElement);
console.log(getTable);
 
}

function isEmptyInput(input){
  const inputext = document.getElementById("name").value;
  const msg = document.getElementById("msg");
  if(inputext==="")
  {
    
    msg.textContent = "Please enter your text 😩";
    return true;
  }
  else
  {
    msg.textContent ="";
    return false}

}

export { isEmptyInput, displaySentimentAnalysisData }
