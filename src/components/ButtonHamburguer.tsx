interface ButtonHamburguerProps {
    className: string,
    useModal: {
        toggleModal: () => void,
        isOpen: boolean
    }
}

const ButtonHamburguer: React.FC<ButtonHamburguerProps> = ({className, useModal}) => {
    const {toggleModal, isOpen} = useModal;
    return (
        <button 
            onClick={toggleModal} 
            className={`text-white flex flex-col size-[1.5rem] justify-around ${className}`}
            aria-label="Menú principal"
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
        >
            <div className={`bg-white h-[2px] w-full transition-all origin-left duration-[400ms] ${isOpen ? "rotate-[45deg]": ""}`}></div>
            <div className={`bg-white h-[2px] w-full transition-all origin-left duration-[400ms] ${isOpen ? "opacity-0" : ""}`}></div>
            <div className={`bg-white h-[2px] w-full transition-all origin-left duration-[400ms] ${isOpen ? "rotate-[-45deg]" : ""}`}></div>
            <span className="sr-only">Abrir menú</span>
        </button>
    )
}
export default ButtonHamburguer;