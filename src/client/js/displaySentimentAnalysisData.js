function displaySentimentAnalysisInfo(data) {
  const tableRef = document.getElementById("analysis__table");
  var tbodyRef = tableRef.getElementsByTagName("tbody")[0];

  // Insert a row at the end of table
  var row = tbodyRef.insertRow();

  // Insert a cell in the row at index 0
  let newCell = row.insertCell(0);
  // Append a text node to the cell
  let newText = document.createTextNode(data.model);
  newCell.appendChild(newText);

  newCell = row.insertCell(1);
  newText = document.createTextNode(data.agreement);
  newCell.appendChild(newText);

  newCell = row.insertCell(2);
  newText = document.createTextNode(data.subjectivity);
  newCell.appendChild(newText);

  newCell = row.insertCell(3);
  newText = document.createTextNode(data.confidence);
  newCell.appendChild(newText);

  newCell = row.insertCell(4);
  newText = document.createTextNode(data.irony);
  newCell.appendChild(newText);
}

function isEmptyInput(input) {
  const inputext = document.getElementById("name").value;
  const msg = document.getElementById("msg");
  if (inputext === "") {
      msg.textContent = "Please enter your text 😩";
      return true;
  } else {
      msg.textContent = "";
      return false;
  }
}


function getRowsCount() {
  
  let rowCount = 0;
  var table = document.getElementById("analysis__table");
  rowCount = analysis__table.rows.length;
  return  rowCount;
}
export { getRowsCount, isEmptyInput, displaySentimentAnalysisInfo };
