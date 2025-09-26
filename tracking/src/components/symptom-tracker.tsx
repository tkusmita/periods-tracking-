"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Zap, Brain, Droplets, Smile } from "lucide-react"

interface SymptomTrackerProps {
  cycleData: any
  onUpdateData: (data: any) => void
}

export function SymptomTracker({ cycleData, onUpdateData }: SymptomTrackerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const symptomCategories = [
    {
      name: "Physical",
      icon: Heart,
      symptoms: ["Cramps", "Bloating", "Headache", "Breast tenderness", "Back pain", "Nausea"],
    },
    {
      name: "Energy",
      icon: Zap,
      symptoms: ["Fatigue", "High energy", "Restless", "Need more sleep"],
    },
    {
      name: "Mood",
      icon: Brain,
      symptoms: ["Happy", "Anxious", "Irritable", "Sad", "Confident", "Emotional"],
    },
    {
      name: "Flow",
      icon: Droplets,
      symptoms: ["Light", "Medium", "Heavy", "Spotting"],
    },
  ]

  const getDateSymptoms = (date: string) => {
    return cycleData.symptoms[date] || []
  }

  const toggleSymptom = (symptom: string) => {
    const currentSymptoms = getDateSymptoms(selectedDate)
    const newSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter((s: string) => s !== symptom)
      : [...currentSymptoms, symptom]

    onUpdateData({
      ...cycleData,
      symptoms: {
        ...cycleData.symptoms,
        [selectedDate]: newSymptoms,
      },
    })
  }

  const isSymptomSelected = (symptom: string) => {
    return getDateSymptoms(selectedDate).includes(symptom)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-primary" />
            <span>Track Symptoms</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              />
            </div>

            <div className="space-y-6">
              {symptomCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.symptoms.map((symptom) => (
                        <Button
                          key={symptom}
                          variant={isSymptomSelected(symptom) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSymptom(symptom)}
                          className="text-xs"
                        >
                          {symptom}
                        </Button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smile className="w-5 h-5 text-accent" />
            <span>Recent Symptoms</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(cycleData.symptoms)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 5)
              .map(([date, symptoms]: [string, any]) => (
                <div key={date} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="text-sm font-medium">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {symptoms.slice(0, 3).map((symptom: string) => (
                      <Badge key={symptom} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                    {symptoms.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{symptoms.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            {Object.keys(cycleData.symptoms).length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-4">No symptoms tracked yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
