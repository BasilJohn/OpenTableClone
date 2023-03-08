import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { times } from '@/data';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: { params: any }) {
    const { searchParams } = new URL(request.url);
    const slug = context.params.slug;
    const day = searchParams.get('day');
    const time = searchParams.get('time');
    const partySize = searchParams.get('partySize');

    if (!day || !time || !partySize) {
        return NextResponse.json({ errorMessage: "Invalid data provided" }, { status: 401 });
    }

    const searchTimes = times.find(t => {
        return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
        return NextResponse.json({ errorMessage: "Invalid data provided" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: {
            no_of_people: true,
            booking_time: true,
            bookingsontable: true,
        }
    });

    const bookingsTableObject: { [key: string]: { [key: number]: true } } = {}

    bookings.forEach(booking => {
        bookingsTableObject[booking.booking_time.toISOString()] = booking.bookingsontable.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true
            }
        }, {})
    });

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            table: true,
            open_time: true,
            close_time: true,
        }
    });

    if (!restaurant) {
        return NextResponse.json({ errorMessage: "Invalid data provided" }, { status: 401 });
    }

    const tables = restaurant.table;

    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables
        }
    });

    searchTimesWithTables.forEach(swt => {
        swt.tables = swt.tables.filter(table => {
            if (bookingsTableObject[swt.date.toISOString()]) {
                if (bookingsTableObject[swt.date.toISOString()][table.id]) {
                    return false;
                }
                return true;
            }
        })
    });

    const availabilities = searchTimesWithTables.map((t) => {
        const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats;
        }, 0)

        return {
            time:t.time,
            available:sumSeats>= parseInt(partySize)
        }
    }).filter(availability=>{
        const timeisAfterOpeningHour =new Date(`${day}T${availability.time}`)>=
        new Date(`${day}T${restaurant.open_time}`);
        const timeisBeforeClosingHour =new Date(`${day}T${availability.time}`)<=
        new Date(`${day}T${restaurant.close_time}`)

        return timeisAfterOpeningHour && timeisBeforeClosingHour;
    });

    return NextResponse.json({availabilities });
}