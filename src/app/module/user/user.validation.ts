

import { z } from 'zod';


export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required"),
        role: z.enum(['user', 'admin']).optional().default("user"), 
        isBlocked: z.boolean().optional().default(false), 
})
});


export const updateUserValidationSchema = z.object({
    body: z.object({
        
        isBlocked: z.boolean(), 
})
});

// Export the schema for reuse
// export { createUserValidationSchema };
