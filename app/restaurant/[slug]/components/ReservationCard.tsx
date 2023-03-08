'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { partySize, times } from '../../../../data';
import useAvailabilities from '@/hooks/useAvailability';

export default function ReservationCard(
    { openTime, closeTime, slug }:
        { openTime: string, closeTime: string, slug: string }) {

    const { data, loading, error, fetchAvailabilities } = useAvailabilities();

    const [partySizes, setPartySize] = useState("2");
    const [day, setDate] = useState(new Date().toISOString().split("T")[0]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setDate(date.toDateString().split("T")[0]);
            return setSelectedDate(date);
        }
        return setSelectedDate(null);
    }

    const handleClick = () => {
        fetchAvailabilities({ slug, day, partySize: partySizes, time })
    }


    const filterTimes = () => {
        const timesInWindow: typeof times = [];
        let isWithInWindow = false;
        times.forEach(time => {
            if (time.time === openTime) {
                isWithInWindow = true;
            }
            if (isWithInWindow) {
                timesInWindow.push(time);
            }
            if (time.time === closeTime) {
                isWithInWindow = false;
            }
        });

        return timesInWindow;
    }

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState(openTime);

    return (
        <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">
                    Make a Reservation
                </h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor=''>
                    Party size
                </label>
                <select name='' onChange={(e) => setPartySize(e.target.value)} value={partySizes}
                    className='py-3 border-b font-light bg-white' id=''>
                    {partySize.map(size => (
                        <option value={size.value}>{size.label}</option>
                    ))}
                </select>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col w-[48%] '>
                    <label htmlFor=''>
                        Date
                    </label>
                    <DatePicker
                        wrapperClassName='w-[48%]'
                        dateFormat="MMMM d"
                        className='py-3 border-b font-light text-reg w-24 bg-white'
                        onChange={handleDateChange}
                        selected={selectedDate} />
                </div>
                <div className='flex flex-col w-[48%] '>
                    <label htmlFor=''>
                        Time
                    </label>
                    <select value={time} onChange={(e) => setTime(e.target.value)} name='' id='' className='py-3 border-b font-light bg-white'>
                        {filterTimes().map(time => (
                            <option value={time.displayTime}>{time.displayTime}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='mt-5'>
                <button onClick={handleClick} className='bg-red-600 rounded w-full px-4 text-white h-10 font-bold'>Find a Time</button>
            </div>
        </div>
    )
}
