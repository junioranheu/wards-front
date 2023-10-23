import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import iSignalR from '@/utils/types/iSignalR.response';
import iSignalRUsuarioOnline from '@/utils/types/iSignalR.usuarioOnline';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

export function useSignalR(hub: string) {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [mensagensPublico, setMensagensPublico] = useState<iSignalR[]>([]);
    const [mensagensPrivado, setMensagensPrivado] = useState<iSignalR[]>([]);
    const [listaUsuariosOnline, setListaUsuariosOnline] = useState<iSignalRUsuarioOnline[]>([]);

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

        newConnection.on(listaMetodosSignalR.EnviarMensagem, (resp: iSignalR) => {
            setMensagensPublico((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.EnviarMensagemPrivada, (resp: iSignalR) => {
            console.log('setMensagensPrivado', resp);
            setMensagensPrivado((x) => [...x, resp]);
        });

        newConnection.on(listaMetodosSignalR.ObterListaUsuariosOnline, (resp: iSignalRUsuarioOnline[]) => {
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