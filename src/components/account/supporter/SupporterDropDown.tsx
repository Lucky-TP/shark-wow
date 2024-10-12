"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

type Props = {
  status: string;
};

const projectOptions = [
  { value: 'contribution', label: 'My Contributions' },
  { value: 'favorite', label: 'Favorite Projects' },
]

export default function SupporterDropdown({ status = 'contribution' }: Props) {
  const [currentStatus, setCurrentStatus] = useState<string>(status)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status) {
      setCurrentStatus(status)
    }
  }, [status])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleStatusChange = (newStatus: 'contribution' | 'favorite') => {
    setCurrentStatus(newStatus)
    setIsOpen(false)
    router.push(`/supporter/${newStatus}`)
  }

  const getStatusText = (status: string) => {
    return projectOptions.find(option => option.value === status)?.label || 'My Contributions'
  }

  return (
    <div className="px-6 pb-6  relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-4xl font-bold flex items-center focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {getStatusText(currentStatus)}
        <ChevronDown className="ml-2 h-8 w-8" />
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
          role="listbox"
        >
          {projectOptions.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStatusChange(option.value as 'contribution' | 'favorite')}
              role="option"
              aria-selected={option.value === currentStatus}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}