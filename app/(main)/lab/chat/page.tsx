'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iSignalR from '@/utils/types/iSignalR.response';
import iSignalRUsuarioOnline from '@/utils/types/iSignalR.usuarioOnline';
import { useEffect, useState } from 'react';
import Styles from './chat.module.scss';

export default function Page() {

    useTitulo('Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([], true);
    }, [isAuth]);

    const { connection, listaMetodosSignalR, mensagensPublico, mensagensPrivado, listaUsuariosOnline } = useSignalR(`${base}/chatHub`);
    const [inputMensagem, setInputMensagem] = useState<string>('');
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>('');

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
            <div className={Styles.titulo}>
                <span>Chat</span>
            </div>

            <div className={Styles.container}>
                <div className={Styles.usuarios}>
                    <h2>Usuários</h2>
                    <ul>
                        {
                            listaUsuariosOnline.map((x: iSignalRUsuarioOnline, index) => (
                                <li
                                    key={index}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        background: x.usuarioId === usuarioSelecionado ? '#eee' : 'transparent',
                                    }}
                                    onClick={() => setUsuarioSelecionado(x.usuarioId)}
                                >
                                    {x.usuarioNome}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={Styles.chat}>
                    <div className={Styles.mensagem}>
                        {
                            mensagensPublico.map((m: iSignalR, index) => (
                                <div key={index} className={(m.isSistema ? Styles.sistema : '')}>
                                    <strong>{m.usuarioNome}:</strong> {m.mensagem} [{m.timestamp.toString()}]
                                </div>
                            ))
                        }
                    </div>

                    <div className={Styles.mensagem}>
                        {
                            mensagensPrivado.map((m: iSignalR, index) => (
                                <div key={index} className={(m.isSistema ? Styles.sistema : '')}>
                                    <strong>{m.usuarioNome}:</strong> {m.mensagem} [{m.timestamp.toString()}]
                                </div>
                            ))
                        }
                    </div>

                    <div>
                        <h2>{usuarioSelecionado ? `Enviar mensagem privada a ${usuarioSelecionado}` : ''}</h2>
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
            </div>
        </section>
    )
}