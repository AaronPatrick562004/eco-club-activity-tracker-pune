import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  School,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  Hash,
  Users,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { DIVISION_DATA, GoverningBody, type Division } from "../lib/division";
import schoolsData from "../data/schools.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/divisions")({
  component: DivisionPage,
});

const DIVISIONS = [
  { region: "PMC", count: "41 Divisions", note: "Pune Municipal Corporation" },
  { region: "PCMC", count: "26 Divisions", note: "Pimpri-Chinchwad Municipal Corporation" },
  {
    region: "Rural",
    count: "13 Talukas",
    note: "Haveli, Mulshi, Maval, Bhor, Velhe, Khed, Ambegaon, Junnar, Purandar, Shirur, Daund, Indapur, Baramati",
  },
];

const MARATHI_KRAMANK: Record<string, string> = {
  A: "अ", B: "ब", C: "क", D: "ड", E: "इ", F: "फ", G: "ग", H: "ह",
  I: "ई", J: "ज", K: "क", L: "ल", M: "म", N: "न", O: "ओ", P: "प",
  Q: "क्यू", R: "र", S: "स", T: "ट", U: "उ", V: "व", W: "व", X: "क्ष",
  Y: "य", Z: "झ",
  1: "१", 2: "२", 3: "३", 4: "४", 5: "५",
  6: "६", 7: "७", 8: "८", 9: "९", 0: "०",
};

const toMarathiKramank = (kramank: string) =>
  kramank.split("").map((c) => MARATHI_KRAMANK[c.toUpperCase()] || c).join("");

type School = {
  name: string;
  students: number;
  activities: number;
  address?: string;
  udise: string;
  ecoClubActive: boolean;
  principal?: string;
  contact?: string;
  email?: string;
  medium?: string;
  schoolType?: string;
  wardOfficer?: string;
  complianceScore?: number;
};

const SCHOOLS: Record<string, School[]> = schoolsData;

function DivisionPage() {
  const [body, setBody] = useState<GoverningBody>("PMC");
  const [kramank, setKramank] = useState("");
  const [showSchools, setShowSchools] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedUdise, setExpandedUdise] = useState<string | null>(null);
  const pageSize = 10;

  const divisions = DIVISION_DATA[body];
  const selectedKey = kramank ? `${body}-${kramank}` : "";
  const selectedDivision = divisions.find((d) => d.kramank === kramank);

  const allSchools = selectedKey ? SCHOOLS[selectedKey] || [] : [];

  const filteredSchools = useMemo(() => {
    return allSchools.filter(
      (s) =>
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.udise.includes(search)
    );
  }, [allSchools, search]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);
  const paginatedSchools = filteredSchools.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleViewSchools = () => {
    setShowSchools(true);
    setPage(1);
    setSearch("");
    setExpandedUdise(null);

    // 👇 smooth scroll to results
    setTimeout(() => {
      document
        .getElementById("schools-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header subtitle="Division • Prabhag Mapping" activePath="/divisions" />

      <main className="pt-6 sm:pt-10">
        <section className="bg-secondary/40 py-14 sm:py-20 animate-in fade-in duration-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            
            {/* Header */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Pune Specific
              </p>
              <h1 className="mt-2 text-2xl sm:text-4xl font-bold">
                Division-Wise Segregation
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
                Schools are mapped to their Prabhag Kramank within PMC and PCMC,
                or to their taluka in rural Pune.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {DIVISIONS.map((d) => (
                <div
                  key={d.region}
                  className="rounded-xl border bg-card p-5 shadow transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase">
                      {d.region}
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-bold">{d.count}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.note}
                  </div>
                </div>
              ))}
            </div>

            {/* Selector */}
            <div className="mt-8 rounded-xl border bg-card p-4 sm:p-6 shadow">
              <div className="text-sm font-semibold">
                Find your Division / Taluka
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value as GoverningBody);
                    setKramank("");
                    setShowSchools(false);
                  }}
                  className="h-11 rounded-md border px-3 text-sm"
                >
                  <option value="PMC">PMC - ४१ Divisions</option>
                  <option value="PCMC">PCMC - २६ Divisions</option>
                  <option value="ZP">Rural - १३ Talukas</option>
                </select>

                <select
                  value={kramank}
                  onChange={(e) => {
                    setKramank(e.target.value);
                    setShowSchools(false);
                  }}
                  className="h-11 rounded-md border px-3 text-sm"
                >
                  <option value="">
                    All {body === "ZP" ? "Talukas" : "Divisions"}
                  </option>
                  {divisions.map((d: Omit<Division, "body">) => (
                    <option key={d.kramank} value={d.kramank}>
                      {body === "ZP"
                        ? d.name
                        : `${toMarathiKramank(d.kramank)} - ${d.name}`}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleViewSchools}
                  disabled={!kramank}
                  className="h-11 rounded-md bg-primary text-white text-sm disabled:opacity-50"
                >
                  View Schools
                </button>
              </div>
            </div>

            {/* Schools */}
            {showSchools && (
              <div
                id="schools-section"
                className="mt-6 rounded-xl border bg-card shadow animate-in fade-in slide-in-from-bottom-3"
              >
                <div className="p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <School className="h-5 w-5 text-primary" />
                    Schools in {selectedDivision?.name} ({filteredSchools.length})
                  </h3>

                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-3 w-full h-10 border rounded-md px-3 text-sm"
                  />
                </div>

                <div className="divide-y">
                  {paginatedSchools.map((school) => {
                    const isExpanded = expandedUdise === school.udise;
                    return (
                      <div key={school.udise}>
                        <div
                          onClick={() =>
                            setExpandedUdise(
                              isExpanded ? null : school.udise
                            )
                          }
                          className="p-4 cursor-pointer hover:bg-secondary/30"
                        >
                          <div className="flex justify-between">
                            <div>
                              <div className="font-semibold text-sm flex gap-2">
                                <ChevronDown
                                  className={`h-4 w-4 transition ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                                {school.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {school.udise}
                              </div>
                            </div>
                            <div className="text-primary font-bold">
                              {school.activities}
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 bg-secondary/20 animate-in fade-in">
                            Students: {school.students}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}