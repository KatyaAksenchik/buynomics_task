import db from '../assets/data/db.json';

import StorageService, { STORAGE_KEYS } from './storageService';
import { IntermediaryFull } from '../types/Intermediary';

class ApiService {
    latestId;

    constructor() {
        const localDb = StorageService.getItem(STORAGE_KEYS.MOCK_DB)
        this.latestId = (localDb && JSON.parse(localDb)?.length) || 0;

        if (!localDb) {
            StorageService.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify(db));
            this.latestId = db?.length || 0;
        }
    }

    loadIntermediaries() {
        const intermediaries = StorageService.getItem(STORAGE_KEYS.MOCK_DB);

        return intermediaries && JSON.parse(intermediaries);
    }

    deleteIntermediary(id: number) {
        const intermediaries = this.loadIntermediaries();

        if (intermediaries) {
            const updatedIntermediaries = intermediaries.filter((intermediary: IntermediaryFull) => intermediary.id !== id)

            StorageService.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify(updatedIntermediaries))

            return updatedIntermediaries
        }
    }

    addIntermediary(intermediary: IntermediaryFull) {
        const intermediaries = this.loadIntermediaries();
        this.latestId++;

        StorageService.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify([...intermediaries, {
            ...intermediary,
            id: this.latestId,
            createdAt: new Date().toJSON()
        }]))
    }

    getIntermediaryById(id: number) {
        const intermediaries = this.loadIntermediaries();

        return intermediaries.find((intermediary: IntermediaryFull) => intermediary.id === id) || {}
    }

    updateIntermediary(id: number, updatedIntermediary: IntermediaryFull) {
        const intermediaries = this.loadIntermediaries();
        const updatedIntermediaries = intermediaries.map((intermediary: IntermediaryFull) => {
            if (intermediary.id === id) {
                return {
                    ...intermediary,
                    ...updatedIntermediary
                }
            }
            return intermediary;
        })

        StorageService.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify(updatedIntermediaries));
    }
}

export default new ApiService();