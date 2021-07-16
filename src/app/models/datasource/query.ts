export interface Query {
    page: number;
    size: number;
    active: string;
    direction: 'asc' | 'desc' | '';
}
