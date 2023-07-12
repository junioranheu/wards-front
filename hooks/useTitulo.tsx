import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { useEffect } from 'react';

export default function useTitulo(titulo: string, isUsarSufixoPadrao: boolean) {

    useEffect(() => {
        document.title = `${titulo} ${(isUsarSufixoPadrao ? CONSTS_SISTEMA.NOME_SISTEMA : '')}`;
    }, [titulo, isUsarSufixoPadrao]);

}