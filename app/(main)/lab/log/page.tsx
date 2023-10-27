'use client';
import { useSignalRLog } from '@/hooks/useSignalR.log';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import iLog from '@/utils/types/iLog';
import Styles from './log.module.scss';

export default function Page() {

    useTitulo('Log de requisições', true);
    const { connection, logs } = useSignalRLog(`${base}/requestFilterHub`);

    return (
        <section className={Styles.main}>
            <h1>Log em tempo real</h1>

            <div className={Styles.logs}>
                {
                    logs.map((x: iLog, index: number) => (
                        <div key={index} className={Styles.mensagem}>
                            <span>{x.tipoRequisicao}</span>
                            <span>{x.endpoint}</span>
                            <span>{x.parametros}</span>
                            <span>{x.descricao}</span>
                            <span>{x.statusResposta}</span>
                            <span>{x.usuarioId}</span>
                            <span>{x.endpoint}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}