import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { categories, dishes, formatPrice, type Dish } from '@/data/restaurant';

export function DiningMenu({ onReserve }: { onReserve: () => void }) {
 const [category,setCategory] = useState('Signature');
 const [search,setSearch] = useState('');
 const [diet,setDiet] = useState('All preferences');
 const [selected,setSelected] = useState<Dish | null>(null);
 const rail = useRef<HTMLDivElement>(null);
 const visible = dishes.filter(d => (search ? true : d.category === category) && (d.name + ' ' + d.description).toLowerCase().includes(search.toLowerCase()) && (diet === 'All preferences' || d.tags.includes(diet)));
 return <>
 <section className="signature section-wrap" aria-labelledby="signature-heading">
  <div className="section-heading"><div><p className="eyebrow">A taste of NOIRÉ</p><h2 className="section-title" id="signature-heading">Our signature <em>expressions.</em></h2></div><div className="flex gap-5"><Button variant="editorial" size="icon" aria-label="Previous signature dishes" onClick={() => rail.current?.scrollBy({ left: -400, behavior: 'smooth' })}><ArrowLeft/></Button><Button variant="editorial" size="icon" aria-label="Next signature dishes" onClick={() => rail.current?.scrollBy({ left: 400, behavior: 'smooth' })}><ArrowRight/></Button></div></div>
  <div ref={rail} className="signature-carousel">{dishes.filter(d => d.featured).map((dish,index) => <article className="signature-item" key={dish.id}>
   {dish.image ? <Button variant="editorial" className="signature-image-button" onClick={() => setSelected(dish)} aria-label={`View ${dish.name}`}><img src={dish.image} alt={dish.name} loading="lazy" width="1024" height="1024"/><span className="dish-number">0{index + 1} / SIGNATURE</span></Button> : <Button variant="editorial" className={`signature-image-button dish-art dish-art-${dish.id}`} onClick={() => setSelected(dish)} aria-label={`View ${dish.name}`}><span className="dish-number">0{index + 1} / SIGNATURE</span><span className="dish-art-word serif">{dish.name}</span><span className="dish-art-detail">{dish.ingredients.slice(0,3).join(' · ')}</span></Button>}
   <div className="dish-info"><h3>{dish.name}</h3><span className="dish-price">{formatPrice(dish.price)}</span></div><p>{dish.description}</p>
  </article>)}</div>
 </section>
 <section id="menu" className="menu-section section-wrap" aria-labelledby="menu-heading"><div className="section-heading"><div><p className="eyebrow">Seasonal. Considered. Unforgettable.</p><h2 className="section-title" id="menu-heading">The <em>menu.</em></h2></div><p className="eyebrow">Autumn / 2026</p></div>
  <div className="menu-layout"><div className="menu-categories" role="tablist" aria-label="Menu categories">{categories.map((cat,index) => <Button role="tab" aria-selected={category===cat} variant="editorial" className={`category-button ${category===cat ? 'active' : ''}`} key={cat} onClick={() => { setCategory(cat); setSearch(''); }}><span>0{index+1}</span>{cat}</Button>)}</div>
   <div><div className="menu-toolbar"><label className="search-field"><Search/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your next favourite…" aria-label="Search menu"/></label><select aria-label="Dietary preference" value={diet} onChange={e => setDiet(e.target.value)}>{['All preferences','Vegetarian','Vegan','Spicy',"Chef’s Special",'Gluten Free'].map(value => <option key={value}>{value}</option>)}</select></div>
    {visible.map(dish => <Button key={dish.id} variant="editorial" className="menu-row" onClick={() => setSelected(dish)}><div><h3>{dish.name}</h3><p>{dish.description}</p><div className="dietary">{dish.tags.join(' · ')}</div></div><span className="menu-row-end"><span className="dish-price">{formatPrice(dish.price)}</span><ArrowUpRight/></span></Button>)}
    {!visible.length && <p className="empty-menu">No dishes match your selection. Try another preference.</p>}
   </div></div>
 </section>
 <Dialog open={Boolean(selected)} onOpenChange={open => !open && setSelected(null)}><DialogContent className="dining-dialog"><DialogTitle className="sr-only">{selected?.name ?? 'Dish details'}</DialogTitle><DialogDescription className="sr-only">Ingredients, dietary information, and the chef’s note.</DialogDescription>{selected && <div className="dish-modal-layout">{selected.image ? <img src={selected.image} alt={selected.name} width="1024" height="1024"/> : <div className={`dish-art dish-art-${selected.id}`}><span className="dish-art-word serif">{selected.name}</span></div>}<div><p className="eyebrow">{selected.category} / {formatPrice(selected.price)}</p><h2 className="mt-4">{selected.name}</h2><p className="body-copy">{selected.description}</p><div className="detail-meta"><strong>Ingredients</strong><p>{selected.ingredients.join(', ')}</p><strong>Allergens</strong><p>{selected.allergens.join(', ') || 'None declared'}</p><p className="dietary">{selected.tags.join(' · ')}</p></div><p className="body-copy"><em>“{selected.chefNote}”</em></p><Button variant="dining" onClick={() => {setSelected(null); onReserve();}}>Reserve this experience <ArrowUpRight/></Button></div></div>}</DialogContent></Dialog>
 </>;
}