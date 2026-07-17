import { useEffect, useRef, useState } from "react";
import logo from "@/assets/velorya-logo-transparent.png.asset.json";
import logoHome from "@/assets/velorya-full-logo.jpg.asset.json";
import heroRiad from "@/assets/hero-riad.jpg.asset.json";
import moroccoGrid from "@/assets/morocco-grid.png.asset.json";
import desertDinner from "@/assets/desert-dinner.jpg.asset.json";
import desertCamp from "@/assets/desert-camp.jpg.asset.json";
import raid4x4 from "@/assets/raid-4x4.jpg.asset.json";
import atelier from "@/assets/atelier.jpg.asset.json";
import theMenthe from "@/assets/the-menthe.jpg.asset.json";
import camelSunset from "@/assets/camel-sunset.jpg.asset.json";
import restaurant from "@/assets/restaurant.png.asset.json";
import mice1 from "@/assets/mice1.jpg.asset.json";
import mice2 from "@/assets/mice2.jpg.asset.json";
import mongolfiere from "@/assets/mongolfiere.jpg.asset.json";
import exp1 from "@/assets/exp1.jpeg.asset.json";
import exp2 from "@/assets/exp2.jpeg.asset.json";
import evenement2 from "@/assets/evenement-2.jpg.asset.json";

const pages = [
  { id: "home", label: "Accueil", num: "01" },
  { id: "about", label: "À Propos", num: "02" },
  { id: "why", label: "Pourquoi le Maroc", num: "03" },
  { id: "mission", label: "Notre Mission", num: "04" },
  { id: "mice", label: "Événements", num: "05" },
  { id: "seminars", label: "Séminaires", num: "06" },
  { id: "private", label: "Voyages Privés", num: "07" },
  { id: "circuits", label: "Circuits", num: "08" },
  { id: "destinations", label: "Destinations", num: "09" },
  { id: "experiences", label: "Expériences", num: "10" },
  { id: "contact", label: "Contact", num: "11" },
];

const pageTones: ("dark" | "light" | "sand")[] = [
  "dark", "light", "sand", "light", "light", "light", "light", "sand", "light", "light", "light",
];

