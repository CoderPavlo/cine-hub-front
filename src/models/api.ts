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
