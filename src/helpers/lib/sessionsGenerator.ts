// Sessions for demo use in AboutMoviePage.tsx
const cinemaNames = [
  "Respublika Park IMAX",
  "Retroville ScreenX",
  "Karavan",
  "Atmosphere",
  "Kvadrat",
  "Cinema Paradiso",
  "CineMax",
];

const auditoriumNumbers = ["#1", "#2", "#3", "#4", "#5", "#6"];

const availableTimes = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:20",
  "11:30",
  "12:00",
  "12:40",
  "13:00",
  "13:25",
  "13:55",
  "14:30",
  "14:45",
  "15:30",
  "16:30",
  "17:10",
  "17:20",
  "18:15",
  "18:40",
  "19:00",
  "19:30",
  "20:30",
  "20:40",
  "20:55",
  "21:00",
];

const formats = ["SDH", "LUX SDH", "VIP SDH"];

export interface Session {
  id: number;
  cinema: string;
  auditorium: string;
  date: string;
  times: string[];
  format: string;
}

export function generateSessions(days = 15): Session[] {
  const sessions: Session[] = [];
  let id = 1;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    const sessionCount = Math.floor(Math.random() * 3) + 3;

    for (let j = 0; j < sessionCount; j++) {
      const cinema =
        cinemaNames[Math.floor(Math.random() * cinemaNames.length)];
      const auditorium =
        auditoriumNumbers[Math.floor(Math.random() * auditoriumNumbers.length)];

      const timesCount = Math.floor(Math.random() * 4) + 2;
      const startIndex = Math.floor(
        Math.random() * (availableTimes.length - timesCount)
      );
      const times = availableTimes.slice(startIndex, startIndex + timesCount);

      const format = formats[Math.floor(Math.random() * formats.length)];

      sessions.push({
        id: id++,
        cinema,
        auditorium,
        date: dateStr,
        times,
        format,
      });
    }
  }

  return sessions;
}
