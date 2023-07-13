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
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior, e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber meus posts mais recentes diretamente na sua caixa de correio.</span>
                <input type='text' placeholder='junior@exemplo.com' />
            </div>
        </section>
    )
}