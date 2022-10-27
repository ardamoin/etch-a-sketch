const containerDiv = document.querySelector(".container");


containerDiv.addEventListener('mousedown', () => clicking = true);


function changeColor(e) {
    this.style.backgroundColor = 'red'
}



for (let r = 0; r < 16; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    
    for (let c = 0; c < 16; c++) {
        const column = document.createElement("div");
        column.classList.add("column");

        column.addEventListener('mousedown', changeColor);
        row.appendChild(column);
    }   

    containerDiv.appendChild(row);
}