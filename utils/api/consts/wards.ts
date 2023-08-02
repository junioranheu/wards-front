import base from '@/utils/api/base';

const controller = 'api/Wards';

const CONSTS_WARDS = {
    listar: `${base}/${controller}/listar`,
    obter: `${base}/${controller}`,
    obterAleatorio: `${base}/${controller}/obterAleatorio`,
    criar: `${base}/${controller}`,
    atualizar: `${base}/${controller}`,
};

export default CONSTS_WARDS;