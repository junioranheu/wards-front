import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import { iUsuarioOnline } from '@/utils/types/iSignalR';
import { Dispatch, SetStateAction } from 'react';

interface iParametros {
    listaUsuariosOnline: iUsuarioOnline[];
    usuarioSelecionado: string | null;
    setUsuarioSelecionado: Dispatch<SetStateAction<string | null>>;
}

export default function Usuarios({ listaUsuariosOnline, usuarioSelecionado, setUsuarioSelecionado }: iParametros) {

    function handleToggleSelecionarUsuario(usuario: string | null) {
        if (usuarioSelecionado === usuario) {
            setUsuarioSelecionado('');
            return;
        }

        if (Auth.get()?.email === usuario) {
            Aviso.toast('Você não pode enviar uma mensagem privada a você mesmo', 5500, CONSTS_EMOJIS.ERRO, true);
            return;
        }

        setUsuarioSelecionado(usuario);
    }

    return (
        <ul>
            {
                listaUsuariosOnline.map((x: iUsuarioOnline, index: number) => (
                    <li
                        key={index}
                        style={{
                            background: x.usuarioId === usuarioSelecionado ? 'var(--bege)' : 'transparent',
                        }}
                        onClick={() => handleToggleSelecionarUsuario(x.usuarioId)}
                    >
                        {x.usuarioNome}
                        {(x.usuarioId === Auth.get()?.email) ? ' ⭐' : ''}
                    </li>
                ))
            }
        </ul>
    )
}