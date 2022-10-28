const containerDiv = document.querySelector(".container");
const containerSideLength = 500;
let numberOfSquares = 16;
let height = containerSideLength / numberOfSquares;
let width = containerSideLength / numberOfSquares;
const myRange = document.querySelector("#my-range");
const rangeValue = document.querySelector('.range-value');

myRange.value = numberOfSquares;
rangeValue.textContent = `${myRange.value} x ${myRange.value}`;

myRange.addEventListener('input', changeSize);


function changeColor(e) {
    this.style.backgroundColor = 'red'
}


function changeSize() {
    numberOfSquares = myRange.value;
    rangeValue.textContent = `${myRange.value} x ${myRange.value}`;
    height = containerSideLength / numberOfSquares;
    width = containerSideLength / numberOfSquares;

    for (const node of containerDiv.querySelectorAll("*")) {
        node.remove();
    } // to remove old grid

    makeGrid();

}


function makeGrid() {
    for (let r = 0; r < numberOfSquares; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        
        for (let c = 0; c < numberOfSquares; c++) {
    
            const column = document.createElement("div");
            column.classList.add("column");
            column.style.height = `${height}px`;
            column.style.width = `${width}px`;
    
            column.addEventListener('mousedown', changeColor);
            row.appendChild(column);
        }   
    
        containerDiv.appendChild(row);
    }
}

makeGrid(); // to create the initial grid