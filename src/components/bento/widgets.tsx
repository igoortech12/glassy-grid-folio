import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  MapPin,
  Sparkles,
  TrendingUp,
  Mail,
  ArrowUpRight,
  Music2,
} from "lucide-react";
import type { Widget } from "@/lib/mock-data";
import { profileData } from "@/lib/mock-data";

const SOCIAL_META: Record<string, { Icon: typeof Instagram; bg: string; label: string }> = {
  instagram: { Icon: Instagram, bg: "from-pink-500/30 to-orange-400/20", label: "Instagram" },
  linkedin: { Icon: Linkedin, bg: "from-sky-500/30 to-blue-600/20", label: "LinkedIn" },
  github: { Icon: Github, bg: "from-slate-300/20 to-slate-500/10", label: "GitHub" },
  youtube: { Icon: Youtube, bg: "from-red-500/30 to-red-700/20", label: "YouTube" },
};

export function WidgetContent({ widget }: { widget: Widget }) {
  switch (widget.type) {
    case "profile":
      return <ProfileWidget />;
    case "social":
      return <SocialWidget content={widget.content} />;
    case "showcase":
      return <ShowcaseWidget content={widget.content} />;
    case "newsletter":
      return <NewsletterWidget content={widget.content} />;
    case "map":
      return <MapWidget content={widget.content} />;
    case "stat":
      return <StatWidget content={widget.content} />;
    case "spotify":
      return <SpotifyWidget content={widget.content} />;
    default:
      return null;
  }
}

function ProfileWidget() {
  return (
    <div className="flex h-full flex-col justify-between p-5 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl ring-2 ring-primary/40">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="h-full w-full object-cover"
            width={512}
            height={512}
          />
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-4 ring-background">
            ✓
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            @{profileData.username}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold leading-tight text-gradient-violet sm:text-3xl">
            {profileData.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{profileData.bio}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {profileData.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-hairline bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground/90 backdrop-blur"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialWidget({ content }: { content: Record<string, unknown> }) {
  const network = String(content.network ?? "instagram");
  const meta = SOCIAL_META[network] ?? SOCIAL_META.instagram;
  const { Icon } = meta;
  return (
    <a
      href={String(content.url ?? "#")}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between p-4"
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${meta.bg} ring-1 ring-white/10`}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>
      <div className="flex items-end justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{meta.label}</p>
          <p className="truncate text-xs text-muted-foreground">{String(content.handle ?? "")}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </a>
  );
}

function ShowcaseWidget({ content }: { content: Record<string, unknown> }) {
  return (
    <a href={String(content.url ?? "#")} className="group block h-full">
      <div className="relative h-full w-full">
        <img
          src={String(content.cover ?? "")}
          alt={String(content.title ?? "")}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          width={1024}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div className="min-w-0">
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow ring-1 ring-primary/30">
              {String(content.tag ?? "")}
            </span>
            <h3 className="mt-2 truncate text-lg font-bold text-white sm:text-xl">
              {String(content.title ?? "")}
            </h3>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 transition-transform group-hover:scale-110">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </a>
  );
}

function NewsletterWidget({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <Mail className="h-5 w-5 text-primary-glow" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {String(content.title ?? "")}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            {String(content.subtitle ?? "")}
          </p>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-4 flex items-center gap-1 rounded-full border border-hairline bg-slate-950/60 p-1 backdrop-blur"
      >
        <input
          type="email"
          placeholder="seu@email.com"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          Assinar
        </button>
      </form>
    </div>
  );
}

function MapWidget({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="relative flex h-full flex-col justify-between p-4">
      {/* stylized dark map */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="mapglow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="oklch(0.606 0.25 292)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="oklch(0.18 0.03 264)" />
        <g stroke="oklch(0.32 0.03 264)" strokeWidth="0.5" fill="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M ${i * 18} 0 Q ${i * 18 + 10} 100 ${i * 18 - 5} 200`}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={`h${i}`} d={`M 0 ${i * 22} Q 100 ${i * 22 + 6} 200 ${i * 22 - 4}`} />
          ))}
        </g>
        <circle cx="100" cy="110" r="80" fill="url(#mapglow)" />
      </svg>
      <div className="relative">
        <span className="rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
          Localização
        </span>
      </div>
      <div className="relative flex items-end justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{String(content.city ?? "")}</p>
          <p className="text-xs text-muted-foreground">{String(content.country ?? "")}</p>
        </div>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
          <MapPin className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function StatWidget({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
        <Sparkles className="h-5 w-5 text-primary-glow" />
      </div>
      <div>
        <p className="text-3xl font-extrabold text-gradient-violet">{String(content.value ?? "")}</p>
        <p className="mt-0.5 text-xs font-medium text-foreground">{String(content.label ?? "")}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
          <TrendingUp className="h-3 w-3" /> {String(content.trend ?? "")}
        </p>
      </div>
    </div>
  );
}

function SpotifyWidget({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="flex h-full items-center gap-4 p-4">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-emerald-700/20 ring-1 ring-emerald-400/30">
        <Music2 className="h-7 w-7 text-emerald-300" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
          {String(content.title ?? "")}
        </p>
        <p className="mt-1 truncate text-base font-bold text-foreground">
          {String(content.track ?? "")}
        </p>
        <p className="truncate text-xs text-muted-foreground">{String(content.artist ?? "")}</p>
        <div className="mt-2 flex h-6 items-end gap-0.5">
          {[3, 7, 4, 9, 5, 8, 3, 6, 4, 7, 5, 9, 4, 6, 3, 7].map((h, i) => (
            <span
              key={i}
              className="w-0.5 rounded-full bg-emerald-400/70"
              style={{ height: `${h * 10}%`, animation: `glow-pulse 1.${i % 9}s ease-in-out infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
