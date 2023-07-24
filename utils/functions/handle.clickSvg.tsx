export default function handleClickSvg(url: string | null, isNovaAba: boolean, handleFuncao: any) {
    if (!url) {
        if (handleFuncao) {
            handleFuncao();
        }

        return false;
    }

    window.open(url, isNovaAba ? '_blank' : '_self');
}