// validation/loginSchema.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  // We'll treat the fake username/password fields as 'email' and 'password'
});

export const signupSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Sets the error on the confirmPassword field
});

export const createProfileSchema = z.object({
  // Assuming "Username" is First Name and "Password" is Last Name based on typical form layout
  firstName: z.string().trim().min(2, 'First Name is required.'),
  lastName: z.string().trim().min(2, 'Last Name is required.'),

  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Please select a gender.' }),
  }),

  country: z.string().trim().min(2, 'Country/Region is required.'),
  state: z.string().trim().min(2, 'State is required.'),
  pinCode: z.string().trim().regex(/^\d+$/, 'PIN Code must be a number.').min(5, 'PIN Code is required.'),
  streetAddress: z.string().trim().min(5, 'Street address is required.'),
  phone: z.string().trim().regex(/^\d{10,}$/, 'Invalid phone number format.'),

  // File is optional/handled outside the main form data, but we'll include a placeholder validation for the field itself
  profilePicture: z.any().optional(),
});