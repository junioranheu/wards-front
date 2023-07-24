import base from '@/utils/api/base';

const controller = 'api/Wards';

const CONSTS_WARDS = {
    listar: `${base}/${controller}/listar`,
    obter: `${base}/${controller}`,
    obterAleatorio: `${base}/${controller}/obterAleatorio`
};

export default CONSTS_WARDS;