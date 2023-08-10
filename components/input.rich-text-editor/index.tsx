import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface iParametros {
    placeholder: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
}

export default function InputRichTextEditor({ placeholder, valor, setValor }: iParametros) {

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ color: [] }, { background: [] }],
                ['link', 'image', 'code-block'],
            ]
        }
    }), []);

    return (
        <ReactQuill
            theme='snow'
            modules={modules}
            placeholder={placeholder}
            value={valor}
            onChange={(e) => setValor(e)}
        />
    )
}