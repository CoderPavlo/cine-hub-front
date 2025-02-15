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

export interface User {
    id: string,
    name: string,
    surname: string,
    birthday: string,
    email: string,
}

export interface GetSessions extends PaginationProps {
    cinemaId?: string,
    hallId?: string,
    filmId?: number,
    date?: string,
}