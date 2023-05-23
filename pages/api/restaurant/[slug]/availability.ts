import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    if (!day || !time || !partySize) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const searchTimes = times.find((t) => {
      return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
      return res.status(400).json({
        errorMessage: "Invalid provided",
      });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        booking_time: {
          gte: new Date(`${day}T${searchTimes[0]}`),
          lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
        },
      },
      select: {
        number_of_people: true,
        booking_time: true,
        tables: true,
      },
    });

    const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

    bookings.forEach((booking) => {
      bookingTablesObj[booking.booking_time.toISOString()] =
        booking.tables.reduce((obj, table) => {
          return {
            ...obj,
            [table.table_id]: true,
          };
        }, {});
    });

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const tables = restaurant.tables;

    const searchTimesWithTables = searchTimes.map((searchTime) => {
      return {
        date: new Date(`${day}T${searchTime}`),
        time: searchTime,
        tables,
      };
    });

    res.status(200).json({ searchTimesWithTables });
  }
}
// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-03-02&time=14:00:00.000Z&partySize=4
// vivaan-fine-indian-cuisine-ottawa
