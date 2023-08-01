export function setSessionStorage<T>(key: string, data: T): void {
    try {
        const serializedData = JSON.stringify(data);
        sessionStorage.setItem(key, serializedData);
        // console.log(`${key} salvo em session storage`);
    } catch (error) {
        console.error('Erro ao salvar dados em session storage:', error);
    }
}

export function getSessionStorage<T>(key: string): T | null {
    try {
        const serializedData = sessionStorage.getItem(key);
        if (serializedData) {
            const data: T = JSON.parse(serializedData);
            // console.log(`${key} obtido em session storage:`, data);
            return data;
        } else {
            // console.log(`Nenhum dado foi encontrado com a chave ${key}`);
            return null;
        }
    } catch (error) {
        console.error('Erro ao obter dados em session storage:', error);
        return null;
    }
}

// <summary>
// // Setar dados em SessionStorage;
// setSessionStorage<UserData>('user_data', user);
// setSessionStorage('app_settings', settings);

// // Obter dados de SessionStorage;
// const g1 = getSessionStorage<UserData>('user_data');
// const g2 = getSessionStorage('app_settings');
// </summary>