import base from '@/utils/api/base';

const controller = 'api/Usuarios';

const CONSTS_USUARIOS = {
    autenticar: `${base}/${controller}/autenticar`,
    criar: `${base}/${controller}`,
    obter: `${base}/${controller}`,
    listar: `${base}/${controller}/listar`,
};

export default CONSTS_USUARIOS;