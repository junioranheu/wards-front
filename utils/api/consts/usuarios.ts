import base from '@/utils/api/base';

const controller = 'api/Usuarios';

const CONSTS_USUARIOS = {
    criar: `${base}/${controller}`,
    obter: `${base}/${controller}`,
    listar: `${base}/${controller}/listar`,
    listarUsuarioPerfis: `${base}/${controller}/listarUsuarioPerfis`
};

export default CONSTS_USUARIOS;