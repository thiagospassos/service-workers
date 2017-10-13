

var doSomeStuff = function (d) {
    console.log(d);
    return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        }
    });
};