import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { images } from '@/data/restaurant';
import appleAsset from '@/assets/ingredient-apple.glb.asset.json';

const palette = { stone: 'oklch(0.20 0.007 75)', champagne: 'oklch(0.79 0.066 78)', ivory: 'oklch(0.93 0.023 85)', herb: 'oklch(0.40 0.07 135)' };
function color(value: string) {
 // Read semantic colors through the browser's color conversion for Three.js.
 const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
 if(!ctx) return new THREE.Color('gray');
 ctx.fillStyle = value; ctx.fillRect(0,0,1,1); const p=ctx.getImageData(0,0,1,1).data;
 return new THREE.Color().setRGB((p[0]??0)/255,(p[1]??0)/255,(p[2]??0)/255,THREE.SRGBColorSpace);
}

function CinematicImage({ reduced }: { reduced: boolean }) {
 const map = useTexture(images.diningWorld);
 const { viewport } = useThree();
 const plane = useRef<THREE.Mesh>(null);
 const start = useRef<number | null>(null);
 const target = useMemo(()=>new THREE.Vector3(),[]);
 const ratio = 1920 / 1088;
 const height = Math.max(viewport.height * 1.14, viewport.width / ratio * 1.14);
 useFrame(({camera,pointer,clock},rawDt)=>{
  if(reduced) return;
  const dt = Math.min(rawDt,.05);
  if(start.current===null) start.current=clock.elapsedTime;
  const reveal=Math.min((clock.elapsedTime-start.current)/5,1);
  const scroll=Math.min(window.scrollY/Math.max(window.innerHeight,1),1);
  target.set(pointer.x*.11, pointer.y*.065,5.2-reveal*.2-scroll*.15);
  camera.position.lerp(target,1-Math.exp(-2*dt));camera.lookAt(0,0,0);
  if(plane.current) plane.current.rotation.y=pointer.x*.003;
 });
 return <mesh ref={plane}><planeGeometry args={[height*ratio,height]}/><meshBasicMaterial map={map} toneMapped={false}/></mesh>;
}
export function HeroWorld({ reduced }: { reduced: boolean }) {
 return <Canvas dpr={1} camera={{position:[0,0,5],fov:45}} gl={{antialias:true,alpha:true}} frameloop={reduced?'demand':'always'}><Suspense fallback={null}><CinematicImage reduced={reduced}/></Suspense></Canvas>;
}

function Dish({ onIngredient }: { onIngredient: (name:string)=>void }) {
 const texture = useTexture(images.truffle);
 const group = useRef<THREE.Group>(null);
 const colors = useMemo(()=>({stone:color(palette.stone),ivory:color(palette.ivory),champagne:color(palette.champagne)}),[]);
 const sides = useMemo(()=>new THREE.LatheGeometry([new THREE.Vector2(0,.02),new THREE.Vector2(1.45,.02),new THREE.Vector2(1.63,.13),new THREE.Vector2(1.72,.24),new THREE.Vector2(1.75,.27)],96),[]);
 const disc = useMemo(()=> {
  const geometry = new THREE.CircleGeometry(1.72,96);
  const uv=geometry.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*.93+.035,uv.getY(i)*.93+.035);
  return geometry;
 },[]);
 useEffect(()=>()=>{sides.dispose();disc.dispose();},[sides,disc]);
 return <group ref={group} position={[0,.1,0]}>
  <mesh geometry={sides} castShadow receiveShadow><meshStandardMaterial color={colors.stone} roughness={.58} metalness={.12}/></mesh>
  <mesh geometry={disc} rotation-x={-Math.PI/2} position-y={.275} castShadow><meshStandardMaterial map={texture} roughness={.75}/></mesh>
  <Html position={[-.45,.40,.25]} center><Button variant="editorial" className="hotspot" aria-label="Explore black truffle" onClick={()=>onIngredient('Black truffle')}>+</Button></Html>
  <Html position={[.25,.42,-.5]} center><Button variant="editorial" className="hotspot" aria-label="Explore basil" onClick={()=>onIngredient('Fresh basil')}>+</Button></Html>
  <Html position={[.55,.41,.6]} center><Button variant="editorial" className="hotspot" aria-label="Explore parmesan" onClick={()=>onIngredient('Aged Parmesan')}>+</Button></Html>
 </group>;
}
function Ingredient() {
 const { scene } = useGLTF(appleAsset.url);
 const object = useMemo(()=>{
  const clone=scene.clone(true); const box=new THREE.Box3().setFromObject(clone);const size=box.getSize(new THREE.Vector3());const centre=box.getCenter(new THREE.Vector3());
  const root=new THREE.Group();clone.position.sub(centre);root.add(clone);root.scale.setScalar(1.7/Math.max(size.x,size.y,size.z));return root;
 },[scene]);
 return <primitive object={object} position={[0,.8,0]}/>;
}
function DiningLights() {
 const warm=useMemo(()=>color(palette.champagne),[]);
 return <><ambientLight intensity={.6}/><directionalLight position={[3,7,4]} intensity={2.5} color={warm} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/><directionalLight position={[-3,2,-4]} intensity={1.2}/><Environment resolution={128}><Lightformer intensity={2} position={[0,5,0]} scale={[10,10,1]} rotation-x={Math.PI/2}/><Lightformer intensity={1.5} color={warm} position={[-4,2,0]} scale={[3,5,1]} rotation-y={Math.PI/2}/></Environment></>;
}
function TableSurface() {
 const texture=useMemo(()=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256; const ctx=canvas.getContext('2d');
  if(ctx) {ctx.fillStyle=palette.stone;ctx.fillRect(0,0,256,256);for(let i=0;i<35;i++){ctx.strokeStyle=palette.ivory;ctx.globalAlpha=.02+(i%5)*.005;ctx.lineWidth=.3;ctx.beginPath();for(let j=0;j<256;j+=8){const y=i*9+Math.sin(j/50+i)*15; if(j===0)ctx.moveTo(j,y);else ctx.lineTo(j,y);}ctx.stroke();}}
  const tex=new THREE.CanvasTexture(canvas);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(4,4);return tex;
 },[]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 return <mesh rotation-x={-Math.PI/2} position-y={-.05} receiveShadow><planeGeometry args={[35,35]}/><meshStandardMaterial map={texture} roughness={.65} metalness={.12}/></mesh>;
}
export default function RestaurantWorld({ mode, reduced,onIngredient }: { mode:'dish'|'ingredient'; reduced:boolean; onIngredient:(name:string)=>void }) {
 const [active,setActive]=useState(true);
 const container=useRef<HTMLDivElement>(null);
 useEffect(()=>{ const node=container.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setActive(entry?.isIntersecting??false),{rootMargin:'100px'});observer.observe(node);return()=>observer.disconnect(); },[]);
 return <div ref={container} className="absolute inset-0"><Canvas shadows dpr={1} camera={{position:[0,4.8,6.6],fov:38}} frameloop={active&&!reduced?'always':'demand'} gl={{antialias:true}}><Suspense fallback={null}><DiningLights/><TableSurface/>{mode==='dish'?<Dish onIngredient={onIngredient}/>:<Ingredient/>}<OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.3} maxPolarAngle={1.1} minDistance={5} maxDistance={9} autoRotate={!reduced} autoRotateSpeed={.22} target={[0,.3,0]}/></Suspense></Canvas></div>;
}