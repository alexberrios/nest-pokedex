

export interface HttpAdapter{
    get<T>(url: string, config?: any): Promise<T>;
}