'use client';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { useEffect, useRef, useState } from 'react';
import Styles from './chat.module.scss';
import Inputs from './components/inputs';
import Mensagens from './components/mensagens';
import Usuarios from './components/usuarios';

export default function Page() {

    useTitulo('Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([], true);
    }, [isAuth]);

    const { connection, mensagens, listaUsuariosOnline } = useSignalR(`${base}/chatHub`);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>('');

    const refMensagens = useRef<HTMLDivElement>(null);
    const refMensagensRaw = 'refMensagensRaw';

    return (
        <section className={Styles.main}>
            <div className={Styles.usuarios}>
                <span>Usuários on-line</span>

                <Usuarios
                    listaUsuariosOnline={listaUsuariosOnline}
                    usuarioSelecionado={usuarioSelecionado}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                />
            </div>

            <div className={Styles.chat}>
                <Mensagens
                    mensagens={mensagens}
                    refMensagens={refMensagens}
                    refMensagensRaw={refMensagensRaw}
                />

                <Inputs
                    connection={connection}
                    usuarioSelecionado={usuarioSelecionado}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    refMensagens={refMensagens}
                    refMensagensRaw={refMensagensRaw}
                />
            </div>
        </section>
    )
}