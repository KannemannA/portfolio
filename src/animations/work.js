const test = () => {console.log("hola");
self.postMessage("hola desde el worker");}
test();

export default test;
