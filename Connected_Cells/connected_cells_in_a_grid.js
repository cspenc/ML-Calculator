// n = 4, m = 4 -- (Answer: 5)
var test1 = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [1, 0, 0, 0]
];

// n = 5, m = 5 -- (Answer: 5)
var test2 = [
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 1]
];

function findRegions(matrix) {
  var row = matrix.length; // get rows (n)
  var col = matrix[0].length; // get columns (m)
  var r = 0;
  var c = 0;

  var ans = 0

  for (r=0; r<row; r++) {  // get into rows
    for (c=0; c<col; c++) {  // get into columns
      if (!!matrix[r][c]){
        connected_cells = connected(r, c);

        if (connected_cells > ans) {
          ans = connected_cells
        }
      }
    }
  }

  function connected(r, c) {
    if(!!matrix[r][c]) {
      matrix[r][c] = 0;

      return getNeighbors(r, c).reduce((sum, cell) => {
        return sum + connected(cell[0], cell[1]);
      }, 1);
    }
    return 0;
  }

  function getNeighbors(r, c) {
    return [
      [r, c+1],
      [r+1, c+1],
      [r+1, c],
      [r+1, c-1],
      [r, c-1],
      [r-1, c-1],
      [r-1, c],
      [r-1, c+1]
    ].filter(cell => {
      return !!matrix[cell[0]] && !!matrix[cell[0]][cell[1]];
    });
  }

  return ans;
}

findRegions(test1);
findRegions(test2);
