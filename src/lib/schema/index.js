import * as z from 'zod'

export const LoginSchema = z.object({
  phone: z
    .string()
    .refine((phone) => phone.slice(0, 4) === '+998', {
      message: "Phone number must start with '+998'.",
    })
    .refine((phone) => phone.length === 13, {
      message: "Telefon raqam noto'g'ri",
    }),
  password: z.string().min(6, {
    message: 'Please enter a password with at least 6 characters, required',
  }),
  data: z
    .object({
      geo: z.any().optional(),
      agent: z.any().optional(),
      fingerprint: z.string().optional(),
    })
    .optional(),
})

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address, required.',
    }),
    phone: z
      .string()
      .refine((phone) => phone.slice(0, 4) === '+998', {
        message: "Phone number must start with '+998'.",
      })
      .refine((phone) => phone.length === 13, {
        message: "Telefon raqam noto'g'ri",
      }),
    password: z.string().min(6, {
      message: 'Please enter a password with at least 6 characters, required',
    }),
    passwordConfirmation: z.string().min(6, {
      message: 'Please confirm your password, required.',
    }),
    data: z
      .object({
        geo: z.any().optional(),
        agent: z.any().optional(),
        fingerprint: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  })

export const ChangePasswordSchema = z.object({
  id: z.number(),
  password: z.string().min(6, 'Current password is required'),
  new_password: z.string().min(6, 'Password must be at least 8 characters'),
  code: z.string().length(6),
})

export const ResetPasswordSchema = z.object({
  phone: z.string().min(10, 'Phone number is required'),
  code: z.string().min(4, 'SMS code is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
