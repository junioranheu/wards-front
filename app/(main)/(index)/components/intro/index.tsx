import ImgPerfil from '@/assets/images/outros/jinmiran.webp';
import Image from 'next/image';
import Styles from './intro.module.scss';

export default function Intro() {
    return (
        <section className={Styles.intro}>
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div className={Styles.texto}>
                <span className='tituloSessao'>E aí 👋 Meu nome é Junior, bla bla bla</span>
                <span>Subscribe below to receive my latest posts directly in your inbox. No advertisement, the whole article in your inbox!</span>
            </div>
        </section>
    )
}