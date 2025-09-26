"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"


import { CycleInsights } from "@/components/cycle-insights"
import { SymptomTracker } from "@/components/symptom-tracker"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("calendar")
  const [cycleData, setCycleData] = useState({
    periods: [],
    symptoms: {},
    predictions: {},
  })

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem("luna-cycle-data")
    if (savedData) {
      setCycleData(JSON.parse(savedData))
    }
  }, [])

  const saveCycleData = (newData: any) => {
    setCycleData(newData)
    localStorage.setItem("luna-cycle-data", JSON.stringify(newData))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-balance">Your Health Journey</h1>
            <p className="text-muted-foreground text-pretty">
              Track your cycle, understand your body, and take control of your health
            </p>
          </div>

          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mt-8">
            {activeTab === "calendar" && <Calendar cycleData={cycleData} onUpdateData={saveCycleData} />}
            {activeTab === "insights" && <CycleInsights cycleData={cycleData} />}
            {activeTab === "symptoms" && <SymptomTracker cycleData={cycleData} onUpdateData={saveCycleData} />}
          </div>
        </div>
      </main>
    </div>
  )
}
