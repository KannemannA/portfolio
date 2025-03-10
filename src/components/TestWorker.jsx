
import { useEffect } from 'react';
import workerUrl from "@/animations/work?worker";

const TestWorker = () => {
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      const worker = new workerUrl();

      
      worker.onmessage = (event) => {
        console.log('Mensaje desde el worker:', event.data);
      };

      return () => {
        worker.terminate();
      };
    } else {
      console.error('Web Workers no son soportados en este navegador.');
    }
  }, []);

  return <div>Test Worker: abre la consola para ver el mensaje "hola".</div>;
};

export default TestWorker;

