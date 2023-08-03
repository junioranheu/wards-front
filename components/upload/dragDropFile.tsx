import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import { Dispatch, Fragment, ReactNode } from 'react';
import { FileUploader } from 'react-drag-drop-files';

interface iParametros {
    nomeElemento: string;
    tipoArquivos: string[];
    isMultiple: boolean;
    setArquivo: Dispatch<File> | any;
    maxSizeMBs: number;
    isDisabled: boolean;
    conteudo: ReactNode;
}

export default function DragDropFile({ nomeElemento, tipoArquivos, isMultiple, setArquivo, maxSizeMBs, isDisabled, conteudo }: iParametros) {

    function handleChange(arquivo: any) {
        setArquivo(arquivo);
    }

    return (
        <FileUploader
            handleChange={handleChange}
            name={nomeElemento}
            types={tipoArquivos}
            multiple={isMultiple}
            label='Clique aqui ou arraste uma imagem'
            maxSize={maxSizeMBs}
            disabled={isDisabled}
            hoverTitle={' '}
            onTypeError={() => Aviso.toast('O tipo desse arquivo não é válido', 5000, CONSTS_EMOJIS.ERRO, true)}
            onSizeError={() => Aviso.toast(`O tamanho desse arquivo ultrapassa o limite de ${maxSizeMBs} MBs`, 5000, CONSTS_EMOJIS.ERRO, true)}
        >
            <Fragment>{conteudo}</Fragment>
        </FileUploader>
    )
}