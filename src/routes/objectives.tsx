import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Sprout, Users, TreePine, Target, ChevronDown, CheckCircle2, BookOpen, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute('/objectives')({
  component: ObjectivesPage,
})

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

function ObjectivesPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header activePath="/objectives" />

      {/* mt-16 offsets the fixed h-16 header */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6 pt-6 pb-6 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-16 mt-16">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-xl leading-tight sm:text-2xl lg:text-4xl font-bold">
            Eco-Club Objectives
          </h1>
          <p className="mt-2 sm:mt-3 max-w- mx-auto text-xs sm:text-sm text-muted-foreground">
            Five core goals mandated by the Government Resolution dated 09 February 2026 for all PMC,
            PCMC, and rural taluka schools. Tap a card to see implementation details, targets, and metrics.
          </p>
          <Badge variant="secondary" className="mt-2 sm:mt-3 text- sm:text-xs">
            Tracking 2,340 schools across Pune district
          </Badge>
        </div>

        <div className="space-y-2.5 sm:space-y-3 w-full max-w-5xl mx-auto">
          {OBJECTIVES.map((obj) => {
            const Icon = obj.icon;
            const isOpen = openId === obj.id;
            const contentId = `obj-content-${obj.id}`;

            return (
              <Card
                key={obj.id}
                className={cn(
                  "transition-shadow hover:shadow-md",
                  isOpen && "ring-2 ring-primary"
                )}
              >
                <button
                  className="w-full text-left min-h-11"
                  onClick={() => setOpenId(isOpen? null : obj.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold">
                          <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 hidden min-:block" />
                          <span className="min-:hidden">{obj.id}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-sm sm:text-base lg:text-lg mb-0.5 break-words leading-snug">
                            {obj.title}
                          </CardTitle>
                          <p className="text- sm:text-xs text-muted-foreground line-clamp-2">
                            {obj.short}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-transform shrink-0 mt-0.5",
                        isOpen && "rotate-180"
                      )} />
                    </div>
                  </CardHeader>
                </button>

                {isOpen && (
                  <CardContent
                    id={contentId}
                    className="pt-0 px-3 pb-3 sm:px-4 sm:pb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:pl-3 lg:pl-12">
                      <div>
                        <h4 className="font-semibold text- sm:text-xs mb-1 sm:mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" /> Description
                        </h4>
                        <p className="text- sm:text-xs text-muted-foreground leading-relaxed break-words">
                          {obj.description}
                        </p>

                        <h4 className="font-semibold text- sm:text-xs mb-1 sm:mb-1.5 mt-2.5 sm:mt-3 flex items-center gap-1.5">
                          <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" /> 2026 Target
                        </h4>
                        <p className="text- sm:text-xs font-medium text-primary break-words">
                          {obj.target}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text- sm:text-xs mb-1 sm:mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" /> Key Activities
                        </h4>
                        <ul className="space-y-0.5 sm:space-y-1">
                          {obj.keyActivities.map((act, i) => (
                            <li key={i} className="text- sm:text-xs text-muted-foreground flex gap-1 sm:gap-1.5">
                              <span className="text-primary shrink-0">•</span>
                              <span className="break-words">{act}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-semibold text- sm:text-xs mb-1 sm:mb-1.5 mt-2.5 sm:mt-3 flex items-center gap-1.5">
                          <BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" /> Tracking Metrics
                        </h4>
                        <p className="text- sm:text-xs text-muted-foreground break-words">
                          {obj.metrics}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 max-w- mx-auto text-center p-3 sm:p-5 rounded-xl bg-secondary/40 border">
          <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-1.5">GR Reference</h3>
          <p className="text- sm:text-xs text-muted-foreground">
            Government Resolution No: EDU-2026/CR-45/SM-3 dated 09 February 2026 mandates all schools
            to establish functional Eco-Clubs and report activities monthly via digital platform.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}