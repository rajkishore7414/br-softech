// Create a Blob from a string
const textData = "Hello, this is a Blob example.";
const blob = new Blob([textData], { type: "text/plain" });

// Create a Blob from a mix of data
const hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary
const mixedBlob = new Blob([hello, ' ', 'world'], { type: 'text/plain' });

console.log(blob);
