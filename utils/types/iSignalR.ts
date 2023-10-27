import { Guid } from 'guid-typescript';
import iErro from './iErro';

export interface iMensagem extends iErro {
    guid: Guid;
    mensagem: string;
    usuarioNome: string | null;
    usuarioId: string | null;
    usuarioNomeDestinatario: string | null;
    usuarioIdDestinatario: string | null;
    timestamp: Date;
    isSistema: boolean;
}

export interface iUsuarioOnline extends iErro {
    usuarioNome: string | null;
    usuarioId: string | null;
    connectionId: string | null;
    timestamp: Date;
}

export enum listaMetodosSignalRChat {
    EnviarMensagem = 'EnviarMensagem',
    EnviarMensagemPrivada = 'EnviarMensagemPrivada',
    ObterListaUsuariosOnline = 'ObterListaUsuariosOnline'
}

export enum listaMetodosSignalRLog {
    ExibirNovoRequest = 'ExibirNovoRequest'
}