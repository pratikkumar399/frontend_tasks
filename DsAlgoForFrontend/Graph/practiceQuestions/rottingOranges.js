/**
 * @param {number[][]} grid
 * @return {number}
 */

let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];


function isValid(x, y, m, n) {
    return (x >= 0 && x < m && y >= 0 && y < n);
}


var orangesRotting = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let freshOranges = 0;
    let queue = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                freshOranges++;
            }
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            }
        }
    }

    let minutes = 0;

    while (queue.length > 0 && freshOranges > 0) {
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let [x, y] = queue.shift();

            for (let k = 0; k < 4; k++) {
                let nx = x + directions[k][0];
                let ny = y + directions[k][1];

                if (isValid(nx, ny, m, n) && grid[nx][ny] === 1) {
                    grid[nx][ny] = 2;
                    freshOranges--;
                    queue.push([nx, ny]);
                }
            }
        }
        minutes++;
    }

    if (freshOranges) {
        return -1;
    }
    return minutes;
};