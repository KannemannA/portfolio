import { useState, useEffect, useRef } from 'react';

const ImageSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef([]);
    const observer = useRef(null);
    const images = [
        'https://th.bing.com/th/id/OIP.ZTFsNJtONLlGLzOo1LO70wHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7',
        'https://th.bing.com/th/id/OIP.BYoltjhAZ_4JXqBWd0AlXQHaFL?w=233&h=180&c=7&r=0&o=5&pid=1.7'
      ];
  
    // Configurar Intersection Observer
    useEffect(() => {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = sectionsRef.current.indexOf(entry.target);
              setActiveIndex(index);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        }
      );
  
      // Observar todas las secciones
      sectionsRef.current.forEach(section => {
        if (section) observer.current.observe(section);
      });
  
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }, []); // Solo se ejecuta una vez al montar
  
    // Callback para las refs de las secciones
    const setSectionRef = (index) => (el) => {
      sectionsRef.current[index] = el;
    };
  return (
    <div className="relative">
      {/* Contenedor de imagen sticky */}
      <div 
        className="sticky top-0 h-screen w-[48vw] ml-[1vw] transition-opacity duration-500"
      >
        <div className="p-4 h-full">
          <img 
            src={images[activeIndex]} 
            alt="Descripción"
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Secciones de descripción */}
      <div className="absolute top-0 right-[1vw] w-[48vw]">
        {[1, 2].map((item, index) => (
          <section 
            key={index}
            ref={setSectionRef(index)}
            className="description-section h-screen flex items-center justify-center"
          >
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg mx-4">
              <h2 className="text-3xl font-bold mb-4">Descripción {index + 1}</h2>
              <p className="text-gray-600 text-lg">
                Contenido de la descripción {index + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;