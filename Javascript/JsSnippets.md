
## JavaScript Snippets

1. 

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
