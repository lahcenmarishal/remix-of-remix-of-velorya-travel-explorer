import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/velorya-logo-transparent.png.asset.json";
import logoHome from "@/assets/velorya-full-logo.jpg.asset.json";
import heroRiad from "@/assets/hero-riad.jpg.asset.json";
import circuitSouk from "@/assets/circuit-souk.jpeg.asset.json";
import circuitDesert from "@/assets/circuit-desert.jpeg.asset.json";
import circuitChefchaouen from "@/assets/circuit-chefchaouen.jpeg.asset.json";
import circuitKasbah from "@/assets/circuit-kasbah.jpeg.asset.json";
import circuitTannerie from "@/assets/circuit-tannerie.jpeg.asset.json";
import circuitEssaouira from "@/assets/circuit-essaouira.jpeg.asset.json";
import desertDinner from "@/assets/desert-dinner.jpg.asset.json";
import desertCamp from "@/assets/desert-camp.jpg.asset.json";
import raid4x4 from "@/assets/raid-4x4.jpg.asset.json";
import atelier from "@/assets/atelier.jpg.asset.json";
import theMenthe from "@/assets/the-menthe-2.jpg.asset.json";
import camelSunset from "@/assets/camel-sunset.jpg.asset.json";
import restaurant from "@/assets/restaurant.png.asset.json";
import mice1 from "@/assets/mice1.jpg.asset.json";
import mice2 from "@/assets/mice2.jpg.asset.json";
import mongolfiere from "@/assets/mongolfiere.jpg.asset.json";
import exp1 from "@/assets/exp1.jpeg.asset.json";
import exp2 from "@/assets/exp2.jpeg.asset.json";
import evenement2 from "@/assets/evenement-2.jpg.asset.json";
import logoKoesio from "@/assets/koesio.png.asset.json";
import logoFerrari from "@/assets/ferr.png.asset.json";
import logoCaf from "@/assets/caaf.jpg.asset.json";
import logoUniglobe from "@/assets/bel.png.asset.json";
import logoFresenius from "@/assets/kapi.jpg.asset.json";
import logoAllianz from "@/assets/alli.png.asset.json";
import logoBenetti from "@/assets/ben.gif.asset.json";
import logoFintyre from "@/assets/fin.jpg.asset.json";
import logoOticon from "@/assets/oti.png.asset.json";
import activityVideo1 from "@/assets/activity-1.mp4.asset.json";
import activityVideo2 from "@/assets/activity-2.mp4.asset.json";
import activityVideo3 from "@/assets/activity-3.mp4.asset.json";
import activityVideo4 from "@/assets/activity-4.mp4.asset.json";
import activityVideo5 from "@/assets/activity-5.mp4.asset.json";

const pageIds = ["home","activities","about","why","mission","mice","seminars","private","circuits","destinations","experiences","events","contact"] as const;

