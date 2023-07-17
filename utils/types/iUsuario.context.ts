import { StaticImageData } from 'next/image';

export default interface iUsuarioContext {
    nomeCompleto: string;
    email: string;
    foto: StaticImageData | null;
    isAuth: boolean;
}