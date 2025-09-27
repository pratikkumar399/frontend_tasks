// it takes an array of arguments, and then a promise is returned
// all the resolved promises are returned in exact order
// and if a promise fails, all the promises are immediately resolved



function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const result = [];
    let completed = 0;

    if (!iterable?.length) {
      resolve([]);
      return;
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then((data) => {
          result[index] = data;
          completed++;
          if (completed === iterable.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}



// Resolved example.
const p0 = Promise.resolve(3);
const p1 = Promise.reject("rejected");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 100);
});

async function result() {
  try {
    const ans = await promiseAll([p0, p1, p2]);
    console.log("Resolved:", ans);
  } catch (err) {
    console.error("Rejected:", err);
  }
}

result();
