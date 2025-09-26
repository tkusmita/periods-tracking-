import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Moon className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Luna</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Sun className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
