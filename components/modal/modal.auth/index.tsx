import Botao from '@/components/botao';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Dispatch, SetStateAction } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    titulo: string;
    textoFooter: string;

    textoBotao1: string;
    funcaoBotao1: () => void;

    textoBotao2: string;
    funcaoBotao2: () => void;

    setEmail: Dispatch<SetStateAction<string>>;
    setSenha: Dispatch<SetStateAction<string>>;
}

export default function ModalAuth({ handleModal, titulo, textoFooter, textoBotao1, funcaoBotao1, textoBotao2, funcaoBotao2, setEmail, setSenha }: iParametros) {
    return (
        <div className={Styles.main}>
            <div className={Styles.titulo}>
                <span>{(titulo ?? CONSTS_SISTEMA.NOME_SISTEMA)}</span>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.input}>
                <input className='inputAlt' type='email' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                <input className='inputAlt' type='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
            </div>

            <span className='separadorHorizontal'></span>
            <div className={Styles.botoes}>
                <Botao
                    texto={textoBotao1}
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => { funcaoBotao1(), handleModal(false) }}
                    Svg={null}
                    refBtn={null}
                    isEnabled={true}
                    isPequeno={true}
                />

                <Botao
                    texto={textoBotao2}
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => funcaoBotao2()}
                    Svg={null}
                    refBtn={null}
                    isEnabled={true}
                    isPequeno={true}
                />
            </div>

            <span className='separadorHorizontal'></span>
            <span
                className={Styles.footer}
                dangerouslySetInnerHTML={{ __html: textoFooter }}
            />
        </div>
    )
}