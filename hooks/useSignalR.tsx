import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import iSignalR from '@/utils/types/iSignalR.response';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

export function useSignalR(hub: string, usuario: string, usuarioId: string) {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [mensagensPublico, setMensagensPublico] = useState<iSignalR[]>([]);
    const [mensagensPrivado, setMensagensPrivado] = useState<iSignalR[]>([]);
    const [listaUsuariosOnline, setListaUsuariosOnline] = useState<string[]>([]);

    enum listaMetodosSignalR {
        EnviarMensagem = 'EnviarMensagem',
        EnviarMensagemPrivada = 'EnviarMensagemPrivada',
        ObterListaUsuariosOnline = 'ObterListaUsuariosOnline'
    }

    useEffect(() => {
        const newConnection = handleCriarNovaConecao(hub, usuario, usuarioId);
        handleIniciarServico(newConnection);
        handleRegistrarMetodosHub(newConnection);
        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, [hub, usuario, usuarioId]);

    function handleCriarNovaConecao(hub: string, usuario: string, usuarioId: string) {
        return new HubConnectionBuilder().
            withUrl(`${hub}/?usuario=${usuario}&usuarioId=${usuarioId}`).
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

        newConnection.on(listaMetodosSignalR.EnviarMensagem, (resp: iSignalR) => {
            setMensagensPublico((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.EnviarMensagemPrivada, (resp: iSignalR) => {
            setMensagensPrivado((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.ObterListaUsuariosOnline, (resp: string[]) => {
            setListaUsuariosOnline(resp);
        });
    }

    return {
        connection,
        listaMetodosSignalR,
        mensagensPublico,
        mensagensPrivado,
        listaUsuariosOnline
    };
}