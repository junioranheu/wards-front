export default function setDesabilitarBotoes(isDisable: boolean) {
    const listaBtn = document.querySelectorAll('button');

    listaBtn.forEach((btn: HTMLButtonElement) => {
        btn.disabled = isDisable;
    });
}