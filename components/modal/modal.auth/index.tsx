import Botao from '@/components/botao';
import SeparadorHorizontal from '@/components/separador/separador.horizontal';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    titulo: string;
    textoFooter: string;
    funcaoFooter: () => void;

    textoBotao1: string;
    funcaoBotao1: () => void;

    textoBotao2: string;
    funcaoBotao2: () => void;

    setNomeCompleto: Dispatch<SetStateAction<string>> | null;
    setEmail: Dispatch<SetStateAction<string>>;
    setSenha: Dispatch<SetStateAction<string>>;
}

export default function ModalAuth({ handleModal, titulo, textoFooter, funcaoFooter, textoBotao1, funcaoBotao1, textoBotao2, funcaoBotao2, setNomeCompleto, setEmail, setSenha }: iParametros) {

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            funcaoBotao2();
        } else if (event.key === 'Escape') {
            handleModal(false);
        }
    }

    return (
        <div className={Styles.main}>
            <div className={Styles.titulo}>
                <span dangerouslySetInnerHTML={{ __html: (titulo ?? CONSTS_SISTEMA.NOME_SISTEMA) }} />
            </div>

            <SeparadorHorizontal />

            <div className={Styles.input}>
                {
                    setNomeCompleto && <input className='inputAlt' type='text' placeholder='Nome' onChange={(e) => setNomeCompleto(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                }

                <input className='inputAlt' type='email' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                <input className='inputAlt' type='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
            </div>

            <SeparadorHorizontal />

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

            <SeparadorHorizontal />

            <span
                className={Styles.footer}
                dangerouslySetInnerHTML={{ __html: textoFooter }}
                onClick={() => funcaoFooter()}
            />
        </div>
    )
}