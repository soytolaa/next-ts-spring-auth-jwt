"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format } from "date-fns"  // import date-fns for formatting dates
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"  // import react-day-picker for date range picker
import { DateTimeFormatter, LocalDateTime } from "@js-joda/core"

export function DatePickerRange({assignAt, dueAt}: {assignAt: LocalDateTime | string | undefined, dueAt: LocalDateTime | string | undefined}) {
  // Helper function to convert LocalDateTime or ISO string to Date
  const parseDate = (dateValue: LocalDateTime | string | undefined): Date | undefined => {
    if (!dateValue) return undefined;
    
    // If it's already a LocalDateTime object
    if (typeof dateValue === 'object' && 'format' in dateValue) {
      return new Date(dateValue.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
    }
    
    // If it's an ISO string
    if (typeof dateValue === 'string') {
      return new Date(dateValue)
    }
    
    return undefined;
  }

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const fromDate = parseDate(assignAt);
    const toDate = parseDate(dueAt);
    
    if (fromDate || toDate) {
      return {
        from: fromDate || new Date(new Date().getFullYear(), 0, 20),
        to: toDate || (fromDate ? addDays(fromDate, 20) : addDays(new Date(new Date().getFullYear(), 0, 20), 20)),
      }
    }
    
    return {
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    }
  })

  return (
    <Field className="w-fit">
      {/* <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
