import iErro from './iErro';
import iUsuario from './iUsuario';

export default interface iWard extends iErro {
    wardId: number;
    titulo: string;
    imagemPrincipalBlob?: string;
    conteudo: string;

    usuarioId: string;
    usuarios: iUsuario;
    data: Date | string;

    usuarioModId: boolean;
    usuariosMods: iUsuario | null;
    dataMod: Date | string;

    isAtivo: boolean;
}