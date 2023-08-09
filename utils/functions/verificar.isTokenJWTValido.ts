import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from './aviso';
import gerarNumeroAleatorio from './gerar.numeroAleatorio';
import setDesabilitarBotoes from './set.desabilitarBotoes';

export function verificarIsTokenJWTValido(token: string): boolean {
    const [headerBase64, payloadBase64, signature] = token.split('.');
    const isAuth = Auth?.get()?.isAuth ?? false;

    // console.log('headerBase64', headerBase64);
    // console.log('payloadBase64', payloadBase64);
    // console.log('signature', signature);

    if (!payloadBase64) {
        if (isAuth) {
            Aviso.toast('Token JWT inválido', 5500, CONSTS_EMOJIS.ERRO, true);
        }

        return false;
    }

    try {
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
        const currentTime = Math.floor(Date.now() / 1000);
        // console.log(payload.exp, currentTime);

        if (payload.exp && payload.exp > currentTime) {
            // Aviso.toast('Token válido', 5500, CONSTS_EMOJIS.SUCESSO, true);
            return true;
        }

        if (isAuth) {
            Aviso.toast('Token JWT expirado. Faça logoff e entre novamente!', 5500, CONSTS_EMOJIS.ERRO, true);
            setDesabilitarBotoes(true);

            setTimeout(() => {
                window.location.href = CONSTS_TELAS.ERRO;
            }, gerarNumeroAleatorio(3000, 5000));
        }

        return false;
    } catch (error: any) {
        console.error('Erro ao decodar o token JWT:', error);
        return false;
    }
}