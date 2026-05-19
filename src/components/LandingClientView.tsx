"use client";

import Link from "next/link";
import { useReveal } from "../hooks/use-reveal";
import "../styles.css";
import {
  Compass,
  CheckCircle2,
  Calendar as CalendarIcon,
  LayoutGrid,
  Sparkles,
  Zap,
  TrendingUp,
  ArrowRight,
  LogIn,
  MoreHorizontal,
  Plus,
} from "lucide-react";

export default function LandingClientView() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <div className="reveal">
        <Hero />
      </div>
      <div className="reveal">
        <Features />
      </div>
      <div className="reveal">
        <Showcase />
      </div>
      <div className="reveal">
        <Stats />
      </div>
      <div className="reveal">
        <CTA />
      </div>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-2xl gradient-bg flex items-center justify-center shadow-soft transition-transform group-hover:scale-105 group-hover:rotate-3">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-tight">The Atelier</div>
            <div className="text-[10px] tracking-[0.18em] text-muted-foreground font-medium">
              PROJECT STUDIO
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="hover:text-foreground transition-colors"
          >
            Showcase
          </a>
          <a href="#stats" className="hover:text-foreground transition-colors">
            Why us
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {/* 🚀 Next.js optimization links replacing raw tags */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="h-4 w-4" /> Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 gradient-bg text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-soft hover:shadow-glow transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-20 pb-28 md:pt-28 md:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-soft" />
        <div className="absolute top-40 -right-32 h-112 w-md rounded-full bg-accent blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-4 py-1.5 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" /> New · Calendar view is live
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Plan projects.
            <br />
            <span className="gradient-text">Ship with calm.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            The Atelier is a beautifully simple studio for projects, tasks and
            capsules. Built for creators who like things in order — and on time.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 gradient-bg text-primary-foreground px-7 py-3.5 rounded-2xl text-sm font-semibold shadow-soft hover:shadow-glow transition-all active:scale-95"
            >
              Create your studio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-card border border-border hover:border-primary/40 transition-colors"
            >
              See it in action
            </a>
          </div>
          <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-success" /> Free to start
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-success" /> No credit card
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 gradient-bg opacity-20 blur-3xl rounded-[3rem]" />
          <HeroMock />
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative bg-card rounded-3xl shadow-glow border border-border p-5 glow-on-hover">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-2xl font-bold">Welcome back, Designer</div>
          <div className="text-sm text-muted-foreground">
            You have{" "}
            <span className="text-primary font-semibold">1 active project</span>{" "}
            today.
          </div>
        </div>
        <div className="hidden sm:flex gap-3">
          <Stat
            icon={<CheckCircle2 className="h-4 w-4 text-success" />}
            label="COMPLETED"
            value="1"
          />
          <Stat
            icon={
              <MoreHorizontal className="h-4 w-4 text-warning-foreground" />
            }
            label="IN PROGRESS"
            value="0"
            tone="warning"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-surface rounded-2xl p-5 border border-border hover:border-primary/40 transition-all hover:-translate-y-1">
          <div className="flex items-start justify-between mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary font-bold flex items-center justify-center">
              P
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="font-bold">Write My Essay</div>
          <div className="text-sm text-muted-foreground mb-5">
            Write a compelling essay on the topic of your choice.
          </div>
          <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
            <span>2/2 tasks done</span>
            <span className="text-primary">100%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-full gradient-bg rounded-full" />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center hover:border-primary/40 hover:bg-primary-soft/30 transition-colors cursor-pointer group">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:gradient-bg transition-all">
            <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" />
          </div>
          <div className="font-semibold">Start New Project</div>
          <div className="text-xs text-muted-foreground">
            Create workspace for your idea
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone = "success",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "success" | "warning";
}) {
  return (
    <div className="rounded-2xl bg-card border border-border px-4 py-3 min-w-28">
      <div className="flex items-center gap-2">
        <span
          className={`h-7 w-7 rounded-lg flex items-center justify-center ${
            tone === "warning" ? "bg-warning/40" : "bg-success/30"
          }`}
        >
          {icon}
        </span>
        <span className="text-[10px] tracking-wider font-bold text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: LayoutGrid,
      title: "Projects, beautifully organized",
      desc: "Create studios for each idea. Track progress with progress bars that actually feel alive.",
    },
    {
      icon: CheckCircle2,
      title: "Tasks that flow",
      desc: "Add to-dos, mark them done, and watch your productivity climb. Priority labels included.",
    },
    {
      icon: CalendarIcon,
      title: "Calendar at a glance",
      desc: "See every deadline on a clean monthly grid. Color-coded by status, never overwhelming.",
    },
    {
      icon: Zap,
      title: "Fast & responsive",
      desc: "Works on the couch, the train, or the desk. Same fluid experience, every screen size.",
    },
  ];
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs tracking-[0.2em] font-bold text-primary mb-3">
            FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need.
            <br />
            <span className="gradient-text">Nothing you don&apos;t.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it: { icon: React.ElementType; title: string; desc: string }) => (
            <div
              key={it.title}
              className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:-translate-y-2 hover:shadow-soft transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-5 group-hover:gradient-bg group-hover:text-primary-foreground transition-all">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="py-24 md:py-32 bg-sidebar-bg">
      <div className="mx-auto max-w-7xl px-6 space-y-28">
        <Row
          eyebrow="TASKS"
          title="A to-do list that actually feels good."
          desc="Strike-throughs, status pills, priority dots — all the little details that make finishing satisfying."
          reverse={false}
        >
          <TasksMock />
        </Row>
        <Row
          eyebrow="CALENDAR"
          title="Your whole month, calm and clear."
          desc="Navigate months with a tap. Upcoming deadlines stay pinned to the side so nothing slips."
          reverse={true}
        >
          <CalendarMock />
        </Row>
      </div>
    </section>
  );
}

