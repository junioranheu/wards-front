import { StaticImageData } from 'next/image';
import { iUsuarioRole } from './iUsuario';

export default interface iUsuarioContext {
    nomeCompleto: string;
    email: string;
    foto: StaticImageData | null;
    usuarioRoles?: iUsuarioRole[];
    isAuth: boolean;
    token: string;
}