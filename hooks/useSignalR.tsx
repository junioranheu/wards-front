import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import { iMensagem, iUsuarioOnline } from '@/utils/types/iSignalR';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

export function useSignalR(hub: string) {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [mensagens, setMensagens] = useState<iMensagem[]>([]);
    const [listaUsuariosOnline, setListaUsuariosOnline] = useState<iUsuarioOnline[]>([]);

    enum listaMetodosSignalR {
        EnviarMensagem = 'EnviarMensagem',
        EnviarMensagemPrivada = 'EnviarMensagemPrivada',
        ObterListaUsuariosOnline = 'ObterListaUsuariosOnline'
    }

    useEffect(() => {
        const newConnection = handleCriarNovaConecao(hub);
        handleIniciarServico(newConnection);
        handleRegistrarMetodosHub(newConnection);
        setConnection(newConnection);

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
            Aviso.toast('Conexão estabelecida com sucesso com o chat em tempo real', 3500, CONSTS_EMOJIS.SUCESSO, true);
        }).catch(
            (x) => Aviso.toast(`Erro ao estabelecer conexão com o chat: ${x}`, 10000, CONSTS_EMOJIS.ERRO, true)
        );
    }

    function handleRegistrarMetodosHub(newConnection: HubConnection) {
        if (!newConnection) {
            Aviso.toast('Erro ao estabelecer conexão com o chat', 5000, CONSTS_EMOJIS.ERRO, true)
            return;
        }

        newConnection.on(listaMetodosSignalR.EnviarMensagem, (resp: iMensagem) => {
            setMensagens((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.EnviarMensagemPrivada, (resp: iMensagem) => {
            setMensagens((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.ObterListaUsuariosOnline, (resp: iUsuarioOnline[]) => {
            setListaUsuariosOnline(resp);
        });
    }

    return {
        connection,
        listaMetodosSignalR,
        mensagens,
        listaUsuariosOnline
    };
}