import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Clock, Target } from "lucide-react"

interface CycleInsightsProps {
  cycleData: any
}

export function CycleInsights({ cycleData }: CycleInsightsProps) {
  const calculateCycleStats = () => {
    if (cycleData.periods.length < 2) {
      return {
        averageCycle: 28,
        lastPeriod: null,
        nextPredicted: null,
        cycleDay: 1,
      }
    }

    const sortedPeriods = cycleData.periods.sort()
    const lastPeriod = new Date(sortedPeriods[sortedPeriods.length - 1])
    const today = new Date()
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate average cycle length
    let totalDays = 0
    let cycles = 0
    for (let i = 1; i < sortedPeriods.length; i++) {
      const current = new Date(sortedPeriods[i])
      const previous = new Date(sortedPeriods[i - 1])
      const diff = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24))
      if (diff > 15 && diff < 45) {
        // Valid cycle length
        totalDays += diff
        cycles++
      }
    }

    const averageCycle = cycles > 0 ? Math.round(totalDays / cycles) : 28
    const nextPredicted = new Date(lastPeriod)
    nextPredicted.setDate(nextPredicted.getDate() + averageCycle)

    return {
      averageCycle,
      lastPeriod,
      nextPredicted,
      cycleDay: daysSinceLastPeriod + 1,
    }
  }

  const stats = calculateCycleStats()
  const cycleProgress = ((stats.cycleDay - 1) / stats.averageCycle) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              <span>Current Cycle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Day</span>
                <span className="text-2xl font-bold">{stats.cycleDay}</span>
              </div>
              <Progress value={Math.min(cycleProgress, 100)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Day 1</span>
                <span>Day {stats.averageCycle}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Cycle Length</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{stats.averageCycle} days</div>
              <div className="text-sm text-muted-foreground">Average cycle length</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Period</span>
              </div>
              <div className="text-lg">
                {stats.lastPeriod
                  ? stats.lastPeriod.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })
                  : "No data yet"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Next Expected</span>
              </div>
              <div className="text-lg">
                {stats.nextPredicted
                  ? stats.nextPredicted.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })
                  : "Track more cycles"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Track at least 2-3 cycles for more accurate predictions</div>
            <div className="text-xs text-muted-foreground">Your data is stored locally and never shared</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
