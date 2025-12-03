// /components/admin/shared/DateRangeFilter.tsx
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeFilterProps {
  onDateChange: (dateRange: { from: Date; to: Date }) => void;
  className?: string;
}

export function DateRangeFilter({ onDateChange, className }: DateRangeFilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfYear(new Date()),
    to: endOfYear(new Date()),
  });

  // Notify parent component on initial load
  React.useEffect(() => {
    if (date?.from && date?.to) {
      onDateChange({ from: date.from, to: date.to });
    }
  }, []);


  const handlePresetChange = (value: string) => {
    const today = new Date();
    let from: Date | undefined, to: Date | undefined;

    switch (value) {
      case "this_week":
        from = startOfWeek(today, { locale: fr });
        to = endOfWeek(today, { locale: fr });
        break;
      case "this_month":
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case "this_year":
        from = startOfYear(today);
        to = endOfYear(today);
        break;
      default:
        return;
    }

    const newRange = { from, to };
    setDate(newRange);
    if (from && to) {
      onDateChange({ from, to });
    }
  };

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      onDateChange({ from: newDate.from, to: newDate.to });
    }
  }

  return (
    <div className={cn("grid gap-2 md:flex md:items-center", className)}>
      <Select onValueChange={handlePresetChange} defaultValue="this_year">
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sélectionner une période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_week">Cette semaine</SelectItem>
          <SelectItem value="this_month">Ce mois-ci</SelectItem>
          <SelectItem value="this_year">Cette année</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: fr })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: fr })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: fr })
              )
            ) : (
              <span>Choisir une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
