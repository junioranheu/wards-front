'use client';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import { Auth } from '@/utils/context/usuarioContext';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iSignalR from '@/utils/types/iSignalR.response';
import { useEffect, useState } from 'react';
import Styles from './chat.module.scss';

export default function Page() {

    useTitulo('Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([], true);
    }, [isAuth]);

    const { connection, listaMetodosSignalR, mensagensPublico, mensagensPrivado, listaUsuariosOnline } = useSignalR(`${base}/chatHub`, Auth.get()?.nomeCompleto!, Auth.get()?.email!);
    const [inputMensagem, setInputMensagem] = useState<string>('');

    function handleSendMessage() {
        if (connection && inputMensagem.trim()) {
            connection.invoke(listaMetodosSignalR.EnviarMensagem, inputMensagem, false);
            setInputMensagem('');
        }
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Chat</span>

                {/* <span>Pessoas on-line</span> */}

                <div>
                    <input type='text' value={inputMensagem} onChange={(e) => setInputMensagem(e.target.value)} />
                    <button onClick={() => handleSendMessage()}>Enviar mensagem</button>
                </div>

                <ul>
                    {
                        listaUsuariosOnline.map((x: string, index) => (
                            <li key={index}>{x}</li>
                        ))
                    }
                </ul>

                <hr />

                <ul>
                    {
                        mensagensPublico.map((m: iSignalR, index) => (
                            <li key={index}>
                                {
                                    m.isSistema ? <b>aea</b> : ''
                                }

                                {m.usuarioNome}: {m.mensagem}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}