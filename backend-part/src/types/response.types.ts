export enum ProcessingOptions {
    Success = 'success',
    Failed = 'failed'
}

export interface ICustomResponse<T = any> {
    process: ProcessingOptions,
    message: string,
    body: T,
}

