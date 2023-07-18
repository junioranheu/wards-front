import base from '@/utils/api/base';

const controller = 'api/Newsletters';

const CONSTS_NEWS_LETTERS = {
    criar: `${base}/${controller}`,
    listar: `${base}/${controller}/listar`,
};

export default CONSTS_NEWS_LETTERS;