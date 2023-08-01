import iErro from './iErro';

export default interface iUsuario extends iErro {
    usuarioId: number;
    nomeCompleto: string;
    nomeUsuarioSistema: string;
    email: string;
    chamado: string;
    foto: string;
    isAtivo: boolean;
    data: Date | string;
    usuarioRoles?: iUsuarioRole[];
    token: string;
    refreshToken: string | null;
}

export interface iUsuarioRole {
    usuarioId: number;
    roleId: string;
    roles: iRole;
}

export interface iRole {
    roleId: number;
    tipo: string;
    descricao: string;
    isAtivo: boolean;
    data: Date | string;
}