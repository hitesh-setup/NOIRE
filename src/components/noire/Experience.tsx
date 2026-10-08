import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/data/restaurant';
const World=lazy(()=>import('./RestaurantWorld'));
const HeroWorld=lazy(()=>import('./RestaurantWorld').then(module=>({default:module.HeroWorld})));
class SceneBoundary extends Component<{children:ReactNode}, {failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?null:this.props.children;}
}
function useWebGL() {
 const [available,setAvailable]=useState(false);
 useEffect(()=>{try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');setAvailable(Boolean(gl));gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch{setAvailable(false);}},[]);
 return available;
}
export function Hero({ reduced,onReserve }: { reduced:boolean;onReserve:()=>void }) {
 const webgl=useWebGL();
 return <section className="hero" aria-labelledby="hero-heading">
 <img className="hero-image" src={images.diningWorld} alt="A candlelit table at NOIRÉ, with black truffle risotto and a crystal wine glass" width="1920" height="1088" fetchPriority="high"/>
 {webgl&&<div className="hero-canvas" aria-hidden="true"><SceneBoundary><Suspense fallback={null}><HeroWorld reduced={reduced}/></Suspense></SceneBoundary></div>}
 <div className="hero-shade"/>
 <div className="hero-content section-wrap"><div className="hero-eyebrow"><span className="hairline"/><p className="eyebrow">An experience beyond the plate</p></div><h1 className="serif" id="hero-heading">THE ART<br/>OF <em>DINING.</em></h1><p className="hero-subtitle">Where culinary craft becomes<br/>an unforgettable experience.</p><div className="hero-actions"><Button variant="dining" onClick={onReserve}>Reserve your table <ArrowUpRight/></Button><Button variant="diningOutline" asChild><a href="#menu">Explore the menu <ArrowUpRight/></a></Button></div></div>
 <div className="chapter-rail" aria-hidden="true">{[1,2,3,4,5].map(n=><span key={n} className="chapter-dot"/>)}</div>
 <div className="hero-bottom"><a href="#about"><span className="hairline"/>SCROLL TO DISCOVER ↓</a><div className="hero-caption"><span>THE SIGNATURE</span><strong>NOIRÉ Truffle</strong>Black truffle · Aged Parmesan · Carnaroli</div></div>
 </section>;
}
const notes: Record<string,string>={ 'Black truffle':'Earthy, aromatic, and fleeting. Freshly shaved seasonal truffle is the soul of our signature dish.', 'Fresh basil':'Hand-picked leaves bring a bright, fragrant finish to the richness of the plate.', 'Aged Parmesan':'Thirty-six months of patience. A deeply savoury finish with delicate crystalline texture.' };
export function Experience({reduced}:{reduced:boolean}) {
 const webgl=useWebGL();const [mode,setMode]=useState<'dish'|'ingredient'>('dish');const [ingredient,setIngredient]=useState<string|null>(null);
 return <section id="experience" className="experience" aria-labelledby="experience-heading">
 <img className="hero-image" src={mode==='dish'?images.truffle:images.interior} alt={mode==='dish'?'NOIRÉ signature truffle risotto':'The NOIRÉ restaurant interior'} width="1024" height="1024" loading="lazy"/>
 {webgl&&<SceneBoundary><Suspense fallback={null}><World mode={mode} reduced={reduced} onIngredient={setIngredient}/></Suspense></SceneBoundary>}
 <div className="experience-head"><p className="eyebrow">The details make the difference / 01</p><h2 className="section-title" id="experience-heading">From ingredient<br/>to <em>masterpiece.</em></h2></div>
 <div className="experience-label"><p className="eyebrow">{mode==='dish'?'The signature / NOIRÉ Truffle':'From nature / Seasonal ingredients'}</p><p>{mode==='dish'?'Black truffle · Fresh basil · Aged Parmesan':'Simple beginnings. Extraordinary possibilities.'}</p></div>
 <div className="experience-controls"><Button variant="diningOutline" className={mode==='dish'?'active':''} onClick={()=>{setMode('dish');setIngredient(null);}}>The plate</Button><Button variant="diningOutline" className={mode==='ingredient'?'active':''} onClick={()=>{setMode('ingredient');setIngredient(null);}}>The ingredient</Button></div>
 {ingredient&&<aside className="ingredient-note"><Button variant="editorial" size="icon" className="float-right" aria-label="Close ingredient details" onClick={()=>setIngredient(null)}><X/></Button><h3>{ingredient}</h3><p className="body-copy">{notes[ingredient]}</p></aside>}
 </section>;
}