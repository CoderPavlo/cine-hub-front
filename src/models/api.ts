export interface GetRequest<T> {
    page: number,
    results: T[],
    total_pages: number,
    total_results: number,
}

export interface PaginationProps {
    page: number,
    itemsPerPage: number,
}

export interface GetHalls extends PaginationProps {
    cinemaId?: string;
}

export interface CreateHall {
    name: string,
    rowCount: number,
    seatsPerRow: number,
    cinemaId: string,
}

export interface UpdateHall {
    id: string,
    name: string,
    rowCount: number,
    seatsPerRow: number,
}