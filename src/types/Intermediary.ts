
export interface Intermediary {
    id: number,
    name: string,
    order: number,
    createdAt: string,
    group?: string,
}

export interface IntermediaryOption {
    name: string,
    value: number,
}

export interface IntermediaryFull extends Intermediary {
    type?: string,
    options?: IntermediaryOption[],
    rangeFrom?: number,
    rangeTo?: number,
    step?: number,
}

