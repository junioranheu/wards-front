import iErro from './iErro';

export default interface iHashtag extends iErro {
    hashtagId: number;
    tag: string;
    isAtivo: boolean;
    data: Date | string;
}