import React, { useEffect, useMemo, useState } from "react";
const COMPANY = {
  tradeName: "JR Montagens Industriais",
  tagline: "Soluções completas em manutenção, fabricação e montagem industrial — tubulações, estruturas e combate a incêndio.",
  ctaPrimary: { label: "Pedir orçamento", href: "mailto:comercial@jrmindustriais.com.br?subject=Solicitação%20de%20Orçamento%20-%20JR%20Montagens%20Industriais" },
  ctaSecondary: { label: "Portfólio", href: "#projetos" },
  about: "Há anos apoiamos clientes dos setores alimentício, sucroalcooleiro, siderúrgico, mineração, hidrelétrico e petroquímico. Nossa equipe executa fabricação e montagem de tubulações em aço carbono e inox (SCH/galvanizado/roscado/ranhurado), spools e manifolds; estruturas metálicas, skids e tanques; e sistemas de prevenção e combate a incêndio (hidrantes, sprinklers, suportação, pintura e testes). Trabalhamos com soldagem qualificada, controle de torque, testes de estanqueidade, tratamento de superfície e documentação técnica completa (RDO, medições, ART, “as built”). Do planejamento ao comissionamento e start-up, entregamos obras seguras, dentro do prazo e prontas para produzir.",
  sectors: ["Alimentício","Sucroalcooleiro","Siderúrgica","Mineração","Hidrelétrica","Petroquímico"],
  services: [
    { title: "Montagens Industriais", desc: "Skids, manifolds, racks e linhas de processo.", bullets: ["Gestão de obra, RDO e medições","Soldagem qualificada (NR-18 / NR-35)","Comissionamento e start-up"], icon: "Factory" },
    { title: "Tubulações e Spools", desc: "Aço carbono e inox (SCH, galvanizado, roscado/ranhurado).", bullets: ["Isométricos e listas de materiais","Torqueamento controlado","Testes de estanqueidade"], icon: "Pipelines" },
    { title: "Prevenção e Combate a Incêndio", desc: "Hidrantes, sprinklers, bombas e testes funcionais.", bullets: ["Projetos conforme normas brasileiras","Suportações e pintura","Entrega + ART"], icon: "Shield" },
    { title: "Estruturas e Tanques", desc: "Estruturas metálicas, tanques e reservatórios.", bullets: ["Macaco hidráulico","Andaimes","PTA","Tratamento de superfície","Documentação técnica"], icon: "Cubes" }
  ],
  projects: [
    { title: "Fabricação e montagem de tanques de combustível", client: "CBL", city: "Paranaguá/PR", cover: "/assets/projetos/tanque-cbl-paranagua.jpg" },
    { title: "Fabricação e montagem de ginásio de esportes", client: "Prefeitura (obra civil)", city: "Paranaguá/PR", cover: "/assets/projetos/ginasio-paranagua.jpg" },
    { title: "Montagem na usina (linha de processo)", client: "Ituiutaba", city: "Ituiutaba/MG", cover: "/assets/projetos/usina-ituiutaba.jpg" },
    { title: "Montagem de hidrantes e tubulações", client: "Obra Navegantes", city: "Navegantes/SC", cover: "/assets/projetos/hidrantes-navegantes.jpg" },
    { title: "Tubulações de prevenção de incêndio", client: "KOCH", city: "Tijucas/SC", cover: "/assets/projetos/prevencao-incendio-koch.jpg" },
    { title: "Tubulações de prevenção de incêndio", client: "Suzano", city: "Aracruz/ES", cover: "/assets/projetos/prevencao-incendio-suzano.jpg" },
    { title: "Montagem da caldeira HPB", client: "Fábrica de Papel Clingeli", city: "Nova Campina/SP", cover: "/assets/projetos/caldeira-hpb-clingeli.jpg" }
  ],
  clients: [
    { name: "CBL", logo: "/assets/clientes/cbl.png" },
    { name: "KOCH", logo: "/assets/clientes/koch.png" },
    { name: "Suzano", logo: "/assets/clientes/suzano.png" },
    { name: "Clingeli", logo: "/assets/clientes/clingeli.png" },
    { name: "Ituiutaba (Usina)", logo: "/assets/clientes/ituiutaba.png" }
  ],
  contact: {
    addressLine1: "Rua Delhi, 1152 – Parque Agari",
    addressLine2: "Paranaguá/PR — CEP 83.215-230",
    phones: ["(41) 99167-8331","(41) 99961-7572","(41) 99722-3233"],
    email: "comercial@jrmindustriais.com.br",
    directors: [
      { name: "José Aparecido — Diretor/ADM", phone: "(41) 99167-8331 / (41) 99961-7572" },
      { name: "Tiago Rodrigues — Diretor/Técnico", phone: "(16) 98196-7275 / (16) 99234-6728" }
    ]
  }
};
const Icon = ({ name, className = "w-6 h-6" }) => {
  const paths = {
    Factory: (<path d="M3 20h18v-2H3v2Zm0-4h5v-5l5 3V9l5 3V4h-2v4.5L13 6v4.5L8 7v9H3v0Z" />),
    Pipelines: (<path d="M3 10h5V6h8v4h5v4h-5v4H8v-4H3v-4Zm7-2v8h4v-8h-4Z" />),
    Shield: (<path d="M12 2 5 5v6c0 4.97 3.05 9.15 7 10 3.95-.85 7-5.03 7-10V5l-7-3Z" />),
    Cubes: (<path d="M4 8l8-4 8 4-8 4-8-4Zm0 8l8-4 8 4-8 4-8-4Zm0-8v8l8 4V12L4 8Zm16 0l-8 4v8l8-4V8Z" />),
    Phone: (<path d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.36 2.3.55 3.6.55a1 1 0 011 1V20a1 1 0 01-1 1C11.5 21 3 12.5 3 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.19 2.5.55 3.6a1 1 0 01-.25 1L6.6 10.8Z" />),
    Mail: (<path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2Zm0 2v.01L12 13l8-5V8l-8 5-8-5Z" />),
    MapPin: (<path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7Zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5Z" />),
    Menu: (<path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />)
  };
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>{paths[name]}</svg>;
};
const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="py-16 md:py-24"><div className="max-w-6xl mx-auto px-6">{kicker && (<p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{kicker}</p>)}<h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>{children}</div></section>
);
const Badge = ({ children }) => (<span className="inline-flex items-center rounded-full border px-4 py-2 text-sm md:text-base font-medium mr-2 mb-2">{children}</span>);

const Selo = ({ text }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold bg-white shadow-sm">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600" aria-hidden>
      <path d="M12 2 3 7v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V7l-9-5Zm-1 13.59L8.41 13 7 14.41l4 4 6-6L15.59 11 11 15.59Z"/>
    </svg>
    {text}
  </span>
);
const Card = ({ children, className = "" }) => (<div className={`rounded-2xl border shadow-sm hover:shadow-md transition ${className}`}>{children}</div>);
const Button = ({ href, children, variant = "primary", ...props }) => (<a href={href} className={variant==="primary"?"inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border bg-black text-white hover:opacity-90":"inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border hover:bg-gray-50"} {...props}>{children}</a>);
const NavLink = ({ href, children }) => (<a href={href} className="px-3 py-2 text-sm font-medium hover:text-black/80">{children}</a>);

export default function SiteJR() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % COMPANY.projects.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + COMPANY.projects.length) % COMPANY.projects.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);
  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i - 1 + COMPANY.projects.length) % COMPANY.projects.length);
  const next = () => setLightboxIndex((i) => (i + 1) % COMPANY.projects.length);
  const current = lightboxIndex !== null ? COMPANY.projects[lightboxIndex] : null;

  return (<div className="min-h-screen text-gray-800">
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="JR Montagens Industriais" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="font-bold">{COMPANY.tradeName}</div>
            <div className="text-xs text-gray-500">Desde Paranaguá/PR para todo o Brasil</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLink href="#servicos">Serviços</NavLink><NavLink href="#setores">Setores</NavLink><NavLink href="#projetos">Projetos</NavLink><NavLink href="#clientes">Clientes</NavLink><NavLink href="#contato">Contato</NavLink>
          <div className="ml-4"><Button href={COMPANY.ctaPrimary.href}>Solicitar orçamento</Button></div>
        </nav>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Icon name="Menu" /></button>
      </div>
      {menuOpen && (<div className="md:hidden border-t bg-white"><div className="px-6 py-3 flex flex-col">
        <a href="#servicos" className="py-2" onClick={() => setMenuOpen(false)}>Serviços</a>
        <a href="#setores" className="py-2" onClick={() => setMenuOpen(false)}>Setores</a>
        <a href="#projetos" className="py-2" onClick={() => setMenuOpen(false)}>Projetos</a>
        <a href="#clientes" className="py-2" onClick={() => setMenuOpen(false)}>Clientes</a>
        <a href="#contato" className="py-2" onClick={() => setMenuOpen(false)}>Contato</a>
      </div></div>)}
    </header>

    <section className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{COMPANY.tagline}</h1>
            <p className="mt-4 text-lg text-gray-600">{COMPANY.about}</p>
            <div className="mt-6 flex gap-3">
              <Button href={COMPANY.ctaPrimary.href} variant="primary">{COMPANY.ctaPrimary.label}</Button>
              <Button href={COMPANY.ctaSecondary.href} variant="secondary">{COMPANY.ctaSecondary.label}</Button>
            </div>
          </div>
          <div className="md:pl-10">
            <div className="aspect-[4/3] rounded-2xl border bg-white shadow-sm overflow-hidden flex items-center justify-center">
              <img src="/assets/hero/hero-fabricacao-montagem.jpg" alt="JR Montagens — fabricação e montagem" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Substitua pela sua melhor foto de obra / equipe.</p>
          </div>
        </div>
      </div>
    </section>

    <Section id="servicos" title="Serviços" kicker="O que fazemos">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMPANY.services.map((s)=>(<Card key={s.title} className="p-6">
          <div className="flex items-center gap-3 mb-3"><Icon name={s.icon} className="w-6 h-6" /><h3 className="font-semibold">{s.title}</h3></div>
          <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
          <ul className="text-sm list-disc pl-5 space-y-1">{s.bullets.map((b)=>(<li key={b}>{b}</li>))}</ul>
        </Card>))}
      </div>
    </Section>

    <Section id="setores" title="Setores atendidos" kicker="Experiência multi-indústria">
      <div className="flex flex-wrap">{COMPANY.sectors.map((s)=>(<Badge key={s}>{s}</Badge>))}</div>
    </Section>

    <Section id="projetos" title="Projetos em destaque" kicker="Portfólio real">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPANY.projects.map((p, idx)=>(<Card key={p.title} className="overflow-hidden">
          <div className="aspect-video bg-gray-100 cursor-pointer" onClick={()=>setLightboxIndex(idx)}>
            <img src={p.cover} alt={`${p.title} — ${p.city}`} className="w-full h-full object-cover" />
          </div>
          <div className="p-4"><h3 className="font-semibold leading-snug">{p.title}</h3><p className="text-sm text-gray-600">{p.client} • {p.city}</p></div>
        </Card>))}
      </div>
      <p className="text-sm text-gray-500 mt-4">Dica: renomeie seus arquivos em <code>/public/assets/projetos/</code> com os nomes acima e substitua as imagens reais.</p>
    </Section>

    <Section id="clientes" title="Clientes" kicker="Confiança construída em campo">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {COMPANY.clients.map((c)=>(
          <Card key={c.name} className="p-6 h-28 md:h-32 flex items-center justify-center text-center">
            <div className="w-full h-full flex items-center justify-center">
              <img src={c.logo} alt={c.name} className="max-h-full w-auto object-contain" onError={(e)=>{e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block';}} />
              <span className="hidden text-sm font-semibold">{c.name}</span>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">Dica: use PNG/SVG com fundo transparente. Ajuste a altura do cartão (ex.: <code>h-32</code>) se quiser logos ainda maiores.</p>
    </Section>

    <Section id="contato" title="Contato" kicker="Fale com a JR">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-3"><Icon name="MapPin" /><div><h3 className="font-semibold">Endereço</h3><p className="text-sm text-gray-600">{COMPANY.contact.addressLine1}</p><p className="text-sm text-gray-600">{COMPANY.contact.addressLine2}</p></div></div>
          <div className="flex items-start gap-3 mb-3"><Icon name="Phone" /><div><h3 className="font-semibold">Telefones</h3><ul className="text-sm text-gray-600">{COMPANY.contact.phones.map((p)=>(<li key={p}>{p}</li>))}</ul></div></div>
          <div className="flex items-start gap-3"><Icon name="Mail" /><div><h3 className="font-semibold">E-mail</h3><a className="text-sm text-blue-600 underline" href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a></div></div>
          <div className="mt-6"><h4 className="font-semibold mb-2">Diretoria</h4><ul className="text-sm text-gray-600">{COMPANY.contact.directors.map((d)=>(<li key={d.name} className="mb-1">{d.name} — {d.phone}</li>))}</ul></div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Envie sua mensagem</h3><p className="text-sm text-gray-600 mb-4">O formulário abaixo abre seu e-mail com o assunto preenchido.</p>
          <form action={COMPANY.ctaPrimary.href} method="get" className="space-y-3">
            <div><label className="text-sm">Assunto</label><input name="subject" className="mt-1 w-full rounded-xl border px-3 py-2" defaultValue="Contato via site — JR Montagens" /></div>
            <div><label className="text-sm">Mensagem</label><textarea name="body" rows={5} className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="Descreva sua necessidade (escopo, prazos, local, etc.)" /></div>
            <div className="flex gap-3"><Button href={COMPANY.ctaPrimary.href} variant="primary">Abrir e-mail</Button><Button href="/assets/docs/apresentacao-jr.pdf" target="_blank" download>Baixar apresentação</Button></div>
          </form>
        </Card>
      </div>
    </Section>

    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="JR Montagens Industriais" className="h-9 w-auto object-contain" />
          <div><div className="font-semibold">{COMPANY.tradeName}</div><div className="text-xs text-gray-500">{COMPANY.contact.addressLine1} • {COMPANY.contact.addressLine2}</div></div>
        </div>
        <div className="text-sm text-gray-500">© {year} {COMPANY.tradeName}. Todos os direitos reservados.</div>
      </div>
    </footer>

    {current && (<div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4" onClick={closeLightbox}>
      <div className="max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between text-white mb-2"><div className="text-lg font-semibold">{current.title}</div><button className="rounded-lg px-3 py-1 bg-white/10 hover:bg-white/20" onClick={closeLightbox}>Fechar (Esc)</button></div>
        <div className="text-sm text-gray-300 mb-3">{current.client} • {current.city}</div>
        <div className="rounded-xl overflow-hidden bg-black relative">
          <img src={current.cover} alt={current.title} className="w-full h-auto object-contain max-h-[80vh]" />
          <button onClick={()=>setLightboxIndex(i=>(i-1+COMPANY.projects.length)%COMPANY.projects.length)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 bg-white/15 text-white hover:bg-white/25">⟵</button>
          <button onClick={()=>setLightboxIndex(i=>(i+1)%COMPANY.projects.length)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 bg-white/15 text-white hover:bg-white/25">⟶</button>
        </div>
        <div className="mt-3 text-xs text-gray-400">Use ← → para navegar • Esc para fechar</div>
      </div>
    </div>)}
  </div>);
}
