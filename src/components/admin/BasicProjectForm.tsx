import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTeamMembers } from '@/hooks/supabase/useTeamMembers'

interface BasicProjectFormProps {
  onSuccess?: (data: any) => void
  onCancel?: () => void
  initialData?: any
}

export function BasicProjectForm({ onSuccess, onCancel, initialData }: BasicProjectFormProps) {
  const { teamMembers } = useTeamMembers()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status || 'planning',
    priority: initialData?.priority || 'medium',
    owner_id: initialData?.owner_id || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    project_type: initialData?.project_type || 'Web Development',
    category: initialData?.category || 'General',
    budget: initialData?.budget || 0,
    estimated_hours: initialData?.estimated_hours || 0,
    actual_hours: initialData?.actual_hours || 0,
    template_id: initialData?.template_id || null
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Pass the form data back to the parent component
    if (onSuccess) onSuccess(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter project name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner_id">Project Owner</Label>
          <Select value={formData.owner_id} onValueChange={(value) => handleInputChange('owner_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select owner" />
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_type">Project Type</Label>
          <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              <SelectItem value="Backend Development">Backend Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="API">API</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget (RM)</Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_hours">Estimated Hours</Label>
          <Input
            id="estimated_hours"
            type="number"
            value={formData.estimated_hours}
            onChange={(e) => handleInputChange('estimated_hours', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your project..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}