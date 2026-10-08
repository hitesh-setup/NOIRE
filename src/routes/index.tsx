import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { Navigation } from '@/components/noire/Navigation';
import { Hero, Experience } from '@/components/noire/Experience';
import { Story, Chef, Explorer, Closing } from '@/components/noire/Editorial';
import { DiningMenu } from '@/components/noire/Menu';
import { Gallery, Reviews } from '@/components/noire/Gallery';
import { Reservation } from '@/components/noire/Reservation';
import { Concierge } from '@/components/noire/Concierge';
import { useExperience } from '@/hooks/use-experience';

const description = 'NOIRÉ — an immersive fine-dining experience where culinary craft becomes an unforgettable experience.';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
   { title: 'NOIRÉ — The Art of Dining' },
   { name: 'description', content: description },
   { property: 'og:title', content: 'NOIRÉ — The Art of Dining' },
   { property: 'og:description', content: 'An experience beyond the plate.' },
   { property: 'og:image', content: '/og-image.jpg' },
   { property: 'og:type', content: 'website' },
   { name: 'twitter:card', content: 'summary_large_image' },
   { name: 'twitter:title', content: 'NOIRÉ — The Art of Dining' },
   { name: 'twitter:description', content: 'An experience beyond the plate.' },
   { name: 'twitter:image', content: '/og-image.jpg' },
  ] }),
  component: Index,
});
function Index() {
 const [reserve,setReserve]=useState(false);
 const {progress,reduced}=useExperience();
 const onReserve=()=>setReserve(true);
 return <><div className="preloader" aria-hidden="true"><span className="wordmark">NOIRÉ</span><p>PREPARING YOUR EXPERIENCE</p><div className="preloader-line"/></div><div className="scroll-progress" style={{transform:`scaleX(${progress})`}}/><Navigation scrolled={progress>.01} onReserve={onReserve}/><main><Hero reduced={reduced} onReserve={onReserve}/><Story/><Experience reduced={reduced}/><DiningMenu onReserve={onReserve}/><Chef/><Explorer onReserve={onReserve}/><Gallery/><Reviews/><Closing onReserve={onReserve}/></main><Reservation open={reserve} onClose={()=>setReserve(false)}/><Concierge onReserve={onReserve}/></>;
}
