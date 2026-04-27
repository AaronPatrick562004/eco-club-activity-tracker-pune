import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Sprout, Users, TreePine, Target, ChevronDown, CheckCircle2, BookOpen, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/objectives")({
  component: Objectives,
});


const OBJECTIVES = [
  {
    id: 1,
    icon: Leaf,
    title: "Develop environmental awareness among Pune students",
    short: "Build eco-consciousness through curriculum and activities",
    description: "Foster understanding of local environmental issues like Mula-Mutha river pollution, urban heat islands in PMC, and deforestation in Western Ghats talukas.",
    keyActivities: [
      "Weekly eco-periods in school timetable",
      "Guest lectures by MPCB & Pune NGOs",
      "Field visits to Katraj Zoo, Empress Garden, ARAI Hills",
      "Wall magazines on local biodiversity"
    ],
    target: "100% schools conducting monthly awareness sessions",
    metrics: "Pre/post awareness quizzes, student participation %"
  },
  {
    id: 2,
    icon: Sprout,
    title: "Promote sustainable habits and responsible behaviour",
    short: "Instill daily eco-friendly practices in students & staff",
    description: "Translate awareness into action through measurable behaviour change: waste segregation, water conservation, energy saving, and reduced plastic use.",
    keyActivities: [
      "No-plastic zones in school premises",
      "Class-wise electricity monitors",
      "Rainwater harvesting pit maintenance by students",
      "Composting of mid-day meal waste"
    ],
    target: "50% reduction in school waste to landfill by Dec 2026",
    metrics: "Kg waste composted/month, Units electricity saved, Litres water saved"
  },
  {
    id: 3,
    icon: Users,
    title: "Encourage participation in conservation activities",
    short: "Hands-on engagement in tree plantation, clean-ups, audits",
    description: "Move beyond classroom to community action. Each student must participate in minimum 2 field activities per year.",
    keyActivities: [
      "Vruksh Dindi: 10 lakh tree plantation drive",
      "Mula-Mutha river cleaning campaigns",
      "School energy & water audits by students",
      "Bird-watching at Vetal Tekdi, Taljai Hills"
    ],
    target: "48,500 students × 2 activities = 97,000 actions/year",
    metrics: "No. of trees planted, Kg waste collected, Audit reports submitted"
  },
  {
    id: 4,
    icon: TreePine,
    title: "Connect students with local Pune ecosystems",
    short: "Build pride and knowledge of Sahyadri biodiversity",
    description: "Pune district spans urban PMC to biodiversity hotspots like Bhimashankar & Tamhini. Students must understand and protect their immediate environment.",
    keyActivities: [
      "Adopt-a-tekdi program for schools near hills",
      "Study local flora: medicinal plants in school gardens",
      "Document local birds/butterflies via iNaturalist",
      "Partner with PMC Garden Dept for Prabhag projects"
    ],
    target: "Each school maps 5 local species, adopts 1 green space",
    metrics: "Species documented, Sq.m green space maintained"
  },
  {
    id: 5,
    icon: Target,
    title: "Support Mission LIFE goals at school level",
    short: "Align school activities with national LiFE themes",
    description: "As per MoEF&CC Mission LIFE, schools contribute to 7 themes: Save Energy, Save Water, Say No to SUP, Reduce Waste, Reduce E-waste, Healthy Lifestyles, Adopt Sustainable Food.",
    keyActivities: [
      "Energy: LED bulb distribution, solar projects",
      "Water: Fix leaking taps, greywater reuse",
      "Waste: Cloth bag making, e-waste collection drives",
      "Food: Millet promotion, kitchen gardens"
    ],
    target: "All 2,340 schools report on 7 LiFE themes monthly",
    metrics: "LiFE theme-wise activity count, photos uploaded to portal"
  },
];

function Objectives() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activePath="/objectives" />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold">Eco-Club Objectives</h1>
          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground">
            Five core goals mandated by the Government Resolution dated 09 February 2026 for all PMC, 
            PCMC, and rural taluka schools. Click a card to see implementation details, targets, and metrics.
          </p>
          <Badge variant="secondary" className="mt-4">
            Tracking 2,340 schools across Pune district
          </Badge>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto">
          {OBJECTIVES.map((obj) => {
            const Icon = obj.icon;
            const isOpen = openId === obj.id;
            
            return (
              <Card 
                key={obj.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  isOpen && "ring-2 ring-primary"
                )}
                onClick={() => setOpenId(isOpen ? null : obj.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {obj.id}
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl mb-1">{obj.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{obj.short}</p>
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                      isOpen && "rotate-180"
                    )} />
                  </div>
                </CardHeader>
                
                {isOpen && (
                  <CardContent className="pt-0 animate-in fade-in slide-in-from-top-2">
                    <div className="grid md:grid-cols-2 gap-6 pl-16">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" /> Description
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
                        
                        <h4 className="font-semibold text-sm mb-2 mt-4 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" /> 2026 Target
                        </h4>
                        <p className="text-sm font-medium text-primary">{obj.target}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" /> Key Activities
                        </h4>
                        <ul className="space-y-1.5">
                          {obj.keyActivities.map((act, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-primary">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-sm mb-2 mt-4 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-primary" /> Tracking Metrics
                        </h4>
                        <p className="text-sm text-muted-foreground">{obj.metrics}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center p-6 rounded-xl bg-secondary/40 border">
          <h3 className="font-semibold mb-2">GR Reference</h3>
          <p className="text-sm text-muted-foreground">
            Government Resolution No: EDU-2026/CR-45/SM-3 dated 09 February 2026 mandates all schools 
            to establish functional Eco-Clubs and report activities monthly via digital platform.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}