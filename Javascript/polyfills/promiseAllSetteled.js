

// send result of all the promise
// AllSettled -> returns all the promise with their status and value
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    if (!promises?.length) {
      resolve([]);
      return;
    }

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
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
   const ans = await promiseAllSettled([p0, p1, p2]);
    console.log("Resolved:", ans);
}

result();