export default function Home() {
  const pagerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = pagerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / window.innerWidth);
      setActive(idx);
    };
    const onInnerScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.classList?.contains("page")) {
        setScrolled(target.scrollTop > 20);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scroll", onInnerScroll, { passive: true, capture: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scroll", onInnerScroll, { capture: true } as any);
    };
  }, []);

  // Reset scrolled state when switching pages
  useEffect(() => {
    setScrolled(false);
  }, [active]);

  const goTo = (i: number) => {
    const el = pagerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Top bar */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 transition-all duration-300 ${
          !scrolled
            ? "bg-transparent"
            : pageTones[active] === "sand"
              ? "backdrop-blur-md border-b border-burgundy/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
              : pageTones[active] === "dark"
                ? "bg-burgundy-deep/95 backdrop-blur-md border-b border-gold/20 shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
                : "bg-background/95 backdrop-blur-md border-b border-burgundy/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        }`}
        style={
          active !== 0 && scrolled && pageTones[active] === "sand"
            ? { background: "var(--gradient-sand)" }
            : undefined
        }
      >
        <button
          onClick={() => goTo(0)}
          className="pointer-events-auto flex items-center gap-3 md:gap-4 group"
        >
          {active === 0 ? (
            <img
              src={logoHome.url}
              alt="Velorya Event"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-gold/80 shadow-[0_0_0_2px_rgba(201,168,76,0.35)]"
            />
          ) : (
            <img src={logo.url} alt="Velorya Event" className="h-12 md:h-14 w-auto object-contain" />
          )}
          <span className={`flex flex-col leading-tight text-left ${active === 0 ? "text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : "text-burgundy"}`}>
            <span className="font-display text-base sm:text-lg md:text-2xl font-medium tracking-[0.14em] uppercase">
              Velorya <span className={active === 0 ? "text-gold" : "text-burgundy-deep"}>Event</span>
            </span>
            <span className={`mt-1 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.32em] ${active === 0 ? "text-gold/90" : "text-burgundy/70"}`}>
              Event &amp; Travel Premium Agency
            </span>
          </span>
        </button>
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="tabular-nums text-burgundy">{pages[active].num}</span>
            <span className="h-px w-8 bg-burgundy/40" />
            <span className="tabular-nums">{String(pages.length).padStart(2, "0")}</span>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 items-center gap-2 rounded-full bg-burgundy px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-burgundy-deep transition"
          >
            <span className="relative h-3 w-4">
              <span className={`absolute inset-x-0 top-0 h-[1.5px] bg-current transition ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-2 px-10 md:px-24">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              className="group flex items-baseline gap-6 text-left"
            >
              <span className="text-xs tabular-nums text-cream/50">{p.num}</span>
              <span className={`font-display text-4xl md:text-6xl font-medium transition-all ${active === i ? "text-gold" : "text-cream/80 group-hover:text-gold group-hover:translate-x-2"}`}>
                {p.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Side controls (centered vertically) */}
      {active > 0 && (
        <button
          onClick={() => goTo(Math.max(0, active - 1))}
          className="fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 md:h-12 md:w-12 rounded-full border border-burgundy/30 bg-cream/80 backdrop-blur text-burgundy hover:bg-burgundy hover:text-cream transition flex items-center justify-center"
          aria-label="Précédent"
        >←</button>
      )}
      <button
        onClick={() => goTo(Math.min(pages.length - 1, active + 1))}
        disabled={active === pages.length - 1}
        className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 md:h-12 md:w-12 rounded-full bg-burgundy text-cream hover:bg-burgundy-deep disabled:opacity-30 transition flex items-center justify-center"
        aria-label="Suivant"
      >→</button>

      {/* Pagination dots */}
      <div className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3">
        {pages.map((p, i) => {
          const isActive = active === i;
          const onDark = active === 0;
          return (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={`Aller à ${p.label}`}
              aria-current={isActive}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "h-2.5 w-8 md:w-9 bg-gold"
                  : onDark
                    ? "h-2.5 w-2.5 bg-cream/70 hover:bg-cream"
                    : "h-2.5 w-2.5 bg-burgundy/50 hover:bg-burgundy"
              }`}
            />
          );
        })}
      </div>

      {/* Pager */}
      <div ref={pagerRef} className="pager">
        <PageHome onNext={() => goTo(1)} />
        <PageAbout />
        <PageWhy />
        <PageMission />
        <PageMice />
        <PageSeminars />
        <PagePrivate />
        <PageCircuits />
        <PageDestinations />
        <PageExperiences />
        <PageContact />
      </div>
    </div>
  );
}

