import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Package2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeSelector } from '@/components/admin/ThemeSelector'
import { cn } from '@/lib/utils'

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Projects',
    href: '/admin/projects',
  },
  {
    title: 'Tasks',
    href: '/admin/tasks',
  },
  {
    title: 'Team',
    href: '/admin/team',
  },
  {
    title: 'Reports',
    href: '/admin/reports',
  },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Mobile sidebar trigger */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-6">
              <Link to="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span>Accenvix Admin</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-background fixed inset-y-0 left-0 z-50">
        <div className="flex h-14 items-center border-b px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Accenvix Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Admin</span>
              <span className="text-xs text-muted-foreground truncate">
                {user?.email}
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex flex-col flex-1">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1"></div>
          <ThemeSelector />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-muted-foreground truncate">
                {user?.email}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}