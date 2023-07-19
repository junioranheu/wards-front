interface iParametros {
    escala: number;
    handleFuncao: () => void;
}

export default function IconeHamburguer({ escala, handleFuncao }: iParametros) {

    function handleClick() {
        if (handleFuncao) {
            handleFuncao();
        }
    }

    return (
        <svg
            viewBox='0 0 50 50'
            style={{ transform: `scale(${escala})` }}
            onClick={() => handleClick()}
        >
            <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z' />
        </svg>
    )
}