import { useState, useEffect } from 'react'
import { useProjects } from '@/hooks/supabase/useProjects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, Search, Target, Clock, FileText, Copy } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

// Mock project templates data
const mockTemplates = [
  {
    id: '1',
    name: 'E-commerce Website',
    description: 'Complete e-commerce platform with product catalog, shopping cart, and checkout flow',
    project_type: 'Web Development',
    category: 'E-commerce',
    estimated_hours: 160,
    budget: 15000,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application with React Native',
    project_type: 'Mobile Development',
    category: 'Mobile',
    estimated_hours: 200,
    budget: 25000,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    name: 'Corporate Website',
    description: 'Professional corporate website with CMS integration',
    project_type: 'Web Development',
    category: 'Corporate',
    estimated_hours: 80,
    budget: 8000,
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'RESTful API development and integration services',
    project_type: 'Backend Development',
    category: 'API',
    estimated_hours: 120,
    budget: 12000,
    created_at: '2024-01-01T16:45:00Z',
    updated_at: '2024-01-01T16:45:00Z'
  }
]

export default function ProjectTemplates() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  
  const { projects } = useProjects()
  const { toast } = useToast()

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || template.project_type === selectedType
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const projectTypes = [...new Set(mockTemplates.map(t => t.project_type))]
  const categories = [...new Set(mockTemplates.map(t => t.category))]

  const handleCreateFromTemplate = (template: any) => {
    // In a real implementation, this would create a new project based on the template
    toast({
      title: 'Project Created',
      description: `New project "${template.name}" has been created from template.`,
    })
  }

  const handleDuplicateTemplate = (template: any) => {
    // In a real implementation, this would create a new template based on the existing one
    toast({
      title: 'Template Duplicated',
      description: `Template "${template.name}" has been duplicated.`,
    })
  }

  const handleDeleteTemplate = (templateId: string) => {
    // In a real implementation, this would delete the template
    toast({
      title: 'Template Deleted',
      description: 'The template has been deleted.',
      variant: 'destructive',
    })
  }

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'Web Development': return 'bg-blue-100 text-blue-800'
      case 'Mobile Development': return 'bg-green-100 text-green-800'
      case 'Backend Development': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'E-commerce': return 'bg-orange-100 text-orange-800'
      case 'Mobile': return 'bg-green-100 text-green-800'
      case 'Corporate': return 'bg-blue-100 text-blue-800'
      case 'API': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Templates</h1>
            <p className="text-muted-foreground">
              Reusable templates for common project types
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Types</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Template Library</CardTitle>
            <CardDescription>
              Browse and manage project templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Est. Hours</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{template.name}</span>
                        <span className="text-sm text-muted-foreground">{template.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getProjectTypeColor(template.project_type)}>
                        {template.project_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{template.estimated_hours}h</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">RM {template.budget.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span>{format(new Date(template.created_at), 'MMM dd, yyyy')}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCreateFromTemplate(template)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Use Template
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicateTemplate(template)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditing(template.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTemplates.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No templates found. Create your first template to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Template Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Templates</CardTitle>
              <CardDescription>
                Available project templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockTemplates.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {projectTypes.length} types, {categories.length} categories
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Hours</CardTitle>
              <CardDescription>
                Across all templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(mockTemplates.reduce((sum, t) => sum + t.estimated_hours, 0) / mockTemplates.length)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Estimated project duration
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Budget</CardTitle>
              <CardDescription>
                Across all templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                RM {(mockTemplates.reduce((sum, t) => sum + t.budget, 0) / mockTemplates.length).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Estimated project cost
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
            <CardDescription>
              Most commonly used template types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTemplates.slice(0, 3).map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge className={getProjectTypeColor(template.project_type)}>
                        {template.project_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimated_hours}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>RM {template.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCreateFromTemplate(template)}
                      >
                        Use Template
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicateTemplate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}