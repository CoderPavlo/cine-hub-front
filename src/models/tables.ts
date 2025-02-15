export interface Cinema {
    id: string,
    location: string,
}

export interface Hall {
    id: string,
    name: string,
    rowCount: number,
    seatsPerRow: number,
    cinemaName: string,
}

export interface Session {
    id: string,
    startTime: string,
    endTime: string,
    formatType: string,
    price: number,
    filmId: number,
    filmName: string,
    cinemaLocation: string,
    auditoriumName: string,
}

