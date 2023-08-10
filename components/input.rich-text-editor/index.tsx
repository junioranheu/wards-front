import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface iParametros {
    placeholder: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
}

export default function InputRichTextEditor({ placeholder, valor, setValor }: iParametros) {

    const refInput = useRef<any>();

    return (
        <ReactQuill
            theme='snow'
            // @ts-ignore;
            ref={refInput}
            // formats={reactQuillFormats}
            // modules={modules}
            placeholder={placeholder}
            value={valor}
            onChange={(e) => setValor(e)}
        />
    )
}