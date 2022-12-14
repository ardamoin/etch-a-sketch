const containerDiv = document.querySelector(".container");
const containerSideLength = 500;
let numberOfSquares = 16;
let height = containerSideLength / numberOfSquares;
let width = containerSideLength / numberOfSquares;

const myRange = document.querySelector("#my-range");
const rangeValue = document.querySelector('.range-value');

const colorSelector = document.querySelector("#color");
let selectedRGB = colorSelector.value;

const rainbowBox = document.querySelector('#rainbow');
const eraseBox = document.querySelector('#erase');
const clearButton = document.querySelector('#clear');

let clickAndHold = false;

myRange.value = numberOfSquares;
rangeValue.textContent = `${myRange.value} x ${myRange.value}`;

containerDiv.addEventListener('mouseleave', () => {clickAndHold = false});

myRange.addEventListener('input', changeSize);
colorSelector.addEventListener('input', function (){
    selectedRGB = this.value;
    rainbowBox.classList.remove('active');
})

//------------------------------------------------------------
rainbowBox.addEventListener('click', function() {
    if (eraseBox.classList.contains('active')) {
        eraseBox.classList.remove('active');
    }

    if (!this.classList.contains('active')) {
        this.classList.add('active');
    } else {
        this.classList.remove('active');
    }
})

eraseBox.addEventListener('click', function() {
    if (rainbowBox.classList.contains('active')) {
        rainbowBox.classList.remove('active');
    }

    if (!this.classList.contains('active')) {
        this.classList.add('active');
    } else {
        this.classList.remove('active');
    }
})
/*
These event listeners prevent erase and rainbow from being checked
simultaneously
*/
//------------------------------------------------------------

clearButton.addEventListener('click', function() {
    changeSize();
    eraseBox.classList.remove('active');
});


function applyColor(square) {
    if (!rainbowBox.classList.contains('active') && !eraseBox.classList.contains('active')) {
        square.style.backgroundColor = selectedRGB;
    } else if (rainbowBox.classList.contains('active') && !eraseBox.classList.contains('active')) {
        let randomR = Math.ceil(Math.random()*255);
        let randomG = Math.ceil(Math.random()*255);
        let randomB = Math.ceil(Math.random()*255);

        square.style.backgroundColor = `rgb(${randomR},${randomG}, ${randomB})`;
        //to apply random colors for rainbow mode
    } else {
        square.style.backgroundColor = 'white';
    }
    
}


function changeSize() {
    numberOfSquares = myRange.value;
    rangeValue.textContent = `${myRange.value} x ${myRange.value}`;
    height = containerSideLength / numberOfSquares;
    width = containerSideLength / numberOfSquares;

    for (const node of containerDiv.querySelectorAll("*")) {
        node.remove(); // to remove old grid
    } 

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
    
            column.addEventListener('mousedown', function() {
                clickAndHold = true;
                applyColor(this);
            });

            column.addEventListener('mouseover', function () {
                if (clickAndHold) {
                    applyColor(this);
                }
            });

            column.addEventListener('mouseup', (e) => {
                clickAndHold = false;
                console.log(e.type);
            })

            
            row.appendChild(column);
        }   
    
        containerDiv.appendChild(row);
    }
}

makeGrid(); // to create the initial grid