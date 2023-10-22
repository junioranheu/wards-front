'use client';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import { Auth } from '@/utils/context/usuarioContext';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iSignalR from '@/utils/types/iSignalR.response';
import { ChangeEvent, useEffect, useState } from 'react';
import Styles from './chat.module.scss';

export default function Page() {

    useTitulo('Lab // Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([], true);
    }, [isAuth]);

    const { connection, listaMetodosSignalR, mensagensPublico, mensagensPrivado } = useSignalR(`${base}/chatHub`, Auth.get()?.nomeCompleto!, Auth.get()?.email!);
    const [inputMensagem, setInputMensagem] = useState<string>('');

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputMensagem(event.target.value);
    }

    function handleSendMessage() {
        if (connection && inputMensagem.trim()) {
            connection.invoke(listaMetodosSignalR.EnviarMensagem, inputMensagem);
            setInputMensagem('');
        }
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Chat</span>

                <div>
                    <input type="text" value={inputMensagem} onChange={handleInputChange} />
                    <button onClick={() => handleSendMessage()}>Send</button>
                </div>

                <ul>
                    {
                        mensagensPublico.map((m: iSignalR, index) => (
                            <li key={index}>{m.usuarioNome}: {m.mensagem}</li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}