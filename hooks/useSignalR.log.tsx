import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import iLog from '@/utils/types/iLog';
import { listaMetodosSignalRLog } from '@/utils/types/iSignalR';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

export function useSignalRLog(hub: string) {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [logs, setLogs] = useState<iLog[]>([]);

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
        return new HubConnectionBuilder().
            withUrl(hub).
            withAutomaticReconnect().
            build();
    }

    function handleIniciarServico(newConnection: HubConnection) {
        newConnection.start().then(() => {
            Aviso.toast('Conexão estabelecida com sucesso com o servidor em tempo real', 3500, CONSTS_EMOJIS.SUCESSO, true);
        }).catch(
            (x) => Aviso.toast(`Erro ao estabelecer conexão com o servidor: ${x}`, 10000, CONSTS_EMOJIS.ERRO, true)
        );
    }

    function handleRegistrarMetodosHub(newConnection: HubConnection) {
        if (!newConnection) {
            Aviso.toast('Erro ao estabelecer conexão com o servidor', 5000, CONSTS_EMOJIS.ERRO, true)
            return;
        }

        newConnection.on(listaMetodosSignalRLog.ExibirNovoRequest, (resp: iLog) => {
            setLogs((x) => [...x, resp]);
        });
    }

    return {
        connection,
        logs
    };
}