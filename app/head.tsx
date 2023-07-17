'use import';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Fragment } from 'react';

export default function Head() {
    return (
        <Fragment>
            <title>{CONSTS_SISTEMA.NOME_SISTEMA}</title>
            <meta name='description' content={`${CONSTS_SISTEMA.DESCRICAO_SISTEMA}`} />
            <meta name='keywords' content={CONSTS_SISTEMA.KEYWORDS_SISTEMA} />
            <meta name='author' content='junioranheu' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='theme-color' content={CONSTS_SISTEMA.COR_SISTEMA} />
            <meta name='robots' content='index' />
            <link rel='icon' href='/favicon.png' />
        </Fragment>
    )
}