document.getElementById("outer").addEventListener("click", () => {
    console.log("Outer clicked");
});

document.getElementById("inner").addEventListener("click", () => {
    console.log("Inner clicked");
});

// output
// inner clicked 
// outer clicked 
// capture phase -> target phase -> bubble phase (default phase)

// if you just want to capture the event in the capture phase
document.getElementById("outer").addEventListener("click", () => {
    console.log("Outer clicked");
}, true); // true for capture phase