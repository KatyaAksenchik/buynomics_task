export const STORAGE_KEYS = {
    MOCK_DB: 'MOCK_DB',
}

class StorageService {
    static getStorage(persistent: boolean) {
        return persistent
            ? window.localStorage
            : window.sessionStorage;
    }

    static getItem(key: string): string | null {
        return window?.localStorage?.getItem(key) || window?.sessionStorage?.getItem(key);
    }

    static setItem(key: string, value: any, persistent = true) {
        const storage = this.getStorage(persistent);

        storage.setItem(key, value);
    }

    static updateItem(key: string, value: any, persistent = true) {
        if (this.getItem(key) !== value) {
            this.setItem(key, value, persistent);
        }
    }
}

export default StorageService;