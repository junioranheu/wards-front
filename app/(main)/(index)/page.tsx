'use client';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
// const Idiomas = lazy(() => import('./components/idiomas/idiomas'));
// const Navbar = lazy(() => import('./components/navbar/navbar'));
// const Ola = lazy(() => import('./components/sessoes/ola'));
// const SobreMim = lazy(() => import('./components/sessoes/sobre-mim'));
// const Experiencias = lazy(() => import('./components/sessoes/experiencias'));
// const Projetos = lazy(() => import('./components/sessoes/projetos'));
// const Contato = lazy(() => import('./components/sessoes/contato'));
// const Footer = lazy(() => import('./components/sessoes/footer'));

export default function Page() {

    useTitulo('', true);

    return (
        <section className={CONSTS_SISTEMA.ANIMATE}>
            <h1>teste</h1>
            {/* <Idiomas isFixoEsquerda={true} />

                        <Navbar
                            refInicio={refInicio}
                            refSobreMim={refSobreMim}
                            refExperiencias={refExperiencias}
                            refProjetos={refProjetos}
                            refContato={refContato}
                        />

                        <Ola referencia={refInicio} />
                        <SobreMim referencia={refSobreMim} />
                        <Experiencias referencia={refExperiencias} />
                        <Projetos referencia={refProjetos} />
                        <Contato referencia={refContato} />
                        <Footer /> */}
        </section>
    )
}