"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterDropdownProps {
  title: string
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
}

export function FilterDropdown({ title, options, value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: string) => {
    onChange(option === "All" ? null : option)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="bg-white border-[#b9b5ac] text-[#302f2d] rounded-full flex items-center gap-2 px-4 transition-all duration-200 hover:shadow-md hover:border-[#302f2d] hover:-translate-y-0.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 max-h-60 overflow-auto animate-fade-in-down border border-[#b9b5ac]/20">
          {options.map((option, index) => (
            <button
              key={option}
              className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 animate-fade-in-up ${
                (option === "All" && value === null) || option === value
                  ? "bg-[#e8e7e3] text-[#302f2d] font-medium"
                  : "text-[#302f2d] hover:bg-[#e8e7e3] hover:translate-x-1"
              }`}
              style={{ animationDelay: `${index * 0.03}s` }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
