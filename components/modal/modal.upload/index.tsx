import Botao from '@/components/botao';
import { FecharModal } from '@/components/modal/_modal.layout';
import DragDropFile from '@/components/upload/dragDropFile';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import UPLOAD_SETTINGS from '@/utils/consts/upload.settings';
import { Aviso } from '@/utils/functions/aviso';
import converterDataUrlParaFile from '@/utils/functions/converter.dataUrlParaFile';
import gerarUUID from '@/utils/functions/gerar.UUID';
import nProgress from 'nprogress';
import { Dispatch, useEffect, useState } from 'react';
import ModalUploadConteudo from './components/modal.upload.conteudo';
import StylesUpload from './index.module.scss';

interface iParametros {
    isBase64: boolean; // true = base64, false = file;
    handleModal: Dispatch<boolean>;
    setArquivoUpload: Dispatch<File> | any;
}

export default function ModalUpload({ isBase64, handleModal, setArquivoUpload }: iParametros) {

    const [nomeElementoInput] = useState<string>('inputUpload_modalUpload');
    const [arquivo, setArquivo] = useState<any>(null);
    const [arquivoBlob, setArquivoBlob] = useState<string>('');
    const [arquivoCrop, setArquivoCrop] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (arquivo) {
            const arquivoBlob = URL.createObjectURL(arquivo);
            setArquivoBlob(arquivoBlob);
            setIsDisabled(true);
        }
    }, [arquivo]);

    function handleClicarInputUpload() {
        setIsDisabled(false);

        setTimeout(function () {
            const inputUpload = document.querySelector(`input[name="${nomeElementoInput}"]`) as HTMLInputElement;
            inputUpload.click();
        }, 500);
    }

    async function handleConfirmarUpload() {
        nProgress.start();

        if (!arquivoCrop) {
            Aviso.toast('Você não selecionou uma imagem para continuar', 5000, CONSTS_EMOJIS.ERRO, true);
            nProgress.done();
            return false;
        }

        // console.log('arquivo: ', arquivo);
        // console.log('arquivoBlob: ', arquivoBlob);
        // console.log('arquivoCrop: ', arquivoCrop);

        if (arquivoCrop) {
            converterDataUrlParaFile(arquivoCrop, `file_${gerarUUID()}.png`, 'image/png')
                .then(function (file) {
                    if (isBase64) {
                        // Converter file (arquivo que passou pelo cropping) para base64;
                        var reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = function () {
                            const base64 = reader.result;
                            setArquivoUpload(base64);
                            // console.log(arquivoCropFile, base64);
                            // const arquivoBlobPreview = URL.createObjectURL(arquivoUpload);

                            // Aviso.success('Imagem enviada com sucesso', 5000);
                            nProgress.done();
                            FecharModal.fecharModalClicandoNoBotao(handleModal);
                        };

                        reader.onerror = function (error) {
                            // console.log('Error: ', error);
                            Aviso.toast('Houve um erro ao enviar a imagem', 5000, CONSTS_EMOJIS.ERRO, true);
                            nProgress.done();
                            FecharModal.fecharModalClicandoNoBotao(handleModal);
                        };
                    } else {
                        setArquivoUpload(file);
                        // Aviso.success('Imagem enviada com sucesso', 5000);
                        nProgress.done();
                        FecharModal.fecharModalClicandoNoBotao(handleModal);
                    }
                });
        }
    }

    return (
        <section className={StylesUpload.main}>
            <div className={StylesUpload.dragDropFile}>
                <DragDropFile
                    nomeElemento={nomeElementoInput}
                    tipoArquivos={UPLOAD_SETTINGS.TIPOS_IMAGEM}
                    isMultiple={false}
                    setArquivo={setArquivo}
                    texto='Clique aqui ou arraste uma imagem: '
                    maxSizeMBs={UPLOAD_SETTINGS.LIMITE_MB}
                    isDisabled={isDisabled}
                    conteudo={<ModalUploadConteudo arquivoBlob={arquivoBlob} setArquivoCrop={setArquivoCrop} />}
                />
            </div>

            <Botao
                texto='Confirmar foto'
                url={null}
                isNovaAba={false}
                handleFuncao={() => handleConfirmarUpload()}
                Svg={null}
                refBtn={null}
                isEnabled={true}
                isPequeno={false}
            />

            <span
                className='cor-principal pointer'
                onClick={() => handleClicarInputUpload()}
            >
                Escolher outra imagem
            </span>
        </section>
    )
}