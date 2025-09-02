/* 
Accept an iterable of promises.
Convert all values to promises (Promise.resolve()).
Keep track of how many promises reject.
If any promise resolves → resolve immediately.
If all reject → reject with AggregateError.
 */



const p0 = new Promise((resolve) => {
  setTimeout(() => {
    reject(42);
  }, 400);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

try {
  await promiseAny([p0, p1]);
} catch (err) {6
  console.log(e instanceof AggregateError); // true
  console.log(e.errors); // [ 42, "Err!" ]
}
