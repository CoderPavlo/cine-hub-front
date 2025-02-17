import { Session } from "./tables";

export interface Ticket {
    id: string;
    price: number;
    rowNumber: number;
    seatNumber: number;
    sessionId: string;
    filmName: string;
    cinemaLocation: string;
    hallName: string;
    formatType: string;
    startTime: string;
}

export interface TicketSeat {
    row: number,
    seat: number,
}

export interface SessionDetail {
    session: Session,
    reservedSeats: TicketSeat[],
    rows: number,
    seats: number,
}

export interface CreateTicket {
    price: number,
    rowNumber: number,
    seatNumber: number,
    sessionId: string,
}