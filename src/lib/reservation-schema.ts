import { z } from 'zod';
export const times = ['17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'] as const;
export const reservationSchema = z.object({
 name: z.string().trim().min(2, 'Please enter your full name.').max(100),
 email: z.string().trim().email('Please enter a valid email address.').max(254),
 phone: z.string().trim().min(5, 'Please enter a phone number.').max(30).regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number.'),
 date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a date.').refine(value => value >= new Date().toISOString().slice(0,10), 'Please choose today or a future date.').refine(value => { const d = new Date(value + 'T12:00:00Z'); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === value; }, 'Please choose a valid date.'),
 time: z.enum(times), guests: z.coerce.number().int().min(1).max(8),
 table_number: z.coerce.number().int().min(1).max(8),
 occasion: z.enum(['Dinner','Birthday','Anniversary','Date night','Business dinner','Celebration','Other']),
 special_request: z.string().trim().max(1000),
});
export type ReservationInput = z.infer<typeof reservationSchema>;