const pageTones: ("dark" | "light" | "sand")[] = [
  "dark", "light", "light", "sand", "light", "light", "light", "light", "sand", "light", "light", "light", "light",
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const pages = pageIds.map((id, idx) => ({
    id,
    label: t(`nav.pages.${id}`),
    num: String(idx + 1).padStart(2, "0"),
  }));
  const pagerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = i18n.language?.startsWith("en") ? "en" : "fr";
  const toggleLang = () => i18n.changeLanguage(lang === "fr" ? "en" : "fr");

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
            : "backdrop-blur-md border-b border-burgundy/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        }`}
        style={
          active !== 0 && scrolled
            ? { background: "#ffffff" }
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
              className="h-20 w-20 md:h-20 md:w-20 rounded-full object-cover border-2 border-gold/80 shadow-[0_0_0_2px_rgba(201,168,76,0.35)]"
            />
          ) : (
            <img src={logo.url} alt="Velorya Event" className="h-20 md:h-20 w-auto object-contain" />
          )}
          <span className={`hidden md:flex flex-col leading-tight text-left ${active === 0 ? "text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : "text-burgundy"}`}>
            <span className="font-display text-base sm:text-lg md:text-2xl font-medium tracking-[0.14em] uppercase">
              Velorya <span className={active === 0 ? "text-gold" : "text-burgundy-deep"}>Event</span>
            </span>
            <span className={`mt-1 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.32em] ${active === 0 ? "text-gold/90" : "text-burgundy/70"}`}>
              {t("brand.tag")}
            </span>
          </span>
        </button>
        <div className="pointer-events-auto flex items-center gap-4">
          <div className={`hidden md:flex items-center gap-2 text-xs font-semibold ${active === 0 ? "text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : "text-burgundy"}`}>
            <span className={`tabular-nums text-base ${active === 0 ? "text-gold" : "text-burgundy"}`}>{pages[active].num}</span>
            <span className={`h-px w-8 ${active === 0 ? "bg-gold/70" : "bg-burgundy/40"}`} />
            <span className={`tabular-nums ${active === 0 ? "text-cream/80" : "text-burgundy/70"}`}>{String(pages.length).padStart(2, "0")}</span>
          </div>
          <button
            onClick={toggleLang}
            aria-label="Change language"
            className={`flex h-11 items-center gap-1 rounded-full border-2 px-4 text-xs font-semibold uppercase tracking-widest transition shadow-[var(--shadow-soft)] ${
              active === 0
                ? "border-gold bg-burgundy/40 backdrop-blur-md text-cream hover:bg-burgundy/60"
                : "border-gold bg-cream/80 backdrop-blur-sm text-burgundy hover:bg-burgundy hover:text-cream"
            }`}
          >
            <span className={lang === "fr" ? "font-bold text-gold" : "opacity-60"}>FR</span>
            <span className="opacity-50">/</span>
            <span className={lang === "en" ? "font-bold text-gold" : "opacity-60"}>EN</span>
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 items-center gap-2 rounded-full bg-burgundy px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-burgundy-deep transition"
          >
            <span className="relative h-3 w-4">
              <span className={`absolute inset-x-0 top-0 h-[1.5px] bg-current transition ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
            {menuOpen ? t("nav.close") : t("nav.menu")}
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
          aria-label={t("nav.prev")}
        >←</button>
      )}
      <button
        onClick={() => goTo(Math.min(pages.length - 1, active + 1))}
        disabled={active === pages.length - 1}
        className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 md:h-12 md:w-12 rounded-full bg-burgundy text-cream hover:bg-burgundy-deep disabled:opacity-30 transition flex items-center justify-center"
        aria-label={t("nav.next")}
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
              aria-label={t("nav.goto", { label: p.label })}
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
        <PageActivities />
        <PageAbout />
        <PageWhy />
        <PageMission />
        <PageMice />
        <PageSeminars />
        <PagePrivate />
        <PageCircuits />
        <PageDestinations />
        <PageExperiences />
        <PageEvents />
        <PageContact />
      </div>
    </div>
  );
}

function PageShell({ children, tone = "sand", num, kicker, title }: { children: React.ReactNode; tone?: "light" | "dark" | "sand"; num?: string; kicker?: string; title?: string }) {
  const bg = tone === "dark" ? "bg-burgundy-deep text-cream" : "bg-white text-foreground";
  const style = undefined;
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
  const { t } = useTranslation();
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
            {t("home.kicker")}
            <span className="mx-2 md:mx-3 text-gold">—</span>
            <span className="italic tracking-[0.22em] text-cream/90 normal-case"></span>
          </span>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            {t("home.title1")}<br />
            <span className="italic text-gold">{t("home.titleSignature")}</span> {t("home.title2")}
          </h1>
          <p className="mt-8 text-base md:text-lg text-cream/90 leading-relaxed max-w-2xl">
            {t("home.desc")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={onNext} className="group flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-medium text-burgundy hover:bg-gold transition">
              {t("home.cta")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelectorAll(".page")[10]?.scrollIntoView(); }} className="text-sm underline underline-offset-4 text-cream/80 hover:text-gold">
              {t("home.contact")}
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl border-t border-cream/30 pt-8">
            <StatLight n="25+" l={t("home.stats.years")} />
            <StatLight n="100%" l={t("home.stats.satisfaction")} />
            <StatLight n="24/7" l={t("home.stats.assistance")} />
            <StatLight n={t("home.stats.coverageValue")} l={t("home.stats.coverage")} />
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
  const { t } = useTranslation();
  return (
    <PageShell num="03" kicker={t("nav.pages.about")} title={t("about.title")}>
      <></>
      {null}
      {undefined}
      {/* PageActivities is defined below */}
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6 text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
        <div className="md:col-span-2 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
            <img src={theMenthe.url} alt={t("about.imgAlt")} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block bg-burgundy text-cream p-6 rounded-sm max-w-[220px]">
            <div className="font-display text-2xl italic text-gold">"</div>
            <p className="text-sm leading-snug">{t("about.quote")}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageWhy() {
  const { t } = useTranslation();
  const items = [
    { i: "✈", t: t("why.items.proxT"), d: t("why.items.proxD") },
    { i: "☀", t: t("why.items.climT"), d: t("why.items.climD") },
    { i: "🤝", t: t("why.items.hospT"), d: t("why.items.hospD") },
    { i: "🛡", t: t("why.items.secT"), d: t("why.items.secD") },
    { i: "🗣", t: t("why.items.langT"), d: t("why.items.langD") },
    { i: "🌍", t: t("why.items.divT"), d: t("why.items.divD") },
    { i: "🍽", t: t("why.items.gastT"), d: t("why.items.gastD") },
    { i: "💰", t: t("why.items.valT"), d: t("why.items.valD") },
  ];
  return (
    <PageShell tone="sand" num="04" kicker={t("why.kicker")} title={t("why.title")}>
      <p className="mb-10 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
        {t("why.intro")}
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
  const { t } = useTranslation();
  const services = t("mission.services", { returnObjects: true }) as string[];
  return (
    <PageShell num="05" kicker={t("mission.kicker")} title={t("mission.title")}>
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
            {t("mission.intro")}
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
  const { t } = useTranslation();
  const pillars = t("mice.pillars", { returnObjects: true }) as string[];
  return (
    <PageShell num="06" kicker={t("mice.kicker")} title={t("mice.title")}>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6 max-w-2xl">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {t("mice.p1Prefix")}<strong>{t("mice.p1Bold")}</strong>{t("mice.p1Suffix")}
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {t("mice.p2")}
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {t("mice.p3")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {pillars.map((w) => (
              <div key={w} className="border-t border-burgundy/20 pt-4">
                <div className="text-burgundy text-xs uppercase tracking-widest">✦</div>
                <div className="font-display text-2xl mt-2 text-burgundy">{w}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 gap-4">
          <img src={restaurant.url} alt="Soirée de gala au Maroc" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)] mt-8" />
          <img src={evenement2.url} alt="Dîner événementiel dans le désert" className="aspect-[3/4] object-cover rounded-sm shadow-[var(--shadow-soft)]" />
        </div>
      </div>
    </PageShell>
  );
}

function PageSeminars() {
  const { t } = useTranslation();
  const tags = t("seminars.tags", { returnObjects: true }) as string[];
  return (
    <PageShell num="07" kicker={t("seminars.kicker")} title={t("seminars.title")}>
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed">
          <p>{t("seminars.p1")}</p>
          <p className="text-foreground/60 text-base">{t("seminars.p2")}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs uppercase tracking-widest border border-burgundy/30 rounded-full px-3 py-1.5 text-burgundy">{tag}</span>
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
  const { t } = useTranslation();
  return (
    <PageShell num="08" kicker={t("private.kicker")} title={t("private.title")}>
      <div className="grid gap-8 md:grid-cols-6 items-center">
        <div className="md:col-span-2 space-y-6 max-w-2xl">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {t("private.p1")}
          </p>
          <p className="font-display italic text-2xl text-burgundy">{t("private.p2")}</p>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
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
  const { t } = useTranslation();
  const items = t("circuits.items", { returnObjects: true }) as { t: string; d: string }[];
  return (
    <PageShell tone="sand" num="09" kicker={t("circuits.kicker")} title={t("circuits.title")}>
      <p className="mb-12 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
        <strong>{t("circuits.intro1")}</strong>{t("circuits.intro2")}
      </p>
      <div className="mb-10 grid grid-cols-3 grid-rows-[repeat(4,minmax(0,1fr))] md:grid-rows-[repeat(4,minmax(0,1fr))] gap-2 md:gap-3 aspect-[3/2.2]">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitKasbah.url} alt="Kasbah d'Aït-Ben-Haddou" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitChefchaouen.url} alt="Chefchaouen, la ville bleue" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitDesert.url} alt="Désert du Sahara" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
        <div className="col-span-1 row-span-2 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitSouk.url} alt="Souk marocain" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
        <div className="col-span-1 row-span-2 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitEssaouira.url} alt="Remparts d'Essaouira" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
        <div className="col-span-1 row-span-2 overflow-hidden rounded-sm shadow-[var(--shadow-elegant)]">
          <img src={circuitTannerie.url} alt="Tanneries de Fès" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  const { t } = useTranslation();
  const cities = t("destinations.cities", { returnObjects: true }) as { t: string; d: string }[];
  return (
    <PageShell num="10" kicker={t("destinations.kicker")} title={t("destinations.title")}>
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
  const { t } = useTranslation();
  const icons = ["🎈","🚗","🐪","🏍","🐎","⛵","🍽","💆","📸","🏍"];
  const rows = t("experiences.items", { returnObjects: true }) as [string, string][];
  const exps = rows.map((r, i) => [icons[i], r[0], r[1]] as [string, string, string]);
  return (
    <PageShell num="11" kicker={t("experiences.kicker")} title={t("experiences.title")}>
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
  const { t } = useTranslation();
  return (
    <PageShell num="13" kicker={t("contact.kicker")} title={t("contact.title")}>
      <div className="grid gap-16 md:grid-cols-2 items-start">
        <div className="space-y-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">{t("contact.office")}</div>
            <p className="font-display text-2xl text-foreground">{t("contact.city")}</p>
            <p className="text-foreground/70 mt-1">{t("contact.address")}<br />{t("contact.addressLine2")}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">{t("contact.email")}</div>
            <a href="mailto:office@velorya-event.com" className="font-display text-2xl text-foreground hover:text-burgundy transition">office@velorya-event.com</a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy mb-2">{t("contact.phone")}</div>
            <a href="tel:+212661313485" className="font-display text-2xl text-foreground hover:text-burgundy transition">+212 661 31 34 85</a>
          </div>
          <a href="mailto:office@velorya-event.com" className="inline-flex items-center gap-3 rounded-full bg-burgundy px-7 py-4 text-sm font-medium text-cream hover:bg-burgundy-deep transition">
            {t("contact.cta")} <span>→</span>
          </a>
        </div>
        <div className="relative">
          <blockquote className="font-display text-3xl md:text-4xl italic leading-tight text-burgundy max-w-md">
            {t("contact.quote")}
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <img src={logo.url} alt="Velorya Event" className="h-16 w-16 rounded-full object-cover bg-white ring-1 ring-burgundy/20" />
            <div>
              <div className="font-display text-xl text-burgundy">Velorya Event</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.excellence")}</div>
            </div>
          </div>
          <p className="mt-14 text-xs text-muted-foreground">{t("contact.rights", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </PageShell>
  );
}

function PageEvents() {
  const { t } = useTranslation();
  const clients = [
    { logo: logoKoesio, name: "Koesio", ctx: t("events.clients.koesio"), pax: 1200 },
    { logo: logoFerrari, name: "Ferrari", ctx: t("events.clients.ferrari"), pax: 600 },
    { logo: logoCaf, name: "CAF", ctx: t("events.clients.caf") },
    { logo: null as any, name: t("events.names.astrid"), ctx: t("events.clients.astrid"), pax: 600 },
    { logo: logoUniglobe, name: "Uniglobe", ctx: t("events.clients.uniglobe"), pax: 300 },
    { logo: logoFresenius, name: "Fresenius Kabi", ctx: t("events.clients.fresenius"), pax: 120 },
    { logo: logoAllianz, name: "Allianz", ctx: t("events.clients.allianz"), pax: 200 },
    { logo: logoBenetti, name: "Benetti", ctx: t("events.clients.benetti"), pax: 200 },
    { logo: logoFintyre, name: "Fintyre / Franco Gomme", ctx: t("events.clients.fintyre"), pax: 160 },
    { logo: logoOticon, name: "Oticon", ctx: t("events.clients.oticon"), pax: 180 },
  ];
  return (
    <PageShell num="12" kicker={t("events.kicker")} title={t("events.title")}>
      <div className="max-w-3xl space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed mb-10">
        <p>{t("events.p1")}</p>
        <p className="text-foreground/60">{t("events.p2")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {clients.map((c) => (
          <div key={c.name} className="group flex flex-col items-center justify-between gap-4 rounded-sm border border-burgundy/15 bg-cream/60 backdrop-blur p-5 hover:border-burgundy/50 hover:bg-cream transition">
            <div className="flex h-20 w-full items-center justify-center">
              {c.logo ? (
                <img src={c.logo.url} alt={c.name} className="max-h-16 max-w-[80%] object-contain" loading="lazy" />
              ) : (
                <div className="font-display text-lg text-burgundy text-center leading-tight">{c.name}</div>
              )}
            </div>
            <div className="text-center">
              {c.logo && <div className="font-display text-sm text-burgundy mb-1">{c.name}</div>}
              <div className="text-[11px] uppercase tracking-widest text-foreground/60">{c.ctx}</div>
              {c.pax && (
                <div className="mt-2 inline-flex items-baseline gap-1">
                  <span className="font-display text-2xl text-gold tabular-nums">{c.pax}</span>
                  <span className="text-[10px] uppercase tracking-widest text-burgundy">{t("events.pax")}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm italic text-foreground/60">{t("events.more")}</p>
    </PageShell>
  );
}
