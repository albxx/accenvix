import { useState, useEffect } from 'react'
import { useTasks } from '@/hooks/supabase/useTasks'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, Search, Calendar, Clock, User, Target, Link, Unlink, MessageSquare, Paperclip } from 'lucide-react'
import { EnhancedTaskForm } from '@/components/admin/EnhancedTaskForm'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'
import { AdminLayout } from '@/components/layout/AdminLayout'

export default function EnhancedTasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')
  
  const { tasks, loading, error, deleteTask } = useTasks()
  const { projects } = useProjects()
  const { teamMembers } = useTeamMembers()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = !selectedProject || task.project_id === selectedProject
    return matchesSearch && matchesProject
  })

  const handleDelete = async (taskId: string) => {
    setIsDeleting(taskId)
    try {
      await deleteTask(taskId)
      toast({
        title: 'Task deleted',
        description: 'The task has been successfully deleted.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the task. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleFormSubmit = () => {
    setIsFormOpen(false)
    setEditingTask(null)
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown'
  }

  const getAssigneeName = (assigneeId: string) => {
    return teamMembers.find(m => m.id === assigneeId)?.name || 'Unassigned'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'todo': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDependencyStatus = (task: any) => {
    if (!task.dependencies || task.dependencies.length === 0) return 'none'
    
    const completedDeps = task.dependencies.filter((dep: any) => 
      tasks.find(t => t.id === dep.depends_on_task_id)?.status === 'completed'
    ).length
    
    if (completedDeps === task.dependencies.length) return 'ready'
    if (completedDeps > 0) return 'partial'
    return 'blocked'
  }

  const getDependencyIcon = (status: string) => {
    switch (status) {
      case 'ready': return <Link className="h-4 w-4 text-green-600" />
      case 'partial': return <Link className="h-4 w-4 text-yellow-600" />
      case 'blocked': return <Unlink className="h-4 w-4 text-red-600" />
      default: return <Link className="h-4 w-4 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium">Error loading tasks</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track all project tasks with dependencies
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')}>
              List View
            </Button>
            <Button variant={viewMode === 'kanban' ? 'default' : 'outline'} onClick={() => setViewMode('kanban')}>
              Kanban View
            </Button>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Badge variant="outline">
              Total: {filteredTasks.length}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Completed: {filteredTasks.filter(t => t.status === 'completed').length}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              In Progress: {filteredTasks.filter(t => t.status === 'in-progress').length}
            </Badge>
          </div>
        </div>

        {viewMode === 'list' ? (
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
              <CardDescription>
                View and manage all tasks across your projects with dependency tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Dependencies</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Hours</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{task.name}</span>
                          <span className="text-sm text-muted-foreground">{task.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getProjectName(task.project_id)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{getAssigneeName(task.assignee_id)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getDependencyIcon(getDependencyStatus(task))}
                          <span className="text-sm">
                            {task.dependencies?.length || 0} deps
                          </span>
                          {task.dependencies && task.dependencies.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              ({getDependencyStatus(task)})
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{task.due_date ? format(new Date(task.due_date), 'MMM dd, yyyy') : 'No date'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{task.estimated_hours}h</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTask(task)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(task.id)}
                            disabled={isDeleting === task.id}
                          >
                            {isDeleting === task.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No tasks found. Create your first task to get started.
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['todo', 'in-progress', 'review', 'completed'].map((status) => (
              <Card key={status}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center justify-between">
                    {status}
                    <Badge variant="outline">
                      {filteredTasks.filter(t => t.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredTasks
                      .filter(t => t.status === status)
                      .map((task) => (
                        <Card key={task.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{task.name}</h4>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {task.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <User className="h-3 w-3" />
                                <span>{getAssigneeName(task.assignee_id)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-3 w-3" />
                                <span>{task.due_date ? format(new Date(task.due_date), 'MMM dd') : 'No date'}</span>
                              </div>
                            </div>
                            {task.dependencies && task.dependencies.length > 0 && (
                              <div className="mt-2 flex items-center space-x-2 text-xs">
                                {getDependencyIcon(getDependencyStatus(task))}
                                <span>{task.dependencies.length} dependencies</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <EnhancedTaskForm
          isOpen={isFormOpen || !!editingTask}
          onClose={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
          onSuccess={handleFormSubmit}
          initialData={editingTask}
        />
      </div>
    </AdminLayout>
  )
}