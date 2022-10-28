const containerDiv = document.querySelector(".container");
const containerSideLength = 500;
let numberOfSquares = 16;
let height = containerSideLength / numberOfSquares;
let width = containerSideLength / numberOfSquares;
const myRange = document.querySelector("#my-range");
const rangeValue = document.querySelector('.range-value');
const colorSelector = document.querySelector("#color");
const clearButton = document.querySelector('#clear');
let selectedRGB = '#000000';

myRange.value = numberOfSquares;
rangeValue.textContent = `${myRange.value} x ${myRange.value}`;

myRange.addEventListener('input', changeSize);
colorSelector.addEventListener('input', function (){
    selectedRGB = this.value;
})

clearButton.addEventListener('click', changeSize);


function applyColor() {
    this.style.backgroundColor = selectedRGB;
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

    /*
        this function deletes the existing grid and
        creates a new, blank one with the slider input 
        as the number of squares contained within the grid
     */
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
    
            column.addEventListener('mousedown', applyColor);
            row.appendChild(column);
        }   
    
        containerDiv.appendChild(row);
    }
}

makeGrid(); // to create the initial grid