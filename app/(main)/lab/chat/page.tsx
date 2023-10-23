'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import { useSignalR } from '@/hooks/useSignalR';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import formatarData from '@/utils/functions/formatar.data';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { iMensagem, iUsuarioOnline } from '@/utils/types/iSignalR';
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react';
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
    const refMensagens = useRef<HTMLDivElement>(null);
    const refMensagensRaw = 'refMensagensRaw';

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

        setTimeout(() => {
            handleScroll();
        }, 500);
    }

    function handleScroll() {
        const listaMensagens = refMensagens?.current?.children;

        if (!listaMensagens?.length) {
            return false;
        }

        const ultimaMensagem = listaMensagens[listaMensagens.length - 1];

        if (ultimaMensagem) {
            // @ts-ignore;
            const topPos = ultimaMensagem.offsetTop;
            document.getElementsByClassName(refMensagensRaw)[0].scrollTop = topPos;
        }
    }

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleEnviarMensagem();
        }
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
                <div className={`${Styles.mensagens} ${refMensagensRaw}`} ref={refMensagens}>
                    {
                        mensagens.map((m: iMensagem, index: number) => (
                            <div key={index} className={Styles.mensagem}>
                                <span className={`${Styles.texto} ${(m.isSistema ? Styles.sistema : '')} ${(m.usuarioIdDestinatario ? Styles.privado : '')}`}>
                                    {
                                        !m.isSistema ? <strong>{m.usuarioNome}: </strong> : <Fragment></Fragment>
                                    }

                                    {m.mensagem}
                                </span>

                                <span className={Styles.timestamp}>•</span>
                                <span className={Styles.timestamp}>{formatarData(m.timestamp, 2).toLocaleLowerCase()}</span>
                            </div>
                        ))
                    }
                </div>

                <div className={Styles.inputs}>
                    {
                        usuarioSelecionado && (
                            <span className={Styles.avisoUsuarioSelecionado} onClick={() => setUsuarioSelecionado('')}>
                                {usuarioSelecionado ? `Enviando mensagem privada para ${usuarioSelecionado}. Clique aqui para cancelar envio privado` : ''}
                            </span>
                        )
                    }

                    <input
                        type='text'
                        className='inputAlt'
                        placeholder='Escreva sua mensagem aqui...'
                        value={inputMensagem}
                        onChange={(e) => setInputMensagem(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e)}
                    />

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