import { createFileRoute } from "@tanstack/react-router";
import { MapPin, School, ChevronLeft, ChevronRight, Search, ChevronDown, Hash, Users, Activity, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { DIVISION_DATA, GoverningBody, type Division } from "../lib/division";
import schoolsData from "../data/schools.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/division")({
  component: DivisionPage,
});

const DIVISIONS = [
  { region: "PMC", count: "41 Divisions", note: "Pune Municipal Corporation" },
  { region: "PCMC", count: "26 Divisions", note: "Pimpri-Chinchwad Municipal Corporation" },
  { region: "Rural", count: "13 Talukas", note: "Haveli, Mulshi, Maval, Bhor, Velhe, Khed, Ambegaon, Junnar, Purandar, Shirur, Daund, Indapur, Baramati" },
];

const MARATHI_KRAMANK: Record<string, string> = {
  'A': 'अ', 'B': 'ब', 'C': 'क', 'D': 'ड', 'E': 'इ', 'F': 'फ', 'G': 'ग', 'H': 'ह',
  'I': 'ई', 'J': 'ज', 'K': 'क', 'L': 'ल', 'M': 'म', 'N': 'न', 'O': 'ओ', 'P': 'प',
  'Q': 'क्यू', 'R': 'र', 'S': 'स', 'T': 'ट', 'U': 'उ', 'V': 'व', 'W': 'व', 'X': 'क्ष',
  'Y': 'य', 'Z': 'झ',
  '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९', '0': '०'
};

const toMarathiKramank = (kramank: string) => {
  return kramank.split('').map(char => MARATHI_KRAMANK[char.toUpperCase()] || char).join('');
};

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
  lastActivityDate?: string;
  complianceScore?: number;
};

const SCHOOLS: Record<string, School[]> = schoolsData;

