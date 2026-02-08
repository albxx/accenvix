import { useState, useEffect } from 'react'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTasks } from '@/hooks/supabase/useTasks'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Plus, Calendar, Users, Target, Clock, TrendingUp, TrendingDown, Activity, FileText } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { format } from 'date-fns'

export default function ProjectDashboard() {
  const { projects, loading: projectsLoading } = useProjects()
  const { tasks, loading: tasksLoading } = useTasks()
  const { teamMembers, loading: membersLoading } = useTeamMembers()
  
  const [timeRange, setTimeRange] = useState('week')

  // Calculate project metrics
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  const totalHours = projects.reduce((sum, p) => sum + (p.actual_hours || 0), 0)

  // Calculate task metrics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
  const overdueTasks = tasks.filter(t => {
    if (!t.due_date) return false
    const dueDate = new Date(t.due_date)
    const today = new Date()
    return dueDate < today && t.status !== 'completed'
  }).length

  // Calculate team metrics
  const totalMembers = teamMembers.length
  const activeMembers = teamMembers.length // In a real app, this would be based on activity

  // Project status distribution
  const statusData = [
    { name: 'Planning', value: projects.filter(p => p.status === 'planning').length, color: '#f59e0b' },
    { name: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length, color: '#3b82f6' },
    { name: 'Review', value: projects.filter(p => p.status === 'review').length, color: '#f59e0b' },
    { name: 'Completed', value: projects.filter(p => p.status === 'completed').length, color: '#10b981' }
  ]

  // Priority distribution
  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#10b981' }
  ]

  // Project progress data
  const projectProgressData = projects.map(project => {
    const projectTasks = tasks.filter(task => task.project_id === project.id)
    const totalProjectTasks = projectTasks.length
    const completedProjectTasks = projectTasks.filter(task => task.status === 'completed').length
    const progress = totalProjectTasks > 0 ? (completedProjectTasks / totalProjectTasks) * 100 : 0
    
    return {
      name: project.name,
      progress: Math.round(progress),
      totalTasks: totalProjectTasks,
      completedTasks: completedProjectTasks
    }
  }).sort((a, b) => b.progress - a.progress)

  // Team member workload
  const memberWorkloadData = teamMembers.map(member => {
    const memberTasks = tasks.filter(task => task.assignee_id === member.id)
    const totalTasks = memberTasks.length
    const completedTasks = memberTasks.filter(task => task.status === 'completed').length
    const inProgressTasks = memberTasks.filter(task => task.status === 'in-progress').length
    const overdueTasks = memberTasks.filter(task => {
      if (!task.due_date) return false
      const dueDate = new Date(task.due_date)
      const today = new Date()
      return dueDate < today && task.status !== 'completed'
    }).length

    return {
      name: member.name,
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      overdue: overdueTasks
    }
  }).filter(member => member.total > 0)

  // Recent activity (mock data for now)
  const recentActivity = [
    { action: 'Project Created', project: 'E-commerce Platform', time: '2 hours ago' },
    { action: 'Task Completed', project: 'Mobile App', time: '4 hours ago' },
    { action: 'Team Member Added', project: 'Dashboard', time: '1 day ago' },
    { action: 'Project Updated', project: 'API Integration', time: '2 days ago' }
  ]

  if (projectsLoading || tasksLoading || membersLoading) {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of all projects and team performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RM {totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {totalProjects} projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                {activeMembers} active members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-muted-foreground">
                Across all projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Task Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                All projects combined
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">
                Currently being worked on
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueTasks}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>
                Breakdown of projects by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Task Priority Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Task Priority Distribution</CardTitle>
              <CardDescription>
                Tasks by priority level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>
              Completion percentage for each project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Workload */}
        <Card>
          <CardHeader>
            <CardTitle>Team Workload</CardTitle>
            <CardDescription>
              Task distribution across team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memberWorkloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" />
                  <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}