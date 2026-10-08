import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { reservationSchema, times } from './reservation-schema';

export const getUnavailableTables = createServerFn({ method: 'GET' })
 .inputValidator(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.enum(times) }))
 .handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: rows, error } = await supabaseAdmin.from('reservations').select('table_number').eq('date', data.date).eq('time', data.time);
  if (error) throw new Error('Table availability could not be checked. Please try again.');
  return (rows ?? []).map(row => row.table_number);
 });

export const createReservation = createServerFn({ method: 'POST' })
 .inputValidator(reservationSchema)
 .handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const reference = 'NR-' + crypto.randomUUID().slice(0,8).toUpperCase();
  const { data: saved, error } = await supabaseAdmin.from('reservations').insert({ ...data, reference }).select('reference,date,time,guests,table_number').single();
  if (error?.code === '23505') throw new Error('That table was just reserved. Please choose another table.');
  if (error || !saved) throw new Error('We could not save your reservation. Please try again.');
  return saved;
 });