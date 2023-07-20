import { Dispatch, SetStateAction } from 'react';

interface iParametros {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    escala: number;
}

export default function IconeHamburguer({ isOpen, setIsOpen, escala }: iParametros) {

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        isOpen ? (
            <svg
                viewBox='-0.5 0 25 25'
                style={{ transform: `scale(${escala})` }}
                onClick={() => handleClick()}
            >
                <path d='M3 21.32L21 3.32001' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M3 3.32001L21 21.32' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ) : (
            <svg
                viewBox='0 0 50 50'
                style={{ transform: `scale(${escala})` }}
                onClick={() => handleClick()}
            >
                <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z' />
            </svg>
        )
    )
}