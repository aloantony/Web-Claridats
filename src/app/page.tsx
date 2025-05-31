'use client';
import { useState } from 'react';
import { UploadCloud, Clock, SearchCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import EvidenceBadge from '../components/EvidenceBadge';

const PLANES = [
  {
    name: 'Free',
    price: '0€',
    limits: '1 consulta/mes',
    cta: 'Empieza gratis',
  },
  {
    name: 'Essential',
    price: '9€/mes',
    limits: '10 consultas/mes',
    cta: 'Empieza gratis',
  },
  {
    name: 'Pro',
    price: '29€/mes',
    limits: 'Ilimitado',
    cta: 'Empieza gratis',
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [badge, setBadge] = useState<{score:number, answer:string}|null>(null);
  const [loading, setLoading] = useState(false);
  const [showResearcher, setShowResearcher] = useState(false);
  const [step, setStep] = useState<'id'|'upload'|null>(null);
  const [researcher, setResearcher] = useState({ name: '', email: '' });
  const [article, setArticle] = useState({ title: '', file: null as File|null });

  const handleDemo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/demo');
      const data = await res.json();
      setBadge(data);
    } catch (e) {
      setBadge({ score: Math.floor(Math.random() * 24) + 72, answer: 'Los huevos no suben el colesterol' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0E132A] min-h-screen text-white flex flex-col">
      {/* HERO */}
      <section id="hero" className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden px-4" style={{background: 'radial-gradient(ellipse at 50% 30%, #1e2746 60%, transparent 100%)'}}>
        <motion.h1 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.7}} viewport={{once:true}} className="text-4xl md:text-6xl font-bold text-center mb-4">Ciencia de la salud, sin muros.</motion.h1>
        <motion.p initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.7, delay:0.2}} viewport={{once:true}} className="text-xl md:text-2xl text-center mb-8">Pregunta. Contrasta. Confía.</motion.p>
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
          <div className="flex w-full bg-white/10 rounded-lg overflow-hidden border border-white/20">
            <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 px-4 py-3 bg-transparent text-white placeholder:text-white/60 outline-none" placeholder="¿Qué quieres saber?" />
            <button onClick={handleDemo} className="bg-primary text-white px-6 py-3 font-semibold hover:bg-primary/80 transition disabled:opacity-50" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
          </div>
          {badge && (
            <div className="mt-4">
              <EvidenceBadge score={badge.score} />
            </div>
          )}
          {/* INVESTIGADORES EN HERO */}
          <div className="mt-8 w-full flex flex-col items-center">
            <span className="text-sm text-white/80 mb-2">¿Eres investigador? ¿Quieres publicar tu artículo?</span>
            {!showResearcher && (
              <button className="btn btn-xs btn-outline btn-primary" onClick={()=>{setShowResearcher(true);setStep('id')}}>Soy investigador</button>
            )}
            {showResearcher && step==='id' && (
              <div className="relative w-full max-w-xs mx-auto mt-3">
                <button className="btn btn-xs btn-ghost absolute right-2 top-2 z-10" onClick={()=>{setShowResearcher(false);setStep(null);}} aria-label="Cerrar">✕</button>
                <form className="flex flex-col gap-2 bg-white/10 p-4 rounded-lg" onSubmit={e=>{e.preventDefault();setStep('upload')}}>
                  <input type="text" required placeholder="Nombre completo" className="input input-bordered input-sm" value={researcher.name} onChange={e=>setResearcher(r=>({...r, name:e.target.value}))} />
                  <input type="email" required placeholder="E-mail institucional" className="input input-bordered input-sm" value={researcher.email} onChange={e=>setResearcher(r=>({...r, email:e.target.value}))} />
                  <button type="submit" className="btn btn-primary btn-sm">Continuar</button>
                </form>
              </div>
            )}
            {showResearcher && step==='upload' && (
              <div className="relative w-full max-w-xs mx-auto mt-3">
                <button className="btn btn-xs btn-ghost absolute right-2 top-2 z-10" onClick={()=>{setShowResearcher(false);setStep(null);}} aria-label="Cerrar">✕</button>
                <form className="flex flex-col gap-2 bg-white/10 p-4 rounded-lg" onSubmit={e=>{e.preventDefault();alert('Artículo enviado (mock)')}}>
                  <input type="text" required placeholder="Título del artículo" className="input input-bordered input-sm" value={article.title} onChange={e=>setArticle(a=>({...a, title:e.target.value}))} />
                  <input type="file" required className="file-input file-input-bordered file-input-sm" onChange={e=>setArticle(a=>({...a, file:e.target.files?.[0]||null}))} />
                  <button type="submit" className="btn btn-success btn-sm">Subir artículo</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-20 bg-base-100 text-base-content">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Elige tu plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANES.map((plan) => (
              <div key={plan.name} className="card bg-base-200 shadow-xl">
                <div className="card-body items-center text-center">
                  <h3 className="card-title text-2xl mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-2">{plan.price}</p>
                  <p className="mb-4">{plan.limits}</p>
                  <a href="#lead" className="btn btn-primary">{plan.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white text-base-content">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <UploadCloud size={40} className="text-primary" />
              <h3 className="font-bold text-lg">Publica gratis</h3>
              <p>Sube tu pregunta o artículo sin coste.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Clock size={40} className="text-primary" />
              <h3 className="font-bold text-lg">Revisión IA &lt; 48h</h3>
              <p>Recibe revisión automática en menos de 2 días.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <SearchCheck size={40} className="text-primary" />
              <h3 className="font-bold text-lg">Respuesta con evidencia</h3>
              <p>Obtén una respuesta clara y un badge IEC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTIGADORES */}
      <section className="flex justify-center py-8 bg-base-100">
        <div className="card bg-base-200 shadow-md max-w-xl w-full">
          <div className="card-body items-center text-center">
            <h3 className="text-xl font-semibold mb-2">¿Eres investigador? ¿Quieres publicar tu artículo?</h3>
            {!showResearcher && (
              <button className="btn btn-outline btn-primary" onClick={()=>{setShowResearcher(true);setStep('id')}}>Soy investigador</button>
            )}
            {showResearcher && step==='id' && (
              <div className="relative w-full max-w-xs mx-auto mt-4">
                <button className="btn btn-xs btn-ghost absolute right-2 top-2 z-10" onClick={()=>{setShowResearcher(false);setStep(null);}} aria-label="Cerrar">✕</button>
                <form className="flex flex-col gap-3 w-full max-w-sm" onSubmit={e=>{e.preventDefault();setStep('upload')}}>
                  <input type="text" required placeholder="Nombre completo" className="input input-bordered" value={researcher.name} onChange={e=>setResearcher(r=>({...r, name:e.target.value}))} />
                  <input type="email" required placeholder="E-mail institucional" className="input input-bordered" value={researcher.email} onChange={e=>setResearcher(r=>({...r, email:e.target.value}))} />
                  <button type="submit" className="btn btn-primary">Continuar</button>
                </form>
              </div>
            )}
            {showResearcher && step==='upload' && (
              <div className="relative w-full max-w-xs mx-auto mt-4">
                <button className="btn btn-xs btn-ghost absolute right-2 top-2 z-10" onClick={()=>{setShowResearcher(false);setStep(null);}} aria-label="Cerrar">✕</button>
                <form className="flex flex-col gap-3 w-full max-w-sm" onSubmit={e=>{e.preventDefault();alert('Artículo enviado (mock)')}}>
                  <input type="text" required placeholder="Título del artículo" className="input input-bordered" value={article.title} onChange={e=>setArticle(a=>({...a, title:e.target.value}))} />
                  <input type="file" required className="file-input file-input-bordered" onChange={e=>setArticle(a=>({...a, file:e.target.files?.[0]||null}))} />
                  <button type="submit" className="btn btn-success">Subir artículo</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FORMULARIO LEAD */}
      <section id="lead" className="py-20 bg-base-200 text-base-content">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Únete a la lista</h2>
          <form action="https://assets.mailerlite.com/jsonp/12345/subscribe" method="POST" className="flex flex-col gap-4">
            <input type="email" name="email" required placeholder="Tu e-mail" className="input input-bordered w-full" />
            <button type="submit" className="btn btn-primary">Únete a la lista</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#0E132A] text-white flex flex-col items-center gap-2">
        <div className="flex gap-4 mb-2">
          <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" className="hover:text-primary"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg></a>
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-primary"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-primary"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" /><line x1="16" y1="8" x2="16" y2="16" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="8" y1="8" x2="8" y2="16" /></svg></a>
        </div>
        <span className="text-sm">©2025 Claridats.</span>
      </footer>
    </div>
  );
}
