"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { LocalDate } from "@js-joda/core"

type LocalDateLike = LocalDate | { year: number; month: number; day: number } | string

type Props = {
  assignAt?: LocalDateLike | Date
  dueAt?: LocalDateLike | Date
  onDateChange?: (dateRange: {
    from?: LocalDate
    to?: LocalDate
  }) => void
}

export function DatePickerRange({
  assignAt,
  dueAt,
  onDateChange,
}: Props) {

  /* ---------------- helpers ---------------- */

  const localDateToDate = React.useCallback((value?: LocalDateLike | Date): Date | undefined => {
    if (!value) return undefined

    if (value instanceof LocalDate) {
      return new Date(value.year(), value.monthValue() - 1, value.dayOfMonth())
    }

    if (value instanceof Date) {
      return value
    }

    // Handle ISO date strings (from API)
    if (typeof value === "string") {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        return date
      }
      // Try parsing as LocalDate format (YYYY-MM-DD)
      const localDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
      if (localDateMatch) {
        const [, year, month, day] = localDateMatch
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      }
      return undefined
    }

    if (
      typeof value === "object" &&
      "year" in value &&
      "month" in value &&
      "day" in value
    ) {
      return new Date(value.year, value.month - 1, value.day)
    }

    return undefined
  }, [])

  const dateToLocalDate = (value?: Date): LocalDate | undefined => {
    if (!value) return undefined
    return LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate())
  }

  /* ---------------- state ---------------- */

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const from = localDateToDate(assignAt)
    const to = localDateToDate(dueAt)
    if (from || to) return { from, to }
    return undefined
  })

  // Update date state when props change (e.g., when data loads from API)
  React.useEffect(() => {
    const from = localDateToDate(assignAt)
    const to = localDateToDate(dueAt)
    if (from || to) {
      setDate({ from, to })
    } else {
      setDate(undefined)
    }
  }, [assignAt, dueAt, localDateToDate])

  /* ---------------- handlers ---------------- */

  const handleDateSelect = (selected: DateRange | undefined) => {
    setDate(selected)

    if (onDateChange) {
      onDateChange({
        from: dateToLocalDate(selected?.from),
        to: dateToLocalDate(selected?.to),
      })
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <Field className="w-fit">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal gap-2"
          >
            <CalendarIcon className="h-4 w-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd.MM.yyyy")} -{" "}
                  {format(date.to, "dd.MM.yyyy")}
                </>
              ) : (
                format(date.from, "dd.MM.yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
