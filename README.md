# Conway's Game of Life

An interactive implementation of Conway's Game of Life using HTML5 Canvas with a modern, GitHub-themed color scheme.

## Features

- Responsive canvas that adjusts to window size
- Color-coded cell states based on neighbor count:
  - Dying cells (1 or fewer neighbors): Light green
  - Stable cells (2 neighbors): Medium green
  - Growing cells (3 neighbors): Dark green
  - Overcrowded cells (4+ neighbors): Darkest green
- Simple controls to start/stop and reset the simulation
- Toroidal grid (edges wrap around)

## Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Use the control buttons to:
   - Stop/Start: Toggle the simulation
   - Reset: Generate a new random grid

## Implementation Details

The project consists of three main files:
- [index.html](index.html): Basic HTML structure and controls
- [styles.css](styles.css): CSS styling with CSS custom properties
- [game.js](game.js): Core game logic using ES6+ JavaScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style guidelines in [.github/copilot-instructions.md](.github/copilot-instructions.md)
4. Submit a pull request

## License

MIT License

## Acknowledgments

Based on Conway's Game of Life cellular automaton