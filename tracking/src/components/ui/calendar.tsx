"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react"

interface CalendarProps {
  cycleData: any
  onUpdateData: (data: any) => void
}

export function Calendar({ cycleData, onUpdateData }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const current = new Date(startDate)

  for (let i = 0; i < 42; i++) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  const togglePeriodDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const newPeriods = cycleData.periods.includes(dateStr)
      ? cycleData.periods.filter((d: string) => d !== dateStr)
      : [...cycleData.periods, dateStr]

    onUpdateData({
      ...cycleData,
      periods: newPeriods,
    })
  }

  const isPeriodDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return cycleData.periods.includes(dateStr)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-primary" />
            <span>Period Calendar</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`
                h-10 w-full p-0 text-sm relative
                ${!isCurrentMonth(date) ? "text-muted-foreground opacity-50" : ""}
                ${isToday(date) ? "ring-2 ring-primary" : ""}
                ${isPeriodDay(date) ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              `}
              onClick={() => togglePeriodDay(date)}
            >
              {date.getDate()}
              {isPeriodDay(date) && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-primary-foreground rounded-full" />
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted-foreground text-center">Tap dates to mark your period days</div>
      </CardContent>
    </Card>
  )
}
