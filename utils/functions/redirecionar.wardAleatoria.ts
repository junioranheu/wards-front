import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import iWard from '@/utils/types/iWard';
import CONSTS_EMOJIS from '../consts/emojis';
import CONSTS_TELAS from '../consts/telas';
import { Aviso } from './aviso';
import normalizarURL from './normalizar.URL';

export default async function redirecionarWardAleatoria() {
    const ward = await Fetch.getApi(CONSTS_WARDS.obterAleatorio) as iWard;

    if (!ward) {
        Aviso.toast('Parece que houve um problema ao buscar uma ward aleatória. Tente novamente mais tarde', 5500, CONSTS_EMOJIS.ERRO, true);
        return false;
    }

    window.location.href = `${CONSTS_TELAS.WARD}/${ward.wardId}/${normalizarURL(ward.titulo)}`;
}