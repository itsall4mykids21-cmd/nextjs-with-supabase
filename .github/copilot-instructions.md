# GitHub Copilot Instructions

This repository is a **Next.js and Supabase Starter Kit** - a full-stack web application template with authentication, database integration, and modern UI components.

## Project Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Database & Auth**: Supabase (PostgreSQL with built-in authentication)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Language**: TypeScript
- **Package Manager**: npm

### Key Dependencies
- `@supabase/ssr` - Server-side rendering with Supabase
- `@supabase/supabase-js` - Supabase JavaScript client
- `next-themes` - Dark/light theme switching
- `class-variance-authority` - Component variant management
- `lucide-react` - Icon library

## Folder Structure

```
/app                    # Next.js App Router pages
  /auth                 # Authentication pages (login, signup, etc.)
  /protected            # Protected routes requiring authentication
  layout.tsx            # Root layout with theme provider
  page.tsx              # Homepage
/components             # React components
  /ui                   # shadcn/ui base components
  /tutorial             # Tutorial and onboarding components
  auth-button.tsx       # Authentication state display
  login-form.tsx        # Login form component
  sign-up-form.tsx      # Registration form component
/lib                    # Utility functions and configurations
  /supabase             # Supabase client configurations
    client.ts           # Browser client
    server.ts           # Server client
    middleware.ts       # Session management middleware
  utils.ts              # General utilities (cn function, etc.)
middleware.ts           # Next.js middleware for auth
```

## Code Patterns & Conventions

### Supabase Client Usage

**Server Components (Recommended for data fetching):**
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('table_name').select()
  
  return <div>{/* render data */}</div>
}
```

**Client Components (For interactive features):**
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function ClientComponent() {
  const [data, setData] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('table_name').select()
      setData(data)
    }
    fetchData()
  }, [])
  
  return <div>{/* render data */}</div>
}
```

### Authentication Patterns

**Check user authentication:**
```typescript
const supabase = await createClient()
const { data } = await supabase.auth.getClaims()
const user = data?.claims
```

**Protected route pattern:**
```typescript
// In page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  
  if (!data?.claims) {
    redirect('/auth/login')
  }
  
  return <div>Protected content</div>
}
```

### UI Component Patterns

**Using shadcn/ui components:**
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="sm">
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
```

**Custom component with variants:**
```typescript
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      secondary: 'secondary-classes',
    },
    size: {
      default: 'default-size',
      sm: 'small-size',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ComponentProps extends VariantProps<typeof variants> {
  className?: string
}

export function Component({ variant, size, className, ...props }: ComponentProps) {
  return (
    <div className={cn(variants({ variant, size, className }))} {...props} />
  )
}
```

### Form Handling Patterns

**Form with Server Actions:**
```typescript
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default function FormPage() {
  const handleSubmit = async (formData: FormData) => {
    'use server'
    
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      redirect('/auth/login?message=Could not authenticate user')
    }
    
    redirect('/protected')
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Development Guidelines

### File Naming
- Use kebab-case for files: `auth-button.tsx`, `sign-up-form.tsx`
- Use PascalCase for component names: `AuthButton`, `SignUpForm`
- Use camelCase for functions and variables: `createClient`, `handleSubmit`

### Import Organization
1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Relative imports

### Authentication Flow
- All authentication routes are under `/app/auth/`
- Protected routes should check authentication status
- Use middleware for automatic session management
- Redirect unauthorized users to `/auth/login`

### Database Interactions
- Always handle errors from Supabase operations
- Use TypeScript for type safety with database schemas
- Prefer server components for initial data loading
- Use client components for real-time features

### Styling Guidelines
- Use Tailwind utility classes for styling
- Follow shadcn/ui patterns for consistent design
- Use the `cn()` utility function for conditional classes
- Support both light and dark themes

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

### Common Tasks

**Adding a new page:**
1. Create file in `/app/` directory
2. Export default React component
3. Add authentication check if needed
4. Follow Next.js App Router conventions

**Adding a new UI component:**
1. Create in `/components/` directory
2. Use TypeScript interfaces for props
3. Apply consistent styling with Tailwind
4. Export component with proper naming

**Database operations:**
1. Use appropriate Supabase client (server vs client)
2. Handle loading and error states
3. Implement proper TypeScript types
4. Consider Row Level Security (RLS) policies

**Adding authentication features:**
1. Use Supabase Auth methods
2. Handle redirects appropriately
3. Update UI based on auth state
4. Consider protected route patterns

Remember to test authentication flows, responsive design, and both light/dark themes when making changes.