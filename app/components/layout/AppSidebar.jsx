'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart2, LogOut, Globe } from 'lucide-react'
import LogoutButton from '../buttons/LogoutButton'

const AppSidebar = () => {
  const path = usePathname()

  const navItems = [
    { href: "/account", label: "My Page", icon: LayoutDashboard },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
  ]

  return (
    <div className="flex flex-col h-screen">
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = path === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'
                }`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <LogoutButton className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">

        </LogoutButton>

        <Link
          href="/"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Globe className="mr-3 h-5 w-5 text-gray-400" />
          Back to website
        </Link>
      </div>
    </div>
  )
}

export default AppSidebar

