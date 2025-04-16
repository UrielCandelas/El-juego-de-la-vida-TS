export const fillRandom = (size: number) => {
  const grid = initGrid(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i][j] = Math.random() > 0.7 ? 1 : 0;
    }
  }
  return grid;
};

export const updateGrid = (grid: Array<Array<number>>) => {
  const nextGen = initGrid(grid.length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const vecinos = countNeighbours(i, j, grid);
      if (grid[i][j] && (vecinos < 2 || vecinos > 3)) {
        nextGen[i][j] = 0;
      } else if (!grid[i][j] && vecinos === 3) {
        nextGen[i][j] = 1;
      } else {
        nextGen[i][j] = grid[i][j];
      }
    }
  }
  return nextGen;
};

const initGrid = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(0));
};

const countNeighbours = (x: number, y: number, grid: Array<Array<number>>) => {
  let res = 0;
  const size = grid.length;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const ni = (x + i + size) % size;
      const nj = (y + j + size) % size;
      res += grid[ni][nj];
    }
  }
  return res;
};