function Row({
  eyebrow,
  title,
  desc,
  children,
  reverse,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="space-y-5">
        <div className="text-xs tracking-[0.2em] font-bold text-primary">
          {eyebrow}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

function TasksMock() {
  return (
    <div className="bg-card rounded-3xl border border-border p-5 shadow-card space-y-3 glow-on-hover">
      {[
        { t: "Do the HomeWork", d: "Due: Wed May 20 2026" },
        { t: "Write My Essay", d: "Due: Wed Feb 22 2204" },
      ].map((task: { t: string; d: string }) => (
        <div
          key={task.t}
          className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-primary-soft/40 hover:bg-primary-soft transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full gradient-bg flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="line-through text-muted-foreground min-w-0">
              <div className="font-semibold truncate">{task.t}</div>
              <div className="text-xs truncate">{task.d}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-bold tracking-wider bg-success/30 text-success-foreground px-2.5 py-1 rounded-md">
              DONE
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-destructive" /> High
            </span>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-3 gap-3 pt-3">
        <MiniStat
          icon={<Sparkles className="h-4 w-4 text-primary" />}
          value="100%"
          label="Total Productivity"
        />
        <div className="rounded-2xl gradient-bg text-primary-foreground p-4 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-primary-foreground/10" />
          <Zap className="h-4 w-4 mb-3" />
          <div className="text-2xl font-bold">2</div>
          <div className="text-[10px] opacity-90">Tasks Completed</div>
        </div>
        <MiniStat
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          value="2"
          label="High Priority"
        />
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-primary-soft/60 p-4">
      <div className="h-7 w-7 rounded-lg bg-card flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  );
}

function CalendarMock() {
  const days = Array.from({ length: 14 }, (_, i) => 27 + i).map((d: number) =>
    d > 31 ? d - 31 : d,
  );
  return (
    <div className="bg-card rounded-3xl border border-border p-5 shadow-card glow-on-hover">
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl font-bold">May 2026</div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-full gradient-bg text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
            ‹
          </button>
          <button className="h-9 w-9 rounded-full gradient-bg text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-[10px] tracking-wider font-bold text-muted-foreground mb-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d: string) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d: number, i: number) => (
          <div
            key={i}
            className="aspect-square rounded-lg border border-border/60 p-2 text-sm font-bold hover:bg-primary-soft hover:border-primary/40 transition-all cursor-pointer"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { v: "10k+", l: "Projects launched" },
    { v: "120k+", l: "Tasks completed" },
    { v: "99.9%", l: "Uptime" },
    { v: "4.9★", l: "User rating" },
  ];
  return (
    <section id="stats" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s: { v: string; l: string }) => (
            <div
              key={s.l}
              className="rounded-3xl p-8 bg-card border border-border hover:gradient-bg group-hover:text-white transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary group-hover:text-white transition-all duration-500">
                {s.v}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 mt-2 font-medium">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-bg p-12 md:p-20 text-center text-primary-foreground shadow-glow">
          <div
            aria-hidden
            className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl animate-pulse-soft"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl animate-pulse-soft"
          />
          <div className="relative">
            <Sparkles className="h-8 w-8 mx-auto mb-5 animate-float" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              Your studio, ready in seconds.
            </h2>
            <p className="text-primary-foreground/85 text-lg max-w-xl mx-auto mb-8">
              Start free. Add your first project. Get a calmer week.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-4 rounded-2xl text-sm font-bold hover:scale-105 active:scale-95 transition-transform shadow-soft"
            >
              Create your free studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-bg flex items-center justify-center">
            <Compass className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">The Atelier</span>
          <span>· © {new Date().getFullYear()}</span>
          <p>Developed By</p>
          <Link
            href="https://github.com/Wesam-Harb"
            className="hover:text-foreground transition-colors"
          >
            Wesam Harb
          </Link>
        </div>
        <div className="flex gap-6">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="hover:text-foreground transition-colors"
          >
            Showcase
          </a>
          <Link
            href="/login"
            className="hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
