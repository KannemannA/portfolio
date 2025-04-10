import { useEffect } from "react";
import { createPortal } from "react-dom";
import useModal from "@/hooks/useModal";
import ButtonHamburguer from "./ButtonHamburguer";
import Aurora from "@/animations/Aurora";

const MenuHamb: React.FC = () => {
  const { toggleModal, closeModal, isOpen } = useModal();

  useEffect(() => { isOpen ? document.body.classList.add("overflow") : document.body.classList.remove("overflow"); }, [isOpen]);

  return (
    <nav className="sm:hidden flex justify-end">
      <ButtonHamburguer className="backdrop-blur-lg p-2 border-black border rounded-md mr-5 mt-2 box-content" useModal={{ toggleModal, isOpen }} />
      {isOpen && createPortal( <div id="navigation-menu" className="flex fixed inset-0 z-10 text-white justify-center items-center overflow-hidden">
        <Aurora speed={0.7} className="fixed inset-0" />
        <ButtonHamburguer className="p-3 pr-1 rounded-full box-content z-[12] fixed top-[0.65rem] right-[0.65rem]" useModal={{ toggleModal, isOpen }} />
        <ul className="flex flex-col gap-12 border-black border rounded-md font-mono z-[12] backdrop-blur-3xl p-6">
          <li><a href="#inicio" onClick={closeModal}>Inicio</a></li>
          <li><a href="#sobreMi" onClick={closeModal}>Sobre Mí</a></li>
          <li><a href="#proyectos" onClick={closeModal}>Proyectos</a></li>
        </ul>
      </div>, document.getElementById("modal")!)}
    </nav>
  );
};

export default MenuHamb;