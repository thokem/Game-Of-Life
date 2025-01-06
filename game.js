const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let grid = [];
const cellSize = 10;
let isRunning = true;

let updateInterval;
const GENERATION_INTERVAL = 500;

function startSimulation() {
    if (updateInterval) return;
    updateInterval = setInterval(() => {
        update();
        draw();
    }, GENERATION_INTERVAL);
}

function stopSimulation() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

document.getElementById('control').addEventListener('click', () => {
    isRunning = !isRunning;
    document.getElementById('control').textContent = isRunning ? 'Stop' : 'Start';
    if (isRunning) {
        startSimulation();
    } else {
        stopSimulation();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    grid = [];
    resize();
    if (!isRunning) {
        draw();
    }
});

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid();
}

function initGrid() {
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    grid = Array(rows).fill().map(() => 
        Array(cols).fill().map(() => Math.random() > 0.7)
    );
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            const row = (x + i + grid.length) % grid.length;
            const col = (y + j + grid[0].length) % grid[0].length;
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function update() {
    const newGrid = grid.map(arr => [...arr]);
    
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            const neighbors = countNeighbors(grid, i, j);
            if(grid[i][j] && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = false;
            } else if(!grid[i][j] && neighbors === 3) {
                newGrid[i][j] = true;
            }
        }
    }
    
    grid = newGrid;
}

function draw() {
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j]) {
                const neighbors = countNeighbors(grid, i, j);
                let color;
                if (neighbors <= 1) color = '#9be9a8';
                else if (neighbors == 2) color = '#40c463';
                else if (neighbors == 3) color = '#30a14e';
                else color = '#216e39';
                
                ctx.fillStyle = color;
                const x = j * cellSize;
                const y = i * cellSize;
                ctx.beginPath();
                ctx.roundRect(x, y, cellSize-1, cellSize-1, 2);
                ctx.fill();
            }
        }
    }
}

window.addEventListener('resize', resize);
resize();
draw();
startSimulation();