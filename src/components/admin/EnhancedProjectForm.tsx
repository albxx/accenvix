import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, Calendar, DollarSign, Users, Target, FileText, Tag, Clock, MapPin, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useProjects } from '@/hooks/supabase/useProjects'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'

// Validation schema
const projectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters').max(100, 'Project name cannot exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description cannot exceed 1000 characters'),
  status: z.enum(['planning', 'in-progress', 'review', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  start_date: z.date().refine(date => date >= new Date(), 'Start date must be today or in the future'),
  end_date: z.date().refine(date => date >= new Date(), 'End date must be today or in the future'),
  project_type: z.string().min(1, 'Please select a project type'),
  category: z.string().min(1, 'Please select a project category'),
  budget: z.number().min(0, 'Budget must be a positive number').max(999999999.99, 'Budget cannot exceed 999,999,999.99'),
  estimated_hours: z.number().min(0, 'Estimated hours must be a positive number').max(99999.99, 'Estimated hours cannot exceed 99,999.99'),
  template_id: z.string().optional(),
  // Team assignments
  team_assignments: z.array(z.object({
    team_member_id: z.string(),
    role: z.enum(['project_manager', 'team_member', 'stakeholder'])
  })).optional(),
  // Milestones
  milestones: z.array(z.object({
    name: z.string().min(2, 'Milestone name must be at least 2 characters'),
    description: z.string().optional(),
    due_date: z.date(),
    progress: z.number().min(0).max(100)
  })).optional()
}).refine(data => data.end_date >= data.start_date, {
  message: 'End date must be after start date',
  path: ['end_date']
})

type FormData = z.infer<typeof projectSchema>

interface EnhancedProjectFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: Partial<FormData>
}

export function EnhancedProjectForm({ onSuccess, onCancel, initialData }: EnhancedProjectFormProps) {
  const { createProject, fetchProjectTemplates, fetchProjectCategories, fetchProjectTypes } = useProjects()
  const { teamMembers, loading: teamLoading } = useTeamMembers()
  const { toast } = useToast()
  
  const [templates, setTemplates] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [types, setTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [milestones, setMilestones] = useState<Array<{
    name: string
    description: string
    due_date: Date | null
    progress: number
  }>>([])

  const form = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'planning',
      priority: 'medium',
      start_date: new Date(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      project_type: '',
      category: '',
      budget: 0,
      estimated_hours: 0,
      template_id: '',
      team_assignments: [],
      milestones: []
    }
  })

  useEffect(() => {
    loadDropdownData()
  }, [])

  const loadDropdownData = async () => {
    try {
      const [templateData, categoryData, typeData] = await Promise.all([
        fetchProjectTemplates(),
        fetchProjectCategories(),
        fetchProjectTypes()
      ])
      setTemplates(templateData)
      setCategories(categoryData)
      setTypes(typeData)
    } catch (error) {
      console.error('Error loading dropdown data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load project data. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId)
    if (templateId) {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        form.setValue('project_type', template.project_type)
        form.setValue('category', template.category)
        form.setValue('budget', template.default_budget)
        form.setValue('estimated_hours', template.default_estimated_hours)
      }
    }
  }

  const addMilestone = () => {
    setMilestones([...milestones, {
      name: '',
      description: '',
      due_date: null,
      progress: 0
    }])
  }

  const updateMilestone = (index: number, field: string, value: any) => {
    const newMilestones = [...milestones]
    newMilestones[index] = { ...newMilestones[index], [field]: value }
    setMilestones(newMilestones)
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      // Prepare project data
      const projectData = {
        ...data,
        start_date: data.start_date.toISOString().split('T')[0],
        end_date: data.end_date.toISOString().split('T')[0],
        milestones: milestones.map(m => ({
          name: m.name,
          description: m.description,
          due_date: m.due_date ? m.due_date.toISOString().split('T')[0] : null,
          progress: m.progress
        }))
      }

      await createProject(projectData as any)
      
      toast({
        title: 'Success',
        description: 'Project created successfully!'
      })
      
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Project</h2>
          <p className="text-muted-foreground">
            Set up your project with comprehensive details and team assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? 'Creating...' : 'Create Project'}
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
              Core project details and identification
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                rows={4}
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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

        {/* Project Classification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Project Classification
            </CardTitle>
            <CardDescription>
              Categorize and classify your project for better organization
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="template_id">Project Template</Label>
              <Controller
                name="template_id"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={(value) => {
                    field.onChange(value)
                    handleTemplateSelect(value)
                  }} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Template</SelectItem>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type *</Label>
              <Controller
                name="project_type"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.project_type && (
                <p className="text-sm text-red-500">{form.formState.errors.project_type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" style={{ backgroundColor: category.color + '20', color: category.color }}>
                              {category.name}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline and Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline & Budget
            </CardTitle>
            <CardDescription>
              Set project timeline and financial parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
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
              {form.formState.errors.start_date && (
                <p className="text-sm text-red-500">{form.formState.errors.start_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date *</Label>
              <Controller
                name="end_date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholderText="Select end date"
                  />
                )}
              />
              {form.formState.errors.end_date && (
                <p className="text-sm text-red-500">{form.formState.errors.end_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-10"
                  {...form.register('budget', { valueAsNumber: true })}
                />
              </div>
              {form.formState.errors.budget && (
                <p className="text-sm text-red-500">{form.formState.errors.budget.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_hours">Estimated Hours *</Label>
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
          </CardContent>
        </Card>

        {/* Team Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Assignments
            </CardTitle>
            <CardDescription>
              Assign team members to this project with their roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!teamLoading ? (
                teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <UserPlus className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Project Manager
                        </Button>
                        <Button variant="outline" size="sm">
                          Team Member
                        </Button>
                        <Button variant="outline" size="sm">
                          Stakeholder
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No team members available. Please add team members first.
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Loading team members...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Milestones
            </CardTitle>
            <CardDescription>
              Define key milestones for tracking project progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <Card key={index} className="border-dashed">
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                    <div className="space-y-2">
                      <Label>Milestone Name *</Label>
                      <Input
                        placeholder="Milestone name"
                        value={milestone.name}
                        onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Milestone description"
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <DatePicker
                        selected={milestone.due_date}
                        onSelect={(date) => updateMilestone(index, 'due_date', date)}
                        placeholderText="Select due date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Progress (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={milestone.progress}
                        onChange={(e) => updateMilestone(index, 'progress', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMilestone(index)}
                      className="md:col-span-4"
                    >
                      Remove Milestone
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" onClick={addMilestone} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
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
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  )
}