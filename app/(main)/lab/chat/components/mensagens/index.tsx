import Styles from '@/app/(main)/lab/chat/chat.module.scss';
import { Auth } from '@/utils/context/usuarioContext';
import formatarData from '@/utils/functions/formatar.data';
import { iMensagem } from '@/utils/types/iSignalR';
import { Fragment, RefObject } from 'react';

interface iParametros {
    mensagens: iMensagem[];
    refMensagens: RefObject<HTMLDivElement>;
    refMensagensRaw: string;
}

export default function Mensagens({ mensagens, refMensagens, refMensagensRaw }: iParametros) {
    return (
        <div className={`${Styles.mensagens} ${refMensagensRaw}`} ref={refMensagens}>
            {
                mensagens.map((m: iMensagem, index: number) => (
                    <div key={index} className={Styles.mensagem}>
                        <span className={`${Styles.texto} ${(m.isSistema ? Styles.sistema : '')} ${(m.usuarioIdDestinatario ? Styles.privado : '')}`}>
                            <PrefixoMensagem mensagem={m} />
                            {m.mensagem}
                        </span>

                        <span className={Styles.timestamp}>•</span>
                        <span className={Styles.timestamp}>{formatarData(m.timestamp, 2).toLocaleLowerCase()}</span>
                    </div>
                ))
            }
        </div>
    )
}

interface iPrefixoMensagemParametros {
    mensagem: iMensagem;
}

function PrefixoMensagem({ mensagem }: iPrefixoMensagemParametros) {
    return (
        !mensagem.isSistema ? (
            <div>
                {
                    mensagem.usuarioIdDestinatario ? (
                        Auth.get()?.email === mensagem.usuarioId ? (
                            <span>Você enviou uma mensagem privada para <b>{mensagem.usuarioNomeDestinatario}</b>:</span>
                        ) : (
                            <span><b>{mensagem.usuarioNome}</b> enviou uma mensagem privada para você:</span>
                        )
                    ) : (
                        <strong>{mensagem.usuarioNome}: </strong>
                    )
                }
            </div>
        ) : (
            <Fragment></Fragment>
        )
    )
}