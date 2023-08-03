import ImgCinza from '@/assets/images/outros/cinza.webp';
import Botao from '@/components/botao';
import ModalLayout from '@/components/modal/_modal.layout';
import ModalWrapper from '@/components/modal/_modal.wrapper';
import ModalUpload from '@/components/modal/modal.upload';
import CONSTS_MODAL from '@/utils/consts/modal.tamanho';
import converterSrcImagemParaBase64 from '@/utils/functions/converter.srcImagemParaBase64';
import Image from 'next/image';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import Styles from './divUpload.module.scss';

interface iParametros {
    imagem: string | null;
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;

    arquivoUpload: string | null;
    setArquivoUpload: Dispatch<string>;
}

export default function DivUpload({ imagem, titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita, arquivoUpload, setArquivoUpload }: iParametros) {

    const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);

    useEffect(() => {
        if (imagem) {
            converterSrcImagemParaBase64(imagem)
                .then((base64: any) => {
                    // console.log(apiPasta, '-', imagem, '-', base64);

                    if (base64) {
                        setArquivoUpload(base64);
                    }
                });
        }
    }, [imagem, setArquivoUpload]);

    function handleRemoverFoto() {
        setArquivoUpload('');
    }

    return (
        <Fragment>
            <ModalWrapper isOpen={isModalUploadOpen}>
                <ModalLayout handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} logo={null} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.NULL} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload
                        isBase64={true}
                        handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)}
                        setArquivoUpload={setArquivoUpload}
                    />
                </ModalLayout>
            </ModalWrapper>

            <div className={Styles.main}>
                <div className={Styles.imagem}>
                    <Image src={(arquivoUpload ? arquivoUpload : ImgCinza)} width={100} height={100} alt='' />
                </div>

                <div className={Styles.infos}>
                    <span className={Styles.titulo}>{titulo}</span>
                    <span className={Styles.texto}>{infoAleatoriaUm}</span>
                    <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>

                    {
                        arquivoUpload && (
                            <span className={`${Styles.texto} cor-principal pointer`} onClick={() => handleRemoverFoto()}>Remover</span>
                        )
                    }
                </div>

                {
                    textoBotaoDireita && (
                        <Botao
                            texto={textoBotaoDireita}
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => setIsModalUploadOpen(true)}
                            Svg={null}
                            refBtn={null}
                            isEnabled={true}
                            isPequeno={false}
                        />
                    )
                }
            </div>
        </Fragment>
    )
}