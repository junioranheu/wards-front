import { Guid } from 'guid-typescript';
import iErro from './iErro';

export default interface iSignalR extends iErro {
    guid: Guid;
    mensagem: string;
    usuarioNome: string | null;
    usuarioId: string | null;
    usuarioNomeDestinatario: string | null;
    usuarioIdDestinatario: string | null;
    timestamp: Date;
}