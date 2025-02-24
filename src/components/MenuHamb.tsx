import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useModal from "@/hooks/useModal";
import ButtonHamburguer from "./ButtonHamburguer";
import Aurora from "@/animations/Aurora";
import SplashCursor from "@/animations/SplashCursor";

const MenuHamb: React.FC = () => {
  const { toggleModal, closeModal, isOpen } = useModal();
  const decryptRefs = useRef<(HTMLAnchorElement | null)[]>([]); // Referencias a los elementos <a>
  const intervals = useRef(new WeakMap<HTMLAnchorElement, number>()); // Almacena los intervalos
  const isActive = useRef(new WeakMap<HTMLAnchorElement, boolean>()); // Almacena el estado de activación

  // Efecto para manejar el overflow del body
  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow")
      : document.body.classList.remove("overflow");
  }, [isOpen]);

  // Efecto para el efecto de "descifrado"
  useEffect(() => {
    if (isOpen) {
      const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ!@#$%&=?¿*+-ç^";

      // Función para aplicar el efecto de descifrado
      const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLAnchorElement;
        if (isActive.current.get(target)) return;
        isActive.current.set(target, true);

        let iteration = 0;

        // Limpia el intervalo anterior si existe
        const previousInterval = intervals.current.get(target);
        if (previousInterval) clearInterval(previousInterval);

        // Crea un nuevo intervalo para el efecto
        const newInterval = setInterval(() => {
          target.innerText = target.innerText
            .split("")
            .map((letter: string, index: number) => {
              if (index < iteration) {
                return target.dataset.value?.[index] || letter;
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

          // Detiene el intervalo cuando se completa el efecto
          if (iteration >= (target.dataset.value?.length || 0)) {
            clearInterval(newInterval);
            intervals.current.delete(target);
            isActive.current.set(target, false);
          }

          iteration += 1 / 6;
        }, 50);

        // Guarda el nuevo intervalo en el WeakMap
        intervals.current.set(target, newInterval);
      };

      // Agrega el event listener a cada elemento con clase "decrypt"
      decryptRefs.current.forEach((element) => {
        if (element) {
          element.addEventListener("mouseover", handleMouseOver);
        }
      });

      // Limpia los event listeners al desmontar el componente
      return () => {
        decryptRefs.current.forEach((element) => {
          if (element) {
            element.removeEventListener("mouseover", handleMouseOver);
          }
        });
      };
    }
  }, [isOpen]);

  return (
    <nav className="sm:hidden flex justify-end">
      <ButtonHamburguer
        className="backdrop-blur-lg p-2 border-black border rounded-md mr-5 mt-2 box-content"
        useModal={{ toggleModal, isOpen }}
      />
      {createPortal(
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } fixed inset-0 z-10 text-white justify-center items-center overflow-hidden`}
        >
          <Aurora speed={0.7} className="fixed inset-0" />
          <SplashCursor className="z-[11] size-full" />
          <ButtonHamburguer
            className="p-3 pr-1 rounded-full box-content z-[12] fixed top-[0.65rem] right-[0.65rem]"
            useModal={{ toggleModal, isOpen }}
          />
          <ul className="flex flex-col gap-12 border-black border rounded-md font-mono z-[12] backdrop-blur-3xl p-6">
            <li>
              <a
                href="#inicio"
                ref={(element) => {decryptRefs.current[0] = element}}
                className="decrypt"
                data-value="Inicio"
                onClick={closeModal}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#sobreMi"
                ref={(element) => {decryptRefs.current[1] = element}}
                className="decrypt"
                data-value="Sobre Mí"
                onClick={closeModal}
              >
                Sobre Mí
              </a>
            </li>
            <li>
              <a
                href="#proyectos"
                ref={(element) => {decryptRefs.current[2] = element}}
                className="decrypt"
                data-value="Proyectos"
                onClick={closeModal}
              >
                Proyectos
              </a>
            </li>
          </ul>
        </div>,
        document.getElementById("modal")!
      )}
    </nav>
  );
};

export default MenuHamb;