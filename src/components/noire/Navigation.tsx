import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Navigation({ scrolled, onReserve }: { scrolled: boolean; onReserve: () => void }) {
 const [open,setOpen] = useState(false);
 const items = ['Experience','Menu','Chef','Gallery','About'];
 return <><header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
  <a href="#" className="wordmark" aria-label="NOIRÉ home">NOIRÉ<small>THE ART OF DINING</small></a>
  <nav className="nav-links" aria-label="Main navigation">{items.map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item.toUpperCase()}</a>)}</nav>
  <div className="nav-right"><Button variant="diningOutline" onClick={onReserve}>Reserve a table <ArrowUpRight /></Button><Button variant="editorial" size="icon" className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
 </header>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{items.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}<Button variant="dining" onClick={() => { setOpen(false); onReserve(); }}>Reserve your table</Button></nav>}</>;
}