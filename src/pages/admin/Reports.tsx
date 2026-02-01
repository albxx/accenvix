import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTasks } from '@/hooks/supabase/useTasks'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'

// Define types for our reports
interface TaskStatusReport {
  status: string
  count: number
  percentage: number
}

interface ProjectProgressReport {
  project: string
  completedTasks: number
  totalTasks: number
  progress: number
}

interface TeamPerformanceReport {
  member: string
  completedTasks: number
  totalTasks: number
  efficiency: number
}

export default function Reports() {
  const { tasks, loading: tasksLoading } = useTasks()
  const { projects, loading: projectsLoading } = useProjects()
  const { teamMembers, loading: teamLoading } = useTeamMembers()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30') // days
  const [taskStatusData, setTaskStatusData] = useState<TaskStatusReport[]>([])
  const [projectProgressData, setProjectProgressData] = useState<ProjectProgressReport[]>([])
  const [teamPerformanceData, setTeamPerformanceData] = useState<TeamPerformanceReport[]>([])

  useEffect(() => {
    if (!tasksLoading && !projectsLoading && !teamLoading) {
      setLoading(false)
      generateReports()
    }
  }, [tasksLoading, projectsLoading, teamLoading, tasks, projects, teamMembers])

  const generateReports = () => {
    // Task Status Report
    const statusCounts = {
      todo: 0,
      'in-progress': 0,
      review: 0,
      completed: 0
    }

    tasks.forEach(task => {
      statusCounts[task.status]++
    })

    const totalTasks = tasks.length
    const taskStatusReport: TaskStatusReport[] = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: totalTasks > 0 ? (count / totalTasks) * 100 : 0
    }))

    setTaskStatusData(taskStatusReport)

    // Project Progress Report
    const projectProgressReport: ProjectProgressReport[] = projects.map(project => {
      const projectTasks = tasks.filter(task => task.project_id === project.id)
      const completedTasks = projectTasks.filter(task => task.status === 'completed').length
      const totalTasks = projectTasks.length
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

      return {
        project: project.name,
        completedTasks,
        totalTasks,
        progress
      }
    })

    setProjectProgressData(projectProgressReport)

    // Team Performance Report
    const teamPerformanceReport: TeamPerformanceReport[] = teamMembers.map(member => {
      const memberTasks = tasks.filter(task => task.assignee_id === member.id)
      const completedTasks = memberTasks.filter(task => task.status === 'completed').length
      const totalTasks = memberTasks.length
      const efficiency = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

      return {
        member: member.name,
        completedTasks,
        totalTasks,
        efficiency
      }
    })

    setTeamPerformanceData(teamPerformanceReport)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'in-progress': return '#3b82f6'
      case 'review': return '#f59e0b'
      case 'todo': return '#6b7280'
      default: return '#9ca3af'
    }
  }

  const getProjectProgressColor = (progress: number) => {
    if (progress >= 80) return '#10b981'
    if (progress >= 50) return '#3b82f6'
    if (progress >= 20) return '#f59e0b'
    return '#ef4444'
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Track project progress, team performance, and task completion rates
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">
                {tasks.filter(t => t.status === 'completed').length} completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {projects.length} total projects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">
                Active team members
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.length > 0 
                  ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Task Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
            <CardDescription>
              Distribution of tasks across different statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Task Count">
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <div className="grid gap-4 md:grid-cols-2">
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
                    <XAxis dataKey="project" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                    <Legend />
                    <Bar dataKey="progress" name="Progress %" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Task completion efficiency by team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ member, efficiency }) => `${member}: ${efficiency.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="efficiency"
                      nameKey="member"
                    >
                      {teamPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 30}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Project Progress Table */}
          <Card>
            <CardHeader>
              <CardTitle>Project Task Completion</CardTitle>
              <CardDescription>
                Detailed breakdown by project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectProgressData.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{project.project}</TableCell>
                      <TableCell className="text-right">{project.completedTasks}</TableCell>
                      <TableCell className="text-right">{project.totalTasks}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${project.progress}%`,
                                backgroundColor: getProjectProgressColor(project.progress)
                              }}
                            ></div>
                          </div>
                          <span className="text-sm w-12">{project.progress.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {projectProgressData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No projects found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Team Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
              <CardDescription>
                Task completion by team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPerformanceData.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{member.member}</TableCell>
                      <TableCell className="text-right">{member.completedTasks}</TableCell>
                      <TableCell className="text-right">{member.totalTasks}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={member.efficiency >= 80 ? "default" : member.efficiency >= 50 ? "secondary" : "destructive"}>
                          {member.efficiency.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {teamPerformanceData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No team members found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}