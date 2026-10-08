import { useEffect, useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { reservationSchema, times, type ReservationInput } from '@/lib/reservation-schema';
import { createReservation, getUnavailableTables } from '@/lib/reservations.functions';

type Confirmation = { reference: string; date: string; time: string; guests: number; table_number: number };
export function Reservation({ open,onClose }: { open: boolean; onClose: () => void }) {
 const [form,setForm] = useState<ReservationInput>({ name:'', email:'', phone:'', date:'', time:'19:00', guests:2, table_number:1, occasion:'Dinner', special_request:'' });
 const [step,setStep] = useState(1);
 const [error,setError] = useState('');
 const [saving,setSaving] = useState(false);
 const [checking,setChecking] = useState(false);
 const [unavailable,setUnavailable] = useState<number[]>([]);
 const [confirmation,setConfirmation] = useState<Confirmation | null>(null);
 const reserve = useServerFn(createReservation);
 const checkTables = useServerFn(getUnavailableTables);
 const change = (key: keyof ReservationInput, value: string | number) => { setForm(current => ({...current,[key]:value})); setError(''); };
 useEffect(() => { if(open) { setStep(1);setConfirmation(null);setError(''); } },[open]);
 async function next(e: FormEvent) {
  e.preventDefault(); setError('');
  const result = reservationSchema.safeParse(form);
  if (!result.success) { setError(result.error.issues[0]?.message ?? 'Please check your details.'); return; }
  setChecking(true);
  try { const taken = await checkTables({ data: { date: form.date, time: form.time } }); setUnavailable(taken); const available = Array.from({length:8},(_,i)=>i+1).find(n => !taken.includes(n)); if (!available) { setError('All tables are reserved at this time. Please choose another time.'); return; } setForm(current => ({...current,table_number:available})); setStep(2); }
  catch (err) { setError(err instanceof Error ? err.message : 'Availability could not be checked. Please try again.'); }
  finally { setChecking(false); }
 }
 async function submit() {
  setSaving(true);setError('');
  try { const result = await reserve({data:form}); setConfirmation(result); }
  catch(err) { setError(err instanceof Error ? err.message : 'Your reservation could not be saved. Please try again.'); try { setUnavailable(await checkTables({data:{date:form.date,time:form.time}})); } catch { /* Original error remains visible. */ } }
  finally { setSaving(false); }
 }
 return <Dialog open={open} onOpenChange={value => !value && onClose()}><DialogContent className="dining-dialog"><DialogTitle className="sr-only">{confirmation ? 'Your table is ready' : 'Reserve your table'}</DialogTitle><DialogDescription className="sr-only">Choose your evening, your company, and your table.</DialogDescription>
 {confirmation ? <div className="confirmation"><Check className="confirmation-icon"/><p className="eyebrow">NOIRÉ / {confirmation.reference}</p><h2 className="mt-5">Your table is <em>ready.</em></h2><div className="confirmation-details"><div>DATE<strong>{new Date(confirmation.date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</strong></div><div>TIME<strong>{confirmation.time}</strong></div><div>GUESTS<strong>{confirmation.guests}</strong></div><div>TABLE<strong>{String(confirmation.table_number).padStart(2,'0')}</strong></div></div><p className="body-copy">Your reservation has been saved.<br/>We’ll see you soon.</p><Button variant="diningOutline" className="mt-8" onClick={onClose}>Return to the experience</Button></div> : <><p className="eyebrow">An evening, made yours / 0{step} of 02</p><h2 className="mt-4">Your table <em>awaits.</em></h2>
 {step===1 ? <form onSubmit={next}><div className="form-grid"><label className="form-field">Full name<input name="name" required autoComplete="name" maxLength={100} value={form.name} onChange={e=>change('name',e.target.value)} placeholder="Your name"/></label><label className="form-field">Email address<input name="email" type="email" required autoComplete="email" maxLength={254} value={form.email} onChange={e=>change('email',e.target.value)} placeholder="you@example.com"/></label><label className="form-field">Phone number<input name="phone" type="tel" required autoComplete="tel" maxLength={30} value={form.phone} onChange={e=>change('phone',e.target.value)} placeholder="+44"/></label><label className="form-field">Date<input name="date" type="date" required min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e=>change('date',e.target.value)}/></label><label className="form-field">Time<select name="time" value={form.time} onChange={e=>change('time',e.target.value)}>{times.map(time=><option key={time}>{time}</option>)}</select></label><label className="form-field">Guests<select name="guests" value={form.guests} onChange={e=>change('guests',Number(e.target.value))}>{Array.from({length:8},(_,i)=><option key={i} value={i+1}>{i+1} {i===0?'guest':'guests'}</option>)}</select></label><label className="form-field full">Occasion<select name="occasion" value={form.occasion} onChange={e=>change('occasion',e.target.value)}>{['Dinner','Birthday','Anniversary','Date night','Business dinner','Celebration','Other'].map(occasion=><option key={occasion}>{occasion}</option>)}</select></label><label className="form-field full">Special requests <textarea name="special_request" maxLength={1000} value={form.special_request} onChange={e=>change('special_request',e.target.value)} placeholder="Dietary requirements or a little something special…"/></label></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="reservation-actions"><p>A little anticipation is part of the experience.</p><Button variant="dining" type="submit" disabled={checking}>{checking?'Checking tables…':'Choose your table'}<ArrowRight/></Button></div></form> : <><div className="table-selector"><p className="body-copy">{form.guests} guests · {form.date} · {form.time}</p><p className="eyebrow mt-6 mb-4">Window side</p><div className="table-plan" role="group" aria-label="Select a table">{Array.from({length:8},(_,i)=>i+1).map(n=><Button variant="editorial" key={n} className={`table-choice ${form.table_number===n?'selected':''}`} disabled={unavailable.includes(n)||saving} aria-pressed={form.table_number===n} aria-label={`Table ${n}${unavailable.includes(n)?', unavailable':''}`} onClick={()=>change('table_number',n)}>{String(n).padStart(2,'0')}</Button>)}</div><div className="table-legend"><span>Available · Select your favourite</span><span>Table {String(form.table_number).padStart(2,'0')} selected</span></div></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="reservation-actions"><Button variant="editorial" onClick={()=>setStep(1)} disabled={saving}>← Your details</Button><Button variant="dining" onClick={submit} disabled={saving||unavailable.includes(form.table_number)}>{saving?'Reserving…':'Confirm reservation'}<ArrowRight/></Button></div></>}
 </>}
 </DialogContent></Dialog>;
}