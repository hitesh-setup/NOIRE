import { useState, type FormEvent } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { dishes, restaurant } from '@/data/restaurant';
export function Concierge({onReserve}:{onReserve:()=>void}) {
 const [open,setOpen]=useState(false);const [input,setInput]=useState('');const [messages,setMessages]=useState([{role:'host',text:'Welcome to NOIRÉ. I’m your dining guide. What would make your evening special?'}]);
 function ask(question:string){if(!question.trim())return;const q=question.toLowerCase();let answer='For a beautiful introduction to NOIRÉ, begin with Garden Burrata, savour our signature Truffle risotto, and finish with Dark Chocolate. Let the evening take its time.';
 if(q.includes('vegetarian')||q.includes('vegan'))answer='Our plant-led favourites include '+dishes.filter(d=>d.tags.includes(q.includes('vegan')?'Vegan':'Vegetarian')).slice(0,4).map(d=>d.name).join(', ')+'. You can explore every option using the menu’s dietary preference filter.';
 else if(q.includes('spicy'))answer='Try our Charred Aubergine: coal-roasted, glazed with miso, and finished with sesame and chilli. A little warmth, beautifully balanced.';
 else if(q.includes('signature')||q.includes('truffle'))answer='NOIRÉ Truffle is the chef’s signature: aged carnaroli rice, freshly shaved black truffle, and 36-month Parmesan. A quiet celebration of the forest.';
 else if(q.includes('time')||q.includes('open'))answer=`We welcome guests ${restaurant.hours}.`;
 else if(q.includes('reserv')||q.includes('table'))answer='Your table awaits. Choose “Reserve your table” below to select your evening and your favourite table.';
 setMessages(current=>[...current,{role:'guest',text:question},{role:'host',text:answer}]);setInput('');
 }
 const submit=(e:FormEvent)=>{e.preventDefault();ask(input);};
 return <><Button variant="editorial" className="concierge-trigger" onClick={()=>setOpen(true)}><Sparkles/> ASK NOIRÉ</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="dining-dialog concierge-dialog"><p className="eyebrow">A little guidance, a lovely evening</p><DialogTitle>Ask NOIRÉ</DialogTitle><DialogDescription className="body-copy">Your dining guide · curated responses</DialogDescription><div className="concierge-messages" aria-live="polite">{messages.map((m,i)=><p className={m.role==='guest'?'guest':''} key={i}>{m.text}</p>)}</div><div className="concierge-prompts">{['For two people?','Vegetarian favourites?','The chef’s signature?'].map(q=><Button key={q} variant="editorial" onClick={()=>ask(q)}>{q}</Button>)}</div><form className="concierge-input" onSubmit={submit}><input aria-label="Ask the dining guide" placeholder="What do you have in mind?" maxLength={500} value={input} onChange={e=>setInput(e.target.value)}/><Button variant="editorial" size="icon" type="submit" aria-label="Send message"><ArrowUp/></Button></form><Button variant="diningOutline" onClick={()=>{setOpen(false);onReserve();}}>Reserve your table</Button></DialogContent></Dialog></>;
}