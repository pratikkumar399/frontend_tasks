
## JavaScript Snippets

1. Predict the output

```javascript
const promise = new Promise((resolve , reject) => {
    resolve(10);
    reject(20);
    console.log("here");
})

promise.then((value) => {
    console.log(value);
})
```
<details> <summary>Output</summary>

```
here
10
```

</details>

<hr>

2. What is the output in this case?
```javascript
const promise = new Promise((resolve , reject) => {
    reject(20);
    console.log("here");
})

promise.then(
  (value) => {
    console.log("ok");
  },
  (value) => {
    console.log(value);
  }
);
```

<details> <summary>Output</summary>

```
here
20
```
<summary>
    then(onFulfilled, onRejected)
</summary>

</details>

<hr>

3. What is the output in this case?
```javascript
let a = [];
let b = [];

console.log(a == b);
console.log(a === b);

```
<details> <summary>Output</summary>

```
false
false
```