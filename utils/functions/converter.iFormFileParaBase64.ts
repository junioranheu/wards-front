export default function converterIFormFileParaBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result as string;
            // resolve(base64String.split(',')[1]);
            resolve(base64String);
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}