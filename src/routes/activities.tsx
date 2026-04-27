import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Leaf, Recycle, Ban, Droplets, Zap, Sparkles, Bug, Footprints, 
  CalendarDays, Sprout, ChevronDown, Target, BookOpen, CheckCircle2, 
  Camera, Users, X 
} from "lucide-react";
import { useMemo } from "react";
import schoolsData from "@/data/schools.json";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activities")({
  component: ActivitiesPage,
});

type School = {
  name: string;
  students: number;
  activities: number;
  address?: string;
  udise: string;
  ecoClubActive: boolean;
};

const SCHOOLS: Record<string, School[]> = schoolsData;

const ACTIVITY_DEFS = [
  { 
    id: "tree", 
    icon: Leaf, 
    label: "Tree Plantation & Nurturing",
    description: "Plant and maintain native saplings on campus and in community spaces",
    guidelines: [
      "Use native species: Neem, Peepal, Banyan, Gulmohar",
      "Maintain survival register with photos every 3 months",
      "Partner with PMC Garden Dept for saplings",
      "Minimum 10 saplings per 100 students per year"
    ],
    examples: [
      "Vruksh Dindi: Monsoon plantation drive",
      "Adopt-a-tekdi near school",
      "Medicinal plant garden creation"
    ],
    evidence: "Geo-tagged photo before/after, GPS location, student count",
    target: "10 lakh trees across Pune district by Dec 2026"
  },
  { 
    id: "waste", 
    icon: Recycle, 
    label: "Waste Segregation & Recycling",
    description: "Implement 3-bin system: wet, dry, hazardous. Track waste diverted from landfill",
    guidelines: [
      "Color-coded bins in every classroom",
      "Student 'Green Marshals' monitor segregation",
      "Tie-up with SWaCH or local recyclers",
      "Monthly waste audit by eco-club"
    ],
    examples: [
      "Paper recycling: old notebooks → new sheets",
      "E-waste collection drives every quarter",
      "Plastic bottle brick projects"
    ],
    evidence: "Kg waste segregated/month, Photos of bins, Recycler receipts",
    target: "50% reduction in school waste to landfill"
  },
  { 
    id: "plastic", 
    icon: Ban, 
    label: "Plastic-Free Campus",
    description: "Eliminate single-use plastic through bans, alternatives, and awareness",
    guidelines: [
      "Ban SUP in canteen: straws, cups, cutlery",
      "Cloth bag distribution to all students",
      "Plastic audit: identify SUP hotspots",
      "Penalty system for SUP violations"
    ],
    examples: [
      "Steel tiffin & bottle campaign",
      "Cloth bag stitching workshop",
      "Plastic-free school exhibition"
    ],
    evidence: "Before/after photos of canteen, Student pledges signed",
    target: "100% SUP-free campuses by March 2026"
  },
  { 
    id: "water", 
    icon: Droplets, 
    label: "Water Conservation",
    description: "Fix leaks, harvest rainwater, reuse greywater, and track consumption",
    guidelines: [
      "Monthly water audit by students",
      "Install water meters in school",
      "Rainwater harvesting pit maintenance",
      "Greywater reuse for gardening"
    ],
    examples: [
      "Drip irrigation for school garden",
      "Leak detection drive with plumber",
      "Save water posters competition"
    ],
    evidence: "Water bill comparison, Litres saved/month, Photos of RWH pits",
    target: "20% reduction in water consumption"
  },
  { 
    id: "energy", 
    icon: Zap, 
    label: "Energy Saving Practices",
    description: "Reduce electricity use via LED, solar, and behaviour change",
    guidelines: [
      "Replace all bulbs with LED",
      "Solar panel installation feasibility study",
      "Class-wise electricity monitors",
      "Switch-off campaign during breaks"
    ],
    examples: [
      "Solar lamp assembly workshop",
      "Energy audit: identify phantom loads",
      "Earth Hour celebration"
    ],
    evidence: "Electricity bill comparison, Units saved, Solar kWh generated",
    target: "15% reduction in electricity consumption"
  },
  { 
    id: "clean", 
    icon: Sparkles, 
    label: "Cleanliness Drives",
    description: "Regular campus and community cleaning campaigns with waste documentation",
    guidelines: [
      "Weekly Shramdaan: 30 min campus cleaning",
      "Adopt nearby public space: bus stop/park",
      "Segregate collected waste during drives",
      "Partner with PMC for waste pickup"
    ],
    examples: [
      "Swachhata Pakhwada participation",
      "Mula-Mutha river bank cleaning",
      "Plastic waste collection marathon"
    ],
    evidence: "Kg waste collected, Before/after photos, Attendance sheet",
    target: "2 drives/month per school"
  },
  { 
    id: "bio", 
    icon: Bug, 
    label: "Biodiversity Awareness",
    description: "Document local flora/fauna, create biodiversity registers, protect habitats",
    guidelines: [
      "Create school biodiversity register",
      "Use iNaturalist app for species ID",
      "Bird-watching club formation",
      "Butterfly garden creation"
    ],
    examples: [
      "Campus tree census with QR codes",
      "Sparrow nest box installation",
      "Local medicinal plant documentation"
    ],
    evidence: "Species count documented, Photos uploaded to iNaturalist",
    target: "50 species documented per school"
  },
  { 
    id: "nature", 
    icon: Footprints, 
    label: "Nature Walks / Eco Trails",
    description: "Experiential learning in local ecosystems: tekdis, rivers, forests",
    guidelines: [
      "Minimum 2 walks/year per eco-club",
      "Partner with Pune NGOs: Ecological Society, BNHS",
      "Student worksheets for observations",
      "Safety: 1 teacher per 10 students"
    ],
    examples: [
      "Vetal Tekdi biodiversity walk",
      "Mula-Mutha river ecosystem study",
      "Tamhini ghat monsoon trek"
    ],
    evidence: "Attendance, Photos, Student observation reports",
    target: "5,000+ students on eco-trails annually"
  },
  { 
    id: "days", 
    icon: CalendarDays, 
    label: "Environmental Day Celebrations",
    description: "Celebrate 15+ environmental days with activities, not just speeches",
    guidelines: [
      "World Environment Day: June 5 - major event",
      "Earth Day, Ozone Day, Wildlife Week, etc",
      "Student-led exhibitions & street plays",
      "Invite local environmentalists"
    ],
    examples: [
      "Plastic-free pledge on Earth Day",
      "Wetland Day: Visit to Pashan Lake",
      "Wildlife Week: Documentary screening"
    ],
    evidence: "Event photos, Student participation count, Press coverage",
    target: "12 days celebrated/year per school"
  },
  { 
    id: "compost", 
    icon: Sprout, 
    label: "Composting / Kitchen Garden",
    description: "Convert mid-day meal waste to compost, grow organic vegetables",
    guidelines: [
      "Install compost pit/bin: 1kg waste/day capacity",
      "Student roster for daily compost turning",
      "Kitchen garden: grow 5+ vegetables",
      "Use compost in school garden"
    ],
    examples: [
      "MDM waste → compost → vegetables → MDM",
      "Vermicomposting unit setup",
      "Seed ball making for monsoon"
    ],
    evidence: "Kg compost produced/month, Photos of garden, Harvest record",
    target: "100% MDM waste composted"
  },
];

function ActivitiesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const allSchools = useMemo(() => Object.values(SCHOOLS).flat(), []);
  const totalActivities = allSchools.reduce((sum, s) => sum + s.activities, 0);
  
  const activitiesWithCounts = ACTIVITY_DEFS.map((a, i) => ({
   ...a,
    count: Math.floor(totalActivities / 10) + (i < totalActivities % 10 ? 1 : 0)
  }));

  const selectedActivity = ACTIVITY_DEFS.find(a => a.id === selectedId);

const handleLogActivity = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    navigate({ 
      to: "/log-activity", 
      search: { activity: selectedId || "tree" } 
    });
  } else {
    navigate({ 
      to: "/login", 
      search: { 
        activity: selectedId || undefined, 
        returnTo: "/log-activity" 
      } 
    });
  }
};

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header subtitle="Activities • Monthly Tracking" activePath="/activities" />

      <main className="pt-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold">Mandated Activities to Track</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Each school must conduct at least one activity per month from the following 10 categories per the GR. 
              Click any activity for guidelines, examples, and evidence requirements.
            </p>
            <Badge variant="secondary" className="mt-4">
              {totalActivities.toLocaleString()} activities logged across {allSchools.length} schools this month
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {activitiesWithCounts.map((act) => {
              const Icon = act.icon;
              const isOpen = selectedId === act.id;
              
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedId(isOpen ? null : act.id)}
                  className={cn(
                    "rounded-lg border border-border bg-card p-3 sm:p-4 text-center shadow-(--shadow-card) transition hover:border-primary/50 hover:-translate-y-0.5",
                    isOpen && "ring-2 ring-primary"
                  )}
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-2 text-xs font-medium leading-snug min-h-10">{act.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{act.count} this month</div>
                </button>
              );
            })}
          </div>

          {selectedActivity && (
            <Card className="mt-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-top-4">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <selectedActivity.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedActivity.label}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedActivity.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="shrink-0 rounded-md p-2 hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" /> Implementation Guidelines
                    </h4>
                    <ul className="space-y-2">
                      {selectedActivity.guidelines.map((g, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold text-sm mb-3 mt-6 flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" /> District Target
                    </h4>
                    <p className="text-sm font-medium text-primary">{selectedActivity.target}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Activity Examples
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {selectedActivity.examples.map((e, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" /> Evidence Required
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                      {selectedActivity.evidence}
                    </p>

                    <button 
                      onClick={handleLogActivity}
                      className="w-full mt-6 h-10 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      <Users className="h-4 w-4 inline mr-2" />
                      Login to Log This Activity
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}