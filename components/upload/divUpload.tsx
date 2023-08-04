import ImgCinza from '@/assets/images/outros/cinza.webp';
import Botao from '@/components/botao';
import ModalLayout from '@/components/modal/_modal.layout';
import ModalWrapper from '@/components/modal/_modal.wrapper';
import ModalUpload from '@/components/modal/modal.upload';
import CONSTS_MODAL from '@/utils/consts/modal.tamanho';
import converterIFormFileParaBase64 from '@/utils/functions/converter.iFormFileParaBase64';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import Styles from './divUpload.module.scss';

interface iParametros {
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;

    isBase64: boolean;
    arquivoUpload: File | ArrayBuffer | string | null;
    setArquivoUpload: Dispatch<File | ArrayBuffer | string | null>;
}

export default function DivUpload({ titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita, isBase64, arquivoUpload, setArquivoUpload }: iParametros) {

    const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | StaticImageData>(ImgCinza);

    useEffect(() => {
        function handlePreview() {
            try {
                if (!arquivoUpload) {
                    setPreview(ImgCinza);
                    return false;
                }

                if (isBase64 && arquivoUpload) {
                    setPreview(arquivoUpload.toString());
                    return false;
                }

                converterIFormFileParaBase64(arquivoUpload as File)
                    .then((base64String) => {
                        // console.log(base64String);
                        setPreview(base64String);
                        return false;
                    });

                setPreview(ImgCinza);
            } catch (error: any) {
                setPreview(ImgCinza);
            }
        }

        handlePreview();
    }, [arquivoUpload]);

    function handleRemoverFoto() {
        setArquivoUpload('');
    }

    return (
        <Fragment>
            <ModalWrapper isOpen={isModalUploadOpen}>
                <ModalLayout handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} logo={null} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.NULL} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload
                        isBase64={isBase64}
                        handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)}
                        setArquivoUpload={setArquivoUpload}
                    />
                </ModalLayout>
            </ModalWrapper>

            <div className={Styles.main}>
                <div className={Styles.imagem_e_infos}>
                    <div className={Styles.imagem}>
                        <Image src={preview} width={100} height={100} alt='' />
                    </div>

                    <div className={Styles.infos}>
                        <span className={Styles.titulo}>{titulo}</span>
                        <span className={Styles.texto}>{infoAleatoriaUm}</span>
                        <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>

                        {
                            arquivoUpload && (
                                <span
                                    className={`${Styles.texto} cor-principal pointer`}
                                    onClick={() => handleRemoverFoto()}
                                >
                                    Remover
                                </span>
                            )
                        }
                    </div>
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