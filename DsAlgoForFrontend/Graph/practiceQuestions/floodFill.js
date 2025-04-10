/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */

let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function isValid(x, y, m, n) {
    return (x >= 0 && x < m && y >= 0 && y < n);
}

var floodFill = function (image, sr, sc, color) {
    let m = image.length;
    let n = image[0].length;

    let startColor = image[sr][sc];
    if (startColor === color) return image; //  return early

    let queue = [];
    queue.push([sr, sc]);
    image[sr][sc] = color; // mark the starting cell


    while (queue.length > 0) {
        let [x, y] = queue.shift();

        // move in all the directions
        for (let j = 0; j < 4; j++) {

            let nx = x + directions[j][0];
            let ny = y + directions[j][1];

            // now check if the directions are valid then perform a flood fill
            if (isValid(nx, ny, m, n) && image[nx][ny] === startColor) {
                //update the color and put inside queue
                queue.push([nx, ny]);
                image[nx][ny] = color;
            }
        }
    }
    return image;
};