function DivisionPage() {
  const [body, setBody] = useState<GoverningBody>('PCMC');
  const [kramank, setKramank] = useState('');
  const [showSchools, setShowSchools] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [expandedUdise, setExpandedUdise] = useState<string | null>(null);
  const pageSize = 10;

  const divisions = DIVISION_DATA[body];
  const selectedKey = kramank? `${body}-${kramank}` : '';
  const selectedDivision = divisions.find(d => d.kramank === kramank);

  const allSchools = selectedKey? SCHOOLS[selectedKey] || [] : [];

  const filteredSchools = useMemo(() => {
    return allSchools.filter(s =>
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.udise.includes(search)
    );
  }, [allSchools, search]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);
  const paginatedSchools = filteredSchools.slice((page - 1) * pageSize, page * pageSize);

  const handleViewSchools = () => {
    setShowSchools(true);
    setPage(1);
    setSearch('');
    setExpandedUdise(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header subtitle="Division • Prabhag Mapping" activePath="/division" />

      <main className="pt-16">
        <section className="bg-secondary/40 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Pune Specific</p>
              <h1 className="mt-2 text-2xl sm:text-4xl font-bold">Division-Wise Segregation</h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
                Schools are mapped to their Prabhag Kramank (प्रभाग क्रमांक) within PMC and PCMC, or
                to their taluka in rural Pune — enabling ward officers to monitor compliance at the
                most granular level.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {DIVISIONS.map((d) => (
                <div key={d.region} className="rounded-xl border border-border bg-card p-5 shadow-(--shadow-card)">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{d.region}</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold">{d.count}</div>
                  <div className="text-xs text-muted-foreground">{d.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-(--shadow-card) dropdown-container">
              <div className="text-sm font-semibold">Find your Division / Taluka</div>

              {/* ✅ FIXED: items-start + mt-4 moves dropdowns up, removed broken min-h- */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                {/* Governing Body */}
                <div className="relative">
                  <select
                    value={body}
                    onChange={e => {
                      setBody(e.target.value as GoverningBody);
                      setKramank('');
                      setShowSchools(false);
                    }}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="PMC">PMC - ४१ Divisions</option>
                    <option value="PCMC">PCMC - २६ Divisions</option>
                    <option value="ZP">Rural - १३ Talukas</option>
                  </select>
                </div>

                {/* Division / Taluka */}
                <div className="relative">
                  <select
                    value={kramank}
                    onChange={e => {
                      setKramank(e.target.value);
                      setShowSchools(false);
                    }}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">
                      All {body === 'ZP'? 'Talukas' : 'Divisions'}
                    </option>
                    {divisions.map((d: Omit<Division, 'body'>) => (
                      <option key={d.kramank} value={d.kramank}>
                        {body === 'ZP'
                        ? d.name
                          : `${toMarathiKramank(d.kramank)} - ${d.name}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Button */}
                <button
                  onClick={handleViewSchools}
                  disabled={!kramank}
                  className="h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  View Schools
                </button>
              </div>
            </div>

            {showSchools && (
              <div className="mt-6 rounded-xl border border-border bg-card shadow-(--shadow-card)">
                <div className="p-4 sm:p-6 border-b border-border">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <School className="h-5 w-5 text-primary" />
                    Schools in {selectedDivision?.name || `${body}-${kramank}`} ({filteredSchools.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {body === 'ZP'? `Taluka: ${selectedDivision?.name}` : `Prabhag Kramank: ${toMarathiKramank(kramank)}`}
                  </p>

                  <div className="mt-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by name or UDISE..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); setExpandedUdise(null); }}
                      className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {paginatedSchools.length > 0? (
                  <>
                    <div className="divide-y divide-border">
                      {paginatedSchools.map((school) => {
                        const isExpanded = expandedUdise === school.udise;
                        return (
                          <div key={school.udise}>
                            <div
                              className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                              onClick={() => setExpandedUdise(isExpanded? null : school.udise)}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm flex items-center gap-2">
                                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded? 'rotate-180' : ''}`} />
                                    {school.name}
                                    {school.ecoClubActive && (
                                      <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3" /> Active
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 text-xs text-muted-foreground pl-6">
                                    UDISE: {school.udise} • {school.students} students {school.address && `• ${school.address}`}
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-lg font-bold text-primary">{school.activities}</div>
                                  <div className="text-xs text-muted-foreground">activities</div>
                                </div>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="px-4 pb-4 bg-secondary/20">
                                <div className="ml-6 pt-3 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-muted-foreground">UDISE:</span>
                                    <span className="font-medium">{school.udise}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-muted-foreground">Students:</span>
                                    <span className="font-medium">{school.students.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-muted-foreground">Activities:</span>
                                    <span className="font-medium">{school.activities}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-muted-foreground">Eco Club:</span>
                                    <span className="font-medium">{school.ecoClubActive? 'Active' : 'Inactive'}</span>
                                  </div>

                                  {school.address && (
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span className="text-muted-foreground">Address:</span>
                                      <span className="font-medium">{school.address}</span>
                                    </div>
                                  )}
                                  {school.principal && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Principal:</span>
                                      <span className="font-medium">{school.principal}</span>
                                    </div>
                                  )}
                                  {school.contact && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Contact:</span>
                                      <span className="font-medium">{school.contact}</span>
                                    </div>
                                  )}
                                  {school.email && (
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                      <span className="text-muted-foreground">Email:</span>
                                      <span className="font-medium break-all">{school.email}</span>
                                    </div>
                                  )}
                                  {school.medium && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Medium:</span>
                                      <span className="font-medium">{school.medium}</span>
                                    </div>
                                  )}
                                  {school.schoolType && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Type:</span>
                                      <span className="font-medium">{school.schoolType}</span>
                                    </div>
                                  )}
                                  {school.wardOfficer && (
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                      <span className="text-muted-foreground">Ward Officer:</span>
                                      <span className="font-medium">{school.wardOfficer}</span>
                                    </div>
                                  )}
                                  {school.complianceScore!== undefined && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Compliance:</span>
                                      <span className="font-medium">{school.complianceScore}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-between border-t border-border p-4">
                        <button
                          onClick={() => { setPage(p => Math.max(1, p - 1)); setExpandedUdise(null); }}
                          disabled={page === 1}
                          className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
                        >
                          <ChevronLeft className="h-4 w-4" /> Prev
                        </button>
                        <span className="text-sm text-muted-foreground">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          onClick={() => { setPage(p => Math.min(totalPages, p + 1)); setExpandedUdise(null); }}
                          disabled={page === totalPages}
                          className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
                        >
                          Next <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    {search? 'No schools match your search.' : 'No schools found for this Division yet.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}