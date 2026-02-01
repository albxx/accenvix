import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTasks } from '@/hooks/supabase/useTasks'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Calendar, Clock, Users, FolderOpen, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'

export default function Dashboard() {
  const { projects, loading: projectsLoading } = useProjects()
  const { tasks, loading: tasksLoading } = useTasks()
  const { teamMembers, loading: teamLoading } = useTeamMembers()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projectsLoading && !tasksLoading && !teamLoading) {
      setLoading(false)
    }
  }, [projectsLoading, tasksLoading, teamLoading])

  // Calculate statistics
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  const completedProjects = projects.filter(p => p.status === 'completed').length
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length
  
  const teamSize = teamMembers.length

  // Get recent projects
  const recentProjects = projects.slice(0, 5)

  // Get overdue tasks
  const overdueTasks = tasks
    .filter(task => {
      if (task.status === 'completed') return false
      if (!task.due_date) return false
      return new Date(task.due_date) < new Date()
    })
    .slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>
      case 'review':
        return <Badge variant="outline">Review</Badge>
      case 'planning':
        return <Badge variant="outline">Planning</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your project management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {activeProjects} active, {completedProjects} completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} completed, {pendingTasks} pending
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamSize}</div>
              <p className="text-xs text-muted-foreground">
                Active team members
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Need immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Latest projects in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(project.created_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                ))}
                {recentProjects.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No projects found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Overdue Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Overdue Tasks</CardTitle>
              <CardDescription>
                Tasks that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">{task.name}</span>
                      <span className="text-sm text-muted-foreground">
                        Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <Badge variant="destructive">Overdue</Badge>
                  </div>
                ))}
                {overdueTasks.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No overdue tasks
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions to manage your projects
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline">
              <FolderOpen className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Assign New Task
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}