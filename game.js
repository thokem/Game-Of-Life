/** @typedef {boolean[][]} Grid */

// Constants
const CONSTANTS = {
    CELL_SIZE: 10,
    GENERATION_INTERVAL: 500,
    COLORS: {
        BACKGROUND: '#0d1117',
        CELL_COLORS: {
            DYING: '#9be9a8',    // 1 or fewer neighbors
            STABLE: '#40c463',   // 2 neighbors
            GROWING: '#30a14e',  // 3 neighbors
            OVERCROWDED: '#216e39' // 4+ neighbors
        }
    }
};

// State Management
class GameState {
    constructor() {
        /** @type {Grid} */
        this.grid = [];
        this.isRunning = true;
        this.updateInterval = null;
    }
}

class GameOfLife {
    /**
     * @param {HTMLCanvasElement} canvas - Game canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = new GameState();
        this.initEventListeners();
    }

    /**
     * Initialize event listeners for game controls
     * @private
     */
    initEventListeners() {
        document.getElementById('control').addEventListener('click', 
            () => this.toggleSimulation());
        document.getElementById('reset').addEventListener('click', 
            () => this.resetGame());
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * Toggle simulation running state
     */
    toggleSimulation() {
        this.state.isRunning = !this.state.isRunning;
        document.getElementById('control').textContent = 
            this.state.isRunning ? 'Stop' : 'Start';
        
        if (this.state.isRunning) {
            this.startSimulation();
        } else {
            this.stopSimulation();
        }
    }

    /**
     * Start the game simulation
     */
    startSimulation() {
        if (this.state.updateInterval) return;
        this.state.updateInterval = setInterval(() => {
            this.update();
            this.draw();
        }, CONSTANTS.GENERATION_INTERVAL);
    }

    /**
     * Stop the game simulation
     */
    stopSimulation() {
        if (this.state.updateInterval) {
            clearInterval(this.state.updateInterval);
            this.state.updateInterval = null;
        }
    }

    /**
     * Reset the game state
     */
    resetGame() {
        this.state.grid = [];
        this.handleResize();
        if (!this.state.isRunning) {
            this.draw();
        }
    }

    /**
     * Handle window resize event
     */
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initGrid();
    }

    /**
     * Initialize the game grid
     * @private
     */
    initGrid() {
        const cols = Math.floor(this.canvas.width / CONSTANTS.CELL_SIZE);
        const rows = Math.floor(this.canvas.height / CONSTANTS.CELL_SIZE);
        this.state.grid = Array(rows).fill().map(() => 
            Array(cols).fill().map(() => Math.random() > 0.7)
        );
    }

    /**
     * Count living neighbors for a cell
     * @param {Grid} grid - Current game grid
     * @param {number} x - Row index
     * @param {number} y - Column index
     * @returns {number} Number of living neighbors
     */
    countNeighbors(grid, x, y) {
        let sum = 0;
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                const row = (x + i + grid.length) % grid.length;
                const col = (y + j + grid[0].length) % grid[0].length;
                sum += grid[row][col];
            }
        }
        return sum - grid[x][y];
    }

    /**
     * Update game state for next generation
     */
    update() {
        const newGrid = this.state.grid.map(arr => [...arr]);
        
        for(let i = 0; i < this.state.grid.length; i++) {
            for(let j = 0; j < this.state.grid[i].length; j++) {
                const neighbors = this.countNeighbors(this.state.grid, i, j);
                const isAlive = this.state.grid[i][j];
                
                newGrid[i][j] = this.getNextCellState(isAlive, neighbors);
            }
        }
        
        this.state.grid = newGrid;
    }

    /**
     * Determine next state for a cell
     * @param {boolean} isAlive - Current cell state
     * @param {number} neighbors - Number of living neighbors
     * @returns {boolean} Next cell state
     */
    getNextCellState(isAlive, neighbors) {
        if (isAlive && (neighbors < 2 || neighbors > 3)) return false;
        if (!isAlive && neighbors === 3) return true;
        return isAlive;
    }

    /**
     * Get cell color based on neighbor count
     * @param {number} neighbors - Number of living neighbors
     * @returns {string} Cell color
     */
    getCellColor(neighbors) {
        if (neighbors <= 1) return CONSTANTS.COLORS.CELL_COLORS.DYING;
        if (neighbors === 2) return CONSTANTS.COLORS.CELL_COLORS.STABLE;
        if (neighbors === 3) return CONSTANTS.COLORS.CELL_COLORS.GROWING;
        return CONSTANTS.COLORS.CELL_COLORS.OVERCROWDED;
    }

    /**
     * Draw the current game state
     */
    draw() {
        // Clear canvas
        this.ctx.fillStyle = CONSTANTS.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw cells
        for(let i = 0; i < this.state.grid.length; i++) {
            for(let j = 0; j < this.state.grid[i].length; j++) {
                if(this.state.grid[i][j]) {
                    const neighbors = this.countNeighbors(this.state.grid, i, j);
                    this.ctx.fillStyle = this.getCellColor(neighbors);
                    
                    const x = j * CONSTANTS.CELL_SIZE;
                    const y = i * CONSTANTS.CELL_SIZE;
                    this.ctx.beginPath();
                    this.ctx.roundRect(x, y, 
                        CONSTANTS.CELL_SIZE-1, CONSTANTS.CELL_SIZE-1, 2);
                    this.ctx.fill();
                }
            }
        }
    }
}

// Initialize game
const game = new GameOfLife(document.getElementById('game'));
game.draw();
game.startSimulation();