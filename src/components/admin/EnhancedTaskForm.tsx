import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, Calendar, Clock, User, Target, Link, Unlink, Edit, Trash2, FileText, Paperclip } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useTasks } from '@/hooks/supabase/useTasks'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'

// Validation schema
const taskSchema = z.object({
  name: z.string().min(2, 'Task name must be at least 2 characters').max(100, 'Task name cannot exceed 100 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters').max(1000, 'Description cannot exceed 1000 characters'),
  project_id: z.string().min(1, 'Please select a project'),
  assignee_id: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  start_date: z.date().optional(),
  due_date: z.date().optional(),
  estimated_hours: z.number().min(0, 'Estimated hours must be a positive number').max(9999.99, 'Estimated hours cannot exceed 9999.99'),
  actual_hours: z.number().min(0, 'Actual hours must be a positive number').max(9999.99, 'Actual hours cannot exceed 9999.99'),
  // Dependencies
  dependencies: z.array(z.object({
    depends_on_task_id: z.string(),
    dependency_type: z.enum(['finish-to-start', 'start-to-start', 'finish-to-finish', 'start-to-finish'])
  })).optional()
})

type FormData = z.infer<typeof taskSchema>

interface EnhancedTaskFormProps {
  isOpen?: boolean
  onSuccess?: () => void
  onCancel?: () => void
  onClose?: () => void
  initialData?: Partial<FormData> & { id?: string }
  projectId?: string
}

export function EnhancedTaskForm({ onSuccess, onCancel, onClose, initialData, projectId }: EnhancedTaskFormProps) {
  const { createTask, updateTask, addDependency, removeDependency, tasks: allTasks } = useTasks()
  const { projects } = useProjects()
  const { teamMembers } = useTeamMembers()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(false)
  const [dependencies, setDependencies] = useState<Array<{
    depends_on_task_id: string
    dependency_type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish'
  }>>([])

  const form = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      description: '',
      project_id: projectId || '',
      assignee_id: '',
      status: 'todo',
      priority: 'medium',
      start_date: undefined,
      due_date: undefined,
      estimated_hours: 0,
      actual_hours: 0,
      dependencies: []
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
      if (initialData.dependencies) {
        setDependencies(initialData.dependencies)
      }
    }
  }, [initialData, form])

  const addDependencyField = () => {
    setDependencies([...dependencies, {
      depends_on_task_id: '',
      dependency_type: 'finish-to-start'
    } as { depends_on_task_id: string; dependency_type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish' }])
  }

  const updateDependency = (index: number, field: string, value: any) => {
    const newDependencies = [...dependencies]
    newDependencies[index] = { ...newDependencies[index], [field]: value }
    setDependencies(newDependencies)
  }

  const removeDependencyField = (index: number) => {
    setDependencies(dependencies.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      // Prepare task data
      const taskData = {
        name: data.name,
        description: data.description,
        project_id: data.project_id,
        assignee_id: data.assignee_id || '',
        status: data.status,
        priority: data.priority,
        start_date: data.start_date ? data.start_date.toISOString().split('T')[0] : null,
        due_date: data.due_date ? data.due_date.toISOString().split('T')[0] : null,
        estimated_hours: Number(data.estimated_hours),
        actual_hours: Number(data.actual_hours)
      }

      let result
      if (initialData?.id) {
        // Update existing task
        result = await updateTask(initialData.id, taskData)
      } else {
        // Create new task
        result = await createTask(taskData)
      }
      
      // Handle dependencies
      if (dependencies.length > 0) {
        for (const dep of dependencies) {
          await addDependency(result.id, dep.depends_on_task_id, dep.dependency_type)
        }
      }
      
      toast({
        title: 'Success',
        description: initialData ? 'Task updated successfully!' : 'Task created successfully!'
      })
      
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error creating/updating task:', error)
      toast({
        title: 'Error',
        description: 'Failed to create/update task. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter tasks for dependencies (only tasks from the same project)
  const availableTasks = allTasks.filter(task => 
    task.project_id === (form.watch('project_id') || projectId)
  )

  const getDependencyTypeLabel = (type: string) => {
    switch (type) {
      case 'finish-to-start': return 'Finish to Start (FS)'
      case 'start-to-start': return 'Start to Start (SS)'
      case 'finish-to-finish': return 'Finish to Finish (FF)'
      case 'start-to-finish': return 'Start to Finish (SF)'
      default: return type
    }
  }

  const getDependencyIcon = (type: string) => {
    switch (type) {
      case 'finish-to-start': return <Link className="h-4 w-4" />
      case 'start-to-start': return <Link className="h-4 w-4" />
      case 'finish-to-finish': return <Link className="h-4 w-4" />
      case 'start-to-finish': return <Link className="h-4 w-4" />
      default: return <Link className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p className="text-muted-foreground">
            Set up task details with dependencies and assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Core task details and identification
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name *</Label>
              <Input
                id="name"
                placeholder="Enter task name"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_id">Project *</Label>
              <Controller
                name="project_id"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.project_id && (
                <p className="text-sm text-red-500">{form.formState.errors.project_id.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the task..."
                rows={4}
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee_id">Assignee</Label>
              <Controller
                name="assignee_id"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline and Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline & Hours
            </CardTitle>
            <CardDescription>
              Set task timeline and time estimates
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Controller
                name="start_date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholderText="Select start date"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Controller
                name="due_date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholderText="Select due date"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="estimated_hours"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  className="pl-10"
                  {...form.register('estimated_hours', { valueAsNumber: true })}
                />
              </div>
              {form.formState.errors.estimated_hours && (
                <p className="text-sm text-red-500">{form.formState.errors.estimated_hours.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="actual_hours">Actual Hours</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="actual_hours"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  className="pl-10"
                  {...form.register('actual_hours', { valueAsNumber: true })}
                />
              </div>
              {form.formState.errors.actual_hours && (
                <p className="text-sm text-red-500">{form.formState.errors.actual_hours.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Dependencies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Task Dependencies
            </CardTitle>
            <CardDescription>
              Define task dependencies for proper workflow sequencing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dependencies.map((dependency, index) => (
                <Card key={index} className="border-dashed">
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    <div className="space-y-2">
                      <Label>Depends On Task</Label>
                      <Select
                        value={dependency.depends_on_task_id}
                        onValueChange={(value) => updateDependency(index, 'depends_on_task_id', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select task" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTasks.map(task => (
                            <SelectItem key={task.id} value={task.id}>
                              {task.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Dependency Type</Label>
                      <Select
                        value={dependency.dependency_type}
                        onValueChange={(value) => updateDependency(index, 'dependency_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="finish-to-start">Finish to Start (FS)</SelectItem>
                          <SelectItem value="start-to-start">Start to Start (SS)</SelectItem>
                          <SelectItem value="finish-to-finish">Finish to Finish (FF)</SelectItem>
                          <SelectItem value="start-to-finish">Start to Finish (SF)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeDependencyField(index)}
                        className="w-full"
                      >
                        <Unlink className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" onClick={addDependencyField} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Dependency
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </div>
  )
}