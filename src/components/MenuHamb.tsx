import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import ButtonHamburguer from "./ButtonHamburguer";
import Aurora from "@/animations/Aurora";
import SplashCursor from "@/animations/SplashCursor";


const MenuHamb = () => {
  const {toggleModal, closeModal, isOpen } = useModal();

  return (
    <nav className="sm:hidden flex justify-end">
      <ButtonHamburguer className="backdrop-blur-lg p-2 border-black border rounded-md mr-5 mt-2 box-content" useModal={{toggleModal, isOpen}} />
      {createPortal(
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-10 text-white justify-center items-center`}>
          <Aurora speed={0.7} className="fixed inset-0"/> 
          <SplashCursor className="z-[11] size-full" />
          <ButtonHamburguer className="p-2 border-black backdrop-contrast-200 pr-1 border rounded-md box-content z-[12] fixed top-[0.65rem] right-[0.65rem]" useModal={{toggleModal, isOpen}} />
          <ul className="flex flex-col gap-12 border-black border rounded-md font-mono z-[12] backdrop-blur-3xl p-6">
            <li><a href="#inicio" className="decrypt" data-value="Inicio" onClick={closeModal}>Inicio</a></li>
            <li><a href="#sobreMi" className="decrypt" data-value="Sobre Mí" onClick={closeModal}>Sobre Mí</a></li>
            <li><a href="#proyectos" className="decrypt" data-value="Proyectos" onClick={closeModal}>Proyectos</a></li>
          </ul>
        </div>
      , document.getElementById("modal")!)}
    </nav>
  )
}

export default MenuHamb;