export interface Cinema {
    id: string,
    location: string,
}

export interface Hall {
    id: string,
    name: string,
    rowCount: number,
    seatsPerRow: number,
    cinema: Cinema,
}

export interface Session {
    id: string,
    startTime: string,
    endTime: string,
    formatType: string,
    price: number,
    filmId: number,
    filmName: string,
    hall: Hall,
}