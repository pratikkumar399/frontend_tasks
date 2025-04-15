function isValid(i, j, n, m) {
    return i >= 0 && i < n && j >= 0 && j < m;
}

function isBorder(i, j, n, m) {
    return i === 0 || j === 0 || i === n - 1 || j === m - 1;
}

var solve = function (board) {
    const n = board.length;
    const m = board[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const visited = Array.from({ length: n }, () => Array(m).fill(0));
    const queue = [];

    // Find all border 'O's and mark them visited, add to queue
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O' && isBorder(i, j, n, m) && visited[i][j] === 0) {
                visited[i][j] = 2;
                queue.push([i, j]);
            }
        }
    }

    // BFS from border 'O's
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (isValid(nx, ny, n, m) && board[nx][ny] === 'O' && visited[nx][ny] !== 2) {
                visited[nx][ny] = 2;
                queue.push([nx, ny]);
            }
        }
    }

    //Flip unvisited 'O's to 'X'
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O' && visited[i][j] !== 2) {
                board[i][j] = 'X';
            }
        }
    }
};
