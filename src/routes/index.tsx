import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  Sprout,
  CalendarDays,
  Award,
  ChevronRight,
  FileText,
  BarChart3,
  Network,
  MapPin,
  Download,
} from "lucide-react";
import heroImg from "@/assets/st-vincents.jpg";
import studentsImg from "@/assets/pune-students.jpg";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

const STATS = [
  { label: "Schools Registered", value: "2,340", icon: Leaf },
  { label: "Active Eco-Clubs", value: "1,820", icon: Sprout },
  { label: "Activities This Month", value: "642", icon: CalendarDays },
  { label: "Students Engaged", value: "48,500", icon: Award },
];

const SYSTEM = [
  {
    icon: FileText,
    title: "Digital Activity Logging",
    body: "Schools log every activity with date, description, student count, and photo evidence directly on the platform.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    body: "Prabhag-wise and taluka-wise dashboards showing completion rates, participation trends, and ward comparisons.",
  },
  {
    icon: Network,
    title: "Hierarchical Monitoring",
    body: "Ward Officers (PMC/PCMC), Block Education Officers, and District Officials each get tailored dashboards.",
  },
  {
    icon: Award,
    title: "Recognition & Ranking",
    body: "Automatic scoring of eco-clubs by activity frequency, student participation, and diversity of activities.",
  },
];

const STAKEHOLDERS = [
  {
    title: "School Coordinators",
    body: "Log activities, upload photos, manage student volunteers, track monthly compliance.",
  },
  {
    title: "Prabhag / Ward Officers",
    body: "Monitor schools within their Prabhag, view ward-level analytics, identify gaps.",
  },
  {
    title: "Block & District Officials",
    body: "Access district-wide analytics, generate reports, recognise top-performing eco-clubs.",
  },
];

function Index() {
  const handleComingSoon = (feature: string) => {
    alert(`${feature} page is under construction. Check back soon!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activePath="/" />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-16">
        <img src={heroImg} alt="Aerial view of a green school campus in Pune with students tending gardens" width={1920} height={1024} loading="eager" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/15 via-black/5 to-black/15" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:py-32 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">
            <Leaf className="h-3 w-3" /> Mission LIFE • Lifestyle for Environment
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            Pune Eco-Club<br />Activity Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/90">
            A digital platform built for Pune district — PMC, PCMC and rural talukas — to
            monitor, track and celebrate Eco-Club activities across every Prabhag and school.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 max-w-4xl">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div 
                key={label} 
                className="rounded-xl bg-black/50 backdrop-blur-md border border-white/20 p-4 sm:p-5 shadow-lg ring-1 ring-black/5 hover:bg-black/60 transition"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-white/90 leading-tight">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Government Proposal</p>
        <h2 className="mt-2 text-2xl sm:text-4xl font-bold">Digital Tracking Framework for Pune Eco-Clubs</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
          As per the Government Resolution dated 09 February 2026, this platform proposes a
          unified digital system to track Eco-Club activities across all government, aided and
          unaided schools in Pune district — segregated by Prabhag (ward) for PMC & PCMC and
          by taluka for rural areas.
        </p>
      </section>

      {/* QUICK NAV CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/objectives" className="rounded-xl border border-border bg-card p-6 shadow-(--shadow-card) hover:border-primary/50 hover:-translate-y-0.5 transition">
            <Sprout className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Eco-Club Objectives</h3>
            <p className="mt-2 text-sm text-muted-foreground">5 core goals driving Mission LIFE in Pune schools</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">View Objectives <ChevronRight className="ml-1 h-4 w-4" /></span>
          </Link>
          <Link to="/activities" className="rounded-xl border border-border bg-card p-6 shadow-(--shadow-card) hover:border-primary/50 hover:-translate-y-0.5 transition">
            <Leaf className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Mandated Activities</h3>
            <p className="mt-2 text-sm text-muted-foreground">10 activity categories schools must track monthly</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">View Activities <ChevronRight className="ml-1 h-4 w-4" /></span>
          </Link>
          <Link to="/divisions" className="rounded-xl border border-border bg-card p-6 shadow-(--shadow-card) hover:border-primary/50 hover:-translate-y-0.5 transition">
            <MapPin className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Division Mapping</h3>
            <p className="mt-2 text-sm text-muted-foreground">Find schools by PMC/PCMC ward or rural taluka</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">View Divisions <ChevronRight className="ml-1 h-4 w-4" /></span>
          </Link>
        </div>
      </section>

      {/* SYSTEM */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <h3 className="text-center text-xl sm:text-2xl font-bold">Proposed Tracking System</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {SYSTEM.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-(--shadow-card)">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-semibold">{title}</h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STAKEHOLDERS */}
      <section className="bg-secondary/40 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform Preview</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold">Built for Every Stakeholder</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              From school coordinators logging activities to ward officers analysing Prabhag-level
              trends, the platform serves every level of Pune's education hierarchy.
            </p>
            <div className="mt-6 space-y-3">
              {STAKEHOLDERS.map((s) => (
                <details key={s.title} className="group rounded-lg border border-border bg-card p-4 open:shadow-(--shadow-card)">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold min-h-">
                    {s.title}
                    <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="order-first lg:order-last">
            <img src={studentsImg} alt="Pune school students planting a sapling together" width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-2xl object-cover shadow-(--shadow-soft)" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-14 sm:py-20 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h3 className="text-2xl sm:text-4xl font-bold">Ready to Roll Out Across Pune?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/90">
            This proposal outlines a complete, Prabhag-aware digital framework for tracking
            Eco-Club activities across PMC, PCMC and rural Pune schools.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-green-700 shadow-lg hover:bg-white/90 transition"
            >
              <BarChart3 className="h-4 w-4" /> View Full Dashboard
            </Link>

            <a
              href="/pdfs/Proposal-PDF.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <Download className="h-4 w-4" /> Download Proposal PDF
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}