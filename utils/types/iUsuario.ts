export default interface iUsuario {
    usuarioId: number;
    nomeCompleto: string;
    email: string;
    nomeUsuarioSistema: string;
    token: string | null;
    usuarioTipoId: number;
    usuariosTipos: iUsuarioTipo;
    foto: string | null;
    dataRegistro: Date | null;
    dataOnline: Date | null;
    isAtivo: boolean;
    isPremium: boolean | null;
    isVerificado: boolean | null;
}

export interface iUsuarioTipo {
    usuarioTipoId: number;
    tipo: string;
    descricao: string | null;
    isAtivo: boolean;
    dataRegistro: Date;
}