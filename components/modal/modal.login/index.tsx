import Botao from '@/components/botao';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Dispatch, Fragment } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    titulo: string;
    textoFooter: string | null;

    textoBotao1: string;
    urlBotao1: string | null;
    isNovaAba1: boolean | null;
    funcaoBotao1: any | null;
    isBtnEnabled1: boolean;

    textoBotao2: string | null;
    urlBotao2: string | null;
    isNovaAba2: boolean | null;
    funcaoBotao2: any | null;
    isBtnEnabled2: boolean;
}

export default function ModalLogin({ handleModal, titulo, textoFooter, textoBotao1, funcaoBotao1, urlBotao1, isNovaAba1, isBtnEnabled1, textoBotao2, funcaoBotao2, urlBotao2, isNovaAba2, isBtnEnabled2 }: iParametros) {
    return (
        <div className={Styles.main}>
            <div className={Styles.titulo}>
                <span>{(titulo ?? CONSTS_SISTEMA.NOME_SISTEMA)}</span>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.input}>
                <input className='inputAlt' type='email' placeholder='E-mail' />
                <input className='inputAlt' type='password' placeholder='Senha' />
            </div>

            <span className='separadorHorizontal'></span>
            <div className={Styles.botoes}>
                <Botao
                    texto={textoBotao1}
                    url={(urlBotao1 ?? '')}
                    isNovaAba={(isNovaAba1 ?? false)}
                    handleFuncao={() => { funcaoBotao1(), handleModal(false) }}
                    Svg={null}
                    refBtn={null}
                    isEnabled={isBtnEnabled1}
                    isPequeno={true}
                />

                {
                    textoBotao2 && (
                        <Botao
                            texto={textoBotao2}
                            url={(urlBotao2 ?? '')}
                            isNovaAba={(isNovaAba2 ?? false)}
                            handleFuncao={() => { funcaoBotao2() }}
                            Svg={null}
                            refBtn={null}
                            isEnabled={isBtnEnabled2}
                            isPequeno={true}
                        />
                    )
                }
            </div>

            {
                textoFooter && (
                    <Fragment>
                        <span className='separadorHorizontal'></span>
                        <span
                            className={Styles.footer}
                            dangerouslySetInnerHTML={{ __html: textoFooter }}
                        />
                    </Fragment>
                )
            }
        </div>
    )
}