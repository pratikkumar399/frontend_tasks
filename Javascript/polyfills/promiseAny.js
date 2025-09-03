/* 
Accept an iterable of promises.
Convert all values to promises (Promise.resolve()).
Keep track of how many promises reject.
If any promise resolves → resolve immediately.
If all reject → reject with AggregateError.
 */

function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    let length = iterable.length;
    let completed = 0;
    let errors = [];

    if (length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => resolve(value)) 
        .catch(err => {
          errors[index] = err;
          completed++;
          if (completed === length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}


const p0 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
  }, 400);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});


const p2 = Promise.reject("err3");

promiseAny([p0, p1, p2])
  .then(console.log)   // "success"
  .catch(console.error);

