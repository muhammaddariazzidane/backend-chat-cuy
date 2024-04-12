import { type ZodIssue } from 'zod'

interface ValidationIssues {
  name: string
  message: string
}

const mapValidationIssuesToErrors = (issues: ZodIssue[]): ValidationIssues[] => {
  return issues.map((issue) => ({
    name: issue.path.join('.'),
    message: issue.message,
  }))
}

export const handleValidation = async (req: any, res: any, functionValidation: (data: any) => Promise<any>) => {
  try {
    const validatedData = await functionValidation(req.body)
    if (!validatedData.success) {
      const {
        error: { issues },
      } = validatedData
      const errors = mapValidationIssuesToErrors(issues)
      return res.status(400).json({ message: 'Validation errors', errors })
    }
    return validatedData
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error?.meta?.cause })
  }
}
