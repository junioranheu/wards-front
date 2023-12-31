import ImgLogo from '@/assets/images/outros/logo.webp';
import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_MODAL from '@/utils/consts/modal.tamanho';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, ReactNode, useState } from 'react';
import BotaoFecharModal from './_botaoFecharModal';
import Styles from './_modal.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    logo: StaticImageData | null | undefined;
    isExibirApenasLogo: boolean;
    titulo: string | null;
    children: ReactNode;
    tamanho: typeof CONSTS_MODAL.MENOR | typeof CONSTS_MODAL.PEQUENO | typeof CONSTS_MODAL.MEDIO | typeof CONSTS_MODAL.GRANDE | typeof CONSTS_MODAL.GIGANTE | typeof CONSTS_MODAL.NULL;
    isCentralizado: boolean;
    isFecharModalClicandoNoFundo: boolean;
}

export default function ModalLayout({ handleModal, logo, isExibirApenasLogo, titulo, children, tamanho, isCentralizado, isFecharModalClicandoNoFundo }: iParametros) {

    useEsconderScroll();
    const [animarDiv, setAnimarDiv] = useState<string>('');

    return (
        <section
            className={Styles.fundo}
            onMouseDown={(e) => FecharModal.fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo, handleModal, e, setAnimarDiv)}
        >
            <div className={animarDiv}>
                <div className={`${Styles.modal} ${(tamanho === CONSTS_MODAL.GIGANTE ? Styles.modalGigante : tamanho === CONSTS_MODAL.GRANDE ? Styles.modalGrande : tamanho === CONSTS_MODAL.PEQUENO ? Styles.modalPequeno : tamanho === CONSTS_MODAL.MENOR ? Styles.modalMenor : '')} animate__animated animate__fadeIn animate__faster`}>
                    <div className={Styles.divCabecalho}>
                        <BotaoFecharModal fecharModal={() => FecharModal.fecharModalClicandoNoBotao(handleModal)} />

                        {
                            <div className={Styles.cabecalhoTitulo}>
                                {
                                    isExibirApenasLogo ? (
                                        <Image src={(logo ? logo : ImgLogo)} className={Styles.logo} alt='' />
                                    ) : (
                                        titulo && (
                                            <div dangerouslySetInnerHTML={{ __html: titulo }} />
                                        )
                                    )
                                }
                            </div>
                        }
                    </div>

                    <div className={Styles.divPrincipal}>
                        <div className={`${Styles.conteudo} ${(isCentralizado && Styles.centralizarConteudo)}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const FecharModal = {
    fecharModalClicandoNoBotao(handleModal: any) {
        handleModal();
    },

    fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo: boolean, handleModal: any, e: any, setAnimarDiv: Dispatch<string>) {
        // console.log(e.target);
        if (e.target.className.toString().includes('fundo')) {
            // Se for permitido fechar clicando no fundo, feche;
            if (isFecharModalClicandoNoFundo) {
                handleModal();
                return false;
            }

            // Se não for permitido fechar clicando no fundo, faça a animação apenas;
            setAnimarDiv('animate__animated animate__shakeX');
            setTimeout(function () {
                setAnimarDiv('');
            }, 700);
        }
    }
}