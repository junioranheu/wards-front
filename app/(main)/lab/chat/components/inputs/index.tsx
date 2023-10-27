import Styles from '@/app/(main)/lab/chat/chat.module.scss';
import Botao from '@/components/botao';
import { listaMetodosSignalRChat } from '@/utils/types/iSignalR';
import { HubConnection } from '@microsoft/signalr';
import { Dispatch, KeyboardEvent, RefObject, SetStateAction, useState } from 'react';

interface iParametros {
    connection: HubConnection | null;
    usuarioSelecionado: string | null;
    setUsuarioSelecionado: Dispatch<SetStateAction<string | null>>;
    refMensagens: RefObject<HTMLDivElement>;
    refMensagensRaw: string;
}

export default function Inputs({ connection, usuarioSelecionado, setUsuarioSelecionado, refMensagens, refMensagensRaw }: iParametros) {

    const [inputMensagem, setInputMensagem] = useState<string>('');

    function handleEnviarMensagem() {
        if (!connection || !inputMensagem.trim()) {
            return;
        }

        if (usuarioSelecionado) {
            connection.invoke(listaMetodosSignalRChat.EnviarMensagemPrivada, usuarioSelecionado, inputMensagem, false);
        } else {
            connection.invoke(listaMetodosSignalRChat.EnviarMensagem, inputMensagem, false);
        }

        setInputMensagem('');

        setTimeout(() => {
            handleScroll();
        }, 500);
    }

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleEnviarMensagem();
        }
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

    return (
        <div className={Styles.inputs}>
            {
                usuarioSelecionado && (
                    <span
                        className={Styles.avisoUsuarioSelecionado}
                        onClick={() => setUsuarioSelecionado('')}
                    >
                        {usuarioSelecionado ? `Enviando mensagem privada para ${usuarioSelecionado}. Clique aqui para cancelar o envio privado` : ''}
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
    )
}