'use client';
import { useState } from 'react';
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

const Calendar = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
        <ShadcnCalendar
            className={`w-full rounded-md border`}
            mode="single"
            selected={date}
            onSelect={setDate}
        />
    );
};

export default Calendar;