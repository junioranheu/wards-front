'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { iMensagem, iUsuarioOnline } from '@/utils/types/iSignalR';
import { Fragment, useEffect, useState } from 'react';
import Styles from './chat.module.scss';

export default function Page() {

    useTitulo('Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([], true);
    }, [isAuth]);

    const { connection, listaMetodosSignalR, mensagens, listaUsuariosOnline } = useSignalR(`${base}/chatHub`);
    const [inputMensagem, setInputMensagem] = useState<string>('');
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>('');

    function handleToggleSelecionarUsuario(usuario: string | null) {
        if (usuarioSelecionado === usuario) {
            setUsuarioSelecionado('');
            return;
        }

        setUsuarioSelecionado(usuario);
    }

    function handleEnviarMensagem() {
        if (!connection || !inputMensagem.trim()) {
            return;
        }

        if (usuarioSelecionado) {
            connection.invoke(listaMetodosSignalR.EnviarMensagemPrivada, usuarioSelecionado, inputMensagem, false);
        } else {
            connection.invoke(listaMetodosSignalR.EnviarMensagem, inputMensagem, false);
        }

        setInputMensagem('');
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.usuarios}>
                <span>Usuários on-line</span>

                <ul>
                    {
                        listaUsuariosOnline.map((x: iUsuarioOnline, index) => (
                            <li
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                    padding: '5px',
                                    background: x.usuarioId === usuarioSelecionado ? 'var(--principal)' : 'transparent',
                                }}
                                onClick={() => handleToggleSelecionarUsuario(x.usuarioId)}
                            >
                                {x.usuarioNome}
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={Styles.chat}>
                <div className={Styles.mensagens}>
                    {
                        mensagens.map((m: iMensagem, index) => (
                            <div key={index} className={`${Styles.mensagem} ${(m.isSistema ? Styles.sistema : '')}`}>
                                {m.usuarioIdDestinatario ? <small>from {m.usuarioNome}</small> : <Fragment></Fragment>}

                                <strong>{m.usuarioNome}:</strong> {m.mensagem} [{m.timestamp.toString()}]
                            </div>
                        ))
                    }
                </div>

                <div className={Styles.inputs}>
                    <span>{usuarioSelecionado ? `Enviar mensagem privada a ${usuarioSelecionado}` : ''}</span>
                    <input type='text' className='inputAlt' value={inputMensagem} onChange={(e) => setInputMensagem(e.target.value)} />

                    <Botao
                        texto='Enviar mensagem'
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => handleEnviarMensagem()}
                        Svg={null}
                        refBtn={null}
                        isEnabled={true}
                        isPequeno={true}
                    />
                </div>
            </div>
        </section>
    )
}