function PageShell({ children, tone = "light", num, kicker, title }: { children: React.ReactNode; tone?: "light" | "dark" | "sand"; num?: string; kicker?: string; title?: string }) {
  const bg = tone === "dark" ? "bg-burgundy-deep text-cream" : tone === "sand" ? "text-foreground" : "bg-background text-foreground";
  const style = tone === "sand" ? { background: "var(--gradient-sand)" } : undefined;
  return (
    <section className={`page ${bg}`} style={style}>
      <div className="min-h-screen px-6 pt-28 pb-16 md:px-16 md:pt-32 lg:px-24">
        {(kicker || num) && (
          <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] opacity-70">
            {num && <span className="tabular-nums">{num}</span>}
            {kicker && <><span className="h-px w-8 bg-current opacity-40" />{kicker}</>}
          </div>
        )}
        {title && <h2 className="mb-10 max-w-4xl font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05]">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

function PageHome({ onNext }: { onNext: () => void }) {
  return (
    <section className="page relative text-cream">
      <div className="sticky top-0 h-screen w-full">
        <img src={heroRiad.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.18 0.06 20 / 0.6) 0%, oklch(0.24 0.09 15 / 0.4) 45%, oklch(0.18 0.04 20 / 0.25) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 -mt-[100vh] min-h-screen px-6 pt-28 pb-16 md:px-16 md:pt-32 lg:px-24">
        <div className="mb-8 flex items-center gap-4 md:gap-5 text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          <span className="tabular-nums text-xs md:text-sm uppercase tracking-[0.3em] text-cream/80">01</span>
          <span className="h-px w-10 md:w-14 bg-gold/70" />
          <span className="font-display text-sm md:text-lg lg:text-xl uppercase tracking-[0.32em] text-cream">
            L'Art du Voyage
            <span className="mx-2 md:mx-3 text-gold">—</span>
            <span className="italic tracking-[0.22em] text-cream/90 normal-case">Signature marocaine depuis 25 ans</span>
          </span>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            Créateurs de voyages<br />
            <span className="italic text-gold">d'exception</span> au Maroc.
          </h1>
          <p className="mt-8 text-base md:text-lg text-cream/90 leading-relaxed max-w-2xl">
            Depuis plus de 25 ans, nous concevons des expériences uniques — voyages sur-mesure, séminaires, incentives et événements — pensées avec passion, exigence et sens du détail.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={onNext} className="group flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-medium text-burgundy hover:bg-gold transition">
              Découvrir l'agence
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelectorAll(".page")[10]?.scrollIntoView(); }} className="text-sm underline underline-offset-4 text-cream/80 hover:text-gold">
              Nous contacter
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl border-t border-cream/30 pt-8">
            <StatLight n="25+" l="Années d'expertise" />
            <StatLight n="100%" l="Satisfaction client" />
            <StatLight n="24/7" l="Assistance" />
            <StatLight n="Nationale" l="Couverture toutes villes" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatLight({ n, l }: { n: string; l: string }) {
  return (
    <div className="border-l-2 border-gold/70 pl-4">
      <div className="font-display text-2xl md:text-4xl text-gold leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{n}</div>
      <div className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.2em] text-cream font-medium">{l}</div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-burgundy">{n}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}

function PageAbout() {
  return (
    <PageShell num="02" kicker="À Propos" title="Une équipe passionnée au service de vos projets.">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6 text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
          <p>Depuis plus de 25 ans, nous concevons des voyages qui vont bien au-delà d'un simple déplacement : nous créons des expériences uniques, pensées avec passion, exigence et sens du détail.</p>
          <p>Grâce à des partenariats solides avec des fournisseurs de confiance et un vaste réseau soigneusement développé, nous bénéficions de conditions privilégiées pour offrir des prestations de grande qualité au meilleur rapport qualité-prix.</p>
          <p>Qu'il s'agisse de loisirs, de voyages d'affaires ou d'expériences exclusives, notre engagement est de transformer chaque séjour en un souvenir inoubliable, sous le signe de l'excellence, du confort et d'un service personnalisé.</p>
        </div>
        <div className="md:col-span-2 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
            <img src={theMenthe.url} alt="Thé à la menthe traditionnel" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block bg-burgundy text-cream p-6 rounded-sm max-w-[220px]">
            <div className="font-display text-2xl italic text-gold">"</div>
            <p className="text-sm leading-snug">L'art du voyage, à la marocaine.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageWhy() {
  const items = [
    { i: "✈", t: "Proximité géographique", d: "À seulement quelques heures de vol de l'Europe et facilement accessible depuis de nombreuses destinations internationales." },
    { i: "☀", t: "Climat agréable", d: "Un ensoleillement généreux et des températures favorables en toute saison." },
    { i: "🤝", t: "Hospitalité légendaire", d: "Un accueil chaleureux, une culture de partage et un sens reconnu de la convivialité." },
    { i: "🛡", t: "Sécurité et stabilité", d: "Une destination rassurante avec des infrastructures touristiques modernes." },
    { i: "🗣", t: "Population multilingue", d: "Le français, l'arabe, l'espagnol et l'anglais sont largement parlés dans les principales destinations touristiques, facilitant les échanges avec les visiteurs." },
    { i: "🌍", t: "Diversité des expériences", d: "Villes impériales, désert, montagnes, plages et patrimoine culturel exceptionnel." },
    { i: "🍽", t: "Richesse gastronomique", d: "Une cuisine authentique, réputée pour ses saveurs et sa diversité." },
    { i: "💰", t: "Excellent rapport qualité-prix", d: "Une offre touristique adaptée à tous les budgets." },
  ];
  return (
    <PageShell tone="sand" num="03" kicker="Destination" title="Pourquoi choisir le Maroc ?">
      <p className="mb-10 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
        Le Maroc est une destination privilégiée qui allie accessibilité, authenticité et qualité d'accueil, offrant une expérience de voyage unique tout au long de l'année.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="group rounded-sm border border-burgundy/15 bg-cream/60 backdrop-blur p-6 hover:border-burgundy/50 hover:bg-cream transition">
            <div className="text-2xl mb-4">{it.i}</div>
            <div className="font-display text-xl mb-2 text-burgundy">{it.t}</div>
            <p className="text-sm text-foreground/70 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PageMission() {
  const services = [
    "Voyages d'affaires & solutions MICE",
    "Circuits touristiques & programmes de découverte",
    "Voyages de loisirs sur-mesure",
    "Programmes incentive & team building",
  ];
  return (
    <PageShell num="04" kicker="Notre Mission" title="Transformer chaque projet en expérience mémorable.">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
            Nous concevons et organisons des expériences adaptées aux besoins spécifiques de chacun de nos clients, avec expertise, créativité et exigence de qualité.
          </p>
          <ul className="space-y-4">
            {services.map((s, i) => (
              <li key={s} className="flex items-start gap-4 border-b border-burgundy/10 pb-4">
                <span className="font-display text-2xl text-gold tabular-nums">0{i + 1}</span>
                <span className="text-lg text-foreground/90">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={atelier.url} alt="Atelier tissage" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)] mt-8" />
          <img src={raid4x4.url} alt="Raid 4x4" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)]" />
        </div>
      </div>
    </PageShell>
  );
}

function PageMice() {
  return (
    <PageShell num="05" kicker="Incentive & Événements" title="L'excellence au service de vos événements d'entreprise.">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6 max-w-2xl">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Parce qu'un voyage peut être bien plus qu'un simple déplacement, nous concevons des <strong>programmes Incentive</strong> qui renforcent les relations, stimulent la motivation et valorisent vos équipes. Dans les décors les plus prestigieux du Maroc, chaque expérience est imaginée pour allier excellence, authenticité et émotion.
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Des événements exclusifs aux activités de team building, en passant par les soirées de gala et les expériences sur mesure, nous transformons vos objectifs en souvenirs inoubliables.
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Faites de chaque instant une source d'inspiration, de chaque destination une réussite, et de chaque événement une expérience d'exception.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {["Récompenser", "Inspirer", "Rassembler", "Vivre l'Exception"].map((w) => (
              <div key={w} className="border-t border-burgundy/20 pt-4">
                <div className="text-burgundy text-xs uppercase tracking-widest">✦</div>
                <div className="font-display text-2xl mt-2 text-burgundy">{w}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <img src={restaurant.url} alt="Soirée de gala au Maroc" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)] mt-8" />
          <img src={evenement2.url} alt="Dîner événementiel dans le désert" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)]" />
        </div>
      </div>
    </PageShell>
  );
}

function PageSeminars() {
  return (
    <PageShell num="06" kicker="Meetings" title="Séminaires & conférences d'exception.">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed">
          <p>Faites de vos événements professionnels un véritable levier de réussite. Nous concevons séminaires, conférences, conventions et réunions d'entreprise sur mesure, dans les plus belles destinations du Maroc.</p>
          <p className="text-foreground/60 text-base">De la sélection des lieux à la coordination logistique, en passant par les équipements audiovisuels, l'hébergement et les activités complémentaires — chaque détail est orchestré avec rigueur.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Séminaires", "Conférences", "Conventions", "Congrès", "Lancements de produits", "Réunions exécutives"].map((t) => (
              <span key={t} className="text-xs uppercase tracking-widest border border-burgundy/30 rounded-full px-3 py-1.5 text-burgundy">{t}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 gap-4">
          <img src={mice1.url} alt="Salle de conférence" className="aspect-square object-cover rounded-sm" />
          <img src={mice2.url} alt="Espace événementiel" className="aspect-square object-cover rounded-sm mt-10" />
        </div>
      </div>
    </PageShell>
  );
}

function PagePrivate() {
  return (
    <PageShell num="07" kicker="Voyages Privés" title="L'art du voyage privé au Maroc.">
      <div className="grid gap-8 md:grid-cols-6 items-center">
        <div className="md:col-span-3 space-y-6 max-w-2xl">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Partez à la découverte des plus beaux trésors du Royaume grâce à un service personnalisé alliant luxe, confort et authenticité. Séjournez dans des hôtels prestigieux et des riads d'exception, profitez d'un transport privé avec chauffeur et d'expériences exclusives.
          </p>
          <p className="font-display italic text-2xl text-burgundy">Laissez-nous créer le voyage qui vous ressemble.</p>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 gap-4">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
            <img src={desertCamp.url} alt="Camp de luxe" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-elegant)] mt-8">
            <img src={mongolfiere.url} alt="Montgolfières au-dessus de Marrakech" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageCircuits() {
  const items = [
    { t: "Villes Impériales", d: "Marrakech, Fès, Meknès, Rabat." },
    { t: "Désert du Sahara", d: "Merzouga, Mhamid, bivouacs." },
    { t: "Atlas", d: "Randonnées et villages berbères." },
    { t: "Côte Atlantique", d: "Essaouira, El Jadida, Taghazout, Dakhla." },
    { t: "Kasbahs & Oasis", d: "Aït-Ben-Haddou, Skoura, Draa." },
    { t: "Gorges", d: "Gorges de Todra, Gorges de Dades." },
  ];
  return (
    <PageShell tone="sand" num="08" kicker="Circuits" title="Explorez les plus beaux circuits du Maroc.">
      <p className="mb-12 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
        <strong>Chaque Circuit Raconte une Histoire :</strong> Des ruelles envoûtantes de Marrakech aux dunes infinies de Merzouga, des sommets de l'Atlas aux rivages d'Essaouira, nos circuits vous invitent à vivre le Maroc autrement. Chaque étape est une immersion dans un patrimoine unique, entre traditions, gastronomie et paysages d'exception.
      </p>
      <div className="mb-10 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)] bg-cream/40 flex items-center justify-center">
        <img src={moroccoGrid.url} alt="Paysages du Maroc" className="w-full h-auto object-contain" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((it, i) => (
          <div key={it.t} className="group">
            <div className="font-display text-4xl text-burgundy/30 mb-2 tabular-nums">0{i + 1}</div>
            <div className="font-display text-xl text-burgundy mb-1">{it.t}</div>
            <p className="text-sm text-foreground/70 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PageDestinations() {
  const cities = [
    { t: "Marrakech", d: "La Ville Ocre — palais, jardins et souks effervescents." },
    { t: "Fès", d: "Un musée à ciel ouvert et la plus ancienne médina." },
    { t: "Chefchaouen", d: "La ville bleue nichée dans les montagnes du Rif." },
    { t: "Casablanca", d: "L'énergie de la plus grande métropole du Maroc." },
    { t: "Rabat", d: "Une capitale raffinée et verdoyante." },
    { t: "Essaouira", d: "Cité maritime, remparts et couchers de soleil." },
    { t: "Taghazout", d: "Village de surf, plages dorées, ambiance bohème." },
    { t: "Ouarzazate", d: "Sur les traces des caravanes et du cinéma." },
    { t: "Merzouga", d: "Une expérience hors du temps dans le désert." },
  ];
  return (
    <PageShell num="09" kicker="Destinations" title="Des destinations qui font rêver.">
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
        {cities.map((c, i) => (
          <div key={c.t} className="flex gap-5 border-t border-burgundy/15 pt-5">
            <span className="font-display text-xs text-burgundy/50 tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="font-display text-2xl text-burgundy mb-1">{c.t}</div>
              <p className="text-sm text-foreground/70 leading-relaxed">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PageExperiences() {
  const exps = [
    ["🎈", "Vol en montgolfière", "Levers de soleil au-dessus de paysages magiques."],
    ["🚗", "Voiture vintage", "Les plus belles routes en collection."],
    ["🐪", "Dîner privé au désert", "Une soirée sous les étoiles."],
    ["🏍", "Quad & buggy", "L'adrénaline dans les dunes."],
    ["🐎", "Balade à cheval / chameau", "Explorer au rythme de la nature."],
    ["⛵", "Yacht", "Une journée en mer haut de gamme."],
    ["🍽", "Expériences gastronomiques", "Cours de cuisine et dîners chez l'habitant."],
    ["💆", "Spa & bien-être", "Hammams et spa d'exception."],
    ["📸", "Séance photo pro", "Immortaliser les lieux emblématiques."],
    ["🏍", "Side-car vintage", "Le Maroc autrement, en moto de collection."],
  ];
  return (
    <PageShell num="10" kicker="Expériences" title="L'excellence au cœur de votre voyage.">
      <div className="mb-10 grid grid-cols-2 gap-4">
        <div className="overflow-hidden rounded-sm shadow-[var(--shadow-elegant)] aspect-[4/3]">
          <img src={exp1.url} alt="Quad dans le désert" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-sm shadow-[var(--shadow-elegant)] aspect-[4/3]">
          <img src={exp2.url} alt="Side-car vintage à Marrakech" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2 max-w-5xl">
        {exps.map(([i, t, d]) => (
          <div key={t} className="flex items-start gap-4 border-b border-burgundy/15 pb-4">
            <span className="text-2xl">{i}</span>
            <div>
              <div className="font-display text-xl text-burgundy">{t}</div>
              <p className="text-sm text-foreground/70 leading-relaxed">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PageContact() {
  return (
    <PageShell num="11" kicker="Contact" title="Parlons de votre prochain voyage.">
      <div className="grid gap-16 md:grid-cols-2 items-start">
        <div className="space-y-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">Bureau</div>
            <p className="font-display text-2xl text-foreground">Casablanca</p>
            <p className="text-foreground/70 mt-1">RDC 32, Rue Mohammed El Houdaikie<br />Maârif — Casablanca, Maroc</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">Email</div>
            <a href="mailto:office@velorya-event.com" className="font-display text-2xl text-foreground hover:text-burgundy transition">office@velorya-event.com</a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">Téléphone</div>
            <a href="tel:+212661313485" className="font-display text-2xl text-foreground hover:text-burgundy transition">+212 661 31 34 85</a>
          </div>
          <a href="mailto:office@velorya-event.com" className="inline-flex items-center gap-3 rounded-full bg-burgundy px-7 py-4 text-sm font-medium text-cream hover:bg-burgundy-deep transition">
            Démarrer un projet <span>→</span>
          </a>
        </div>
        <div className="relative">
          <blockquote className="font-display text-3xl md:text-4xl italic leading-tight text-burgundy max-w-md">
            "Le monde est un livre, ceux qui ne voyagent pas n'en lisent qu'une page."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <img src={logo.url} alt="Velorya Event" className="h-16 w-16 rounded-full object-cover bg-white ring-1 ring-burgundy/20" />
            <div>
              <div className="font-display text-xl text-burgundy">Velorya Event</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">25 ans d'excellence</div>
            </div>
          </div>
          <p className="mt-14 text-xs text-muted-foreground">© {new Date().getFullYear()} Velorya Event. Tous droits réservés.</p>
        </div>
      </div>
    </PageShell>
  );
}
