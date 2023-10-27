'use client';
import LottieVazio from '@/assets/lotties/vazio.json';
import { useSignalRLog } from '@/hooks/useSignalR.log';
import useTitulo from '@/hooks/useTitulo';
import base from '@/utils/api/base';
import iLog from '@/utils/types/iLog';
import Lottie from 'lottie-react';
import Styles from './log.module.scss';

export default function Page() {

    useTitulo('Log de requisições', true);
    const { connection, logs } = useSignalRLog(`${base}/requestFilterHub`);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Log de requisições em tempo real</span>
            </div>

            <div className={Styles.logs}>
                {
                    logs.length ? (
                        logs.slice(-25).reverse().map((x: iLog, index: number) => (
                            <div key={index} className={Styles.log}>
                                {x.tipoRequisicao && <span><b>Tipo de req.: </b>{x.tipoRequisicao}</span>}
                                {x.endpoint && <span><b>Endpoint: </b>{x.endpoint}</span>}
                                {x.parametros && <span><b>Parâmetros: </b>{x.parametros}</span>}
                                {x.descricao && <span><b>Descrição: </b>{x.descricao}</span>}
                                {x.statusResposta && <span><b>Status da resp.: </b>{x.statusResposta}</span>}
                                {x.usuarioId && <span><b>UsuarioId: </b>{x.usuarioId}</span>}
                            </div>
                        ))
                    ) : (
                        <div className={Styles.avisoLogVazio}>
                            <span>Nenhuma requisição ainda foi feita ao servidor enquanto você estava nessa tela</span>
                            <Lottie animationData={LottieVazio} loop={true} />
                        </div>
                    )
                }
            </div>
        </section>
    )
}