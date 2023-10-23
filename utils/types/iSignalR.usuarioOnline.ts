import iErro from './iErro';

export default interface iSignalRUsuarioOnline extends iErro {
    usuarioNome: string | null;
    usuarioId: string | null;
    connectionId: string | null;
    timestamp: Date;
}