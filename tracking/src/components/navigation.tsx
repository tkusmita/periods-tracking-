"use client"

import { Calendar, BarChart3, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "symptoms", label: "Symptoms", icon: Heart },
  ]

  return (
    <div className="flex justify-center">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
