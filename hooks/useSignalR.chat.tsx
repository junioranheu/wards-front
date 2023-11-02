import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import { iMensagem, iUsuarioOnline, listaMetodosSignalRChat } from '@/utils/types/iSignalR';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

export function useSignalRChat(hub: string) {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [mensagens, setMensagens] = useState<iMensagem[]>([]);
    const [listaUsuariosOnline, setListaUsuariosOnline] = useState<iUsuarioOnline[]>([]);

    useEffect(() => {
        nProgress.start();
        const newConnection = handleCriarNovaConecao(hub);
        handleIniciarServico(newConnection);
        handleRegistrarMetodosHub(newConnection);
        setConnection(newConnection);
        nProgress.done();

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            handleBeforeUnload();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

        function handleBeforeUnload() {
            newConnection.stop();
        }
    }, [hub]);

    function handleCriarNovaConecao(hub: string) {
        const token = Auth?.get()?.token ?? '';

        return new HubConnectionBuilder().
            withUrl(hub, { accessTokenFactory: () => token }).
            withAutomaticReconnect().
            build();
    }

    function handleIniciarServico(newConnection: HubConnection) {
        newConnection.start().then(() => {
            Aviso.toast('Conexão estabelecida com sucesso ao chat em tempo real', 3500, CONSTS_EMOJIS.SUCESSO, true);
        }).catch(
            (x) => Aviso.toast(`Erro ao estabelecer conexão com o chat: ${x}`, 10000, CONSTS_EMOJIS.ERRO, true)
        );
    }

    function handleRegistrarMetodosHub(newConnection: HubConnection) {
        if (!newConnection) {
            Aviso.toast('Erro ao estabelecer conexão com o chat', 5000, CONSTS_EMOJIS.ERRO, true)
            return;
        }

        newConnection.on(listaMetodosSignalRChat.EnviarMensagem, (resp: iMensagem) => {
            setMensagens((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalRChat.EnviarMensagemPrivada, (resp: iMensagem) => {
            setMensagens((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalRChat.ObterListaUsuariosOnline, (resp: iUsuarioOnline[]) => {
            setListaUsuariosOnline(resp);
        });
    }

    return {
        connection,
        mensagens,
        listaUsuariosOnline
    };
}