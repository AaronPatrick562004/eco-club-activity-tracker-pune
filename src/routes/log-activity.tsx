import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Camera, Upload, Calendar, Users, CheckCircle2, ArrowLeft, MapPin, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/log-activity")({
  component: LogActivityPage,
  validateSearch: (search) => ({
    activity: search.activity as string | undefined,
  }),
});

const ACTIVITY_LABELS: Record<string, string> = {
  tree: "Tree Plantation & Nurturing",
  waste: "Waste Segregation & Recycling",
  plastic: "Plastic-Free Campus",
  water: "Water Conservation",
  energy: "Energy Saving Practices",
  clean: "Cleanliness Drives",
  bio: "Biodiversity Awareness",
  nature: "Nature Walks / Eco Trails",
  days: "Environmental Day Celebrations",
  compost: "Composting / Kitchen Garden",
};

function LogActivityPage() {
  const navigate = useNavigate();
  const { activity } = useSearch({ from: "/log-activity" });
  const [submitted, setSubmitted] = useState(false);
  const [auth, setAuth] = useState<any>(null);
  
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    students: "",
    description: "",
    location: "",
    photos: [] as File[],
  });

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      navigate({ to: "/login", search: { activity, returnTo: "/log-activity" } });
      return;
    }
    setAuth(JSON.parse(authData));
  }, [activity, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - replace with API call later
    const submission = {
      activity,
      schoolUdise: auth?.data?.udise,
      schoolName: auth?.data?.name,
     ...form,
      timestamp: new Date().toISOString(),
    };
    
    console.log("Submitting:", submission);
    
    // Store in localStorage for demo - replace with API
    const existing = JSON.parse(localStorage.getItem("activityLogs") || "[]");
    localStorage.setItem("activityLogs", JSON.stringify([...existing, submission]));
    
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/activities" }), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({...form, photos: Array.from(e.target.files) });
    }
  };

  if (!auth) return null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md text-center p-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Activity Logged!</h2>
          <p className="text-muted-foreground">
            Your submission has been sent to the Ward Officer for verification.
          </p>
          <p className="text-xs text-muted-foreground mt-4">Redirecting...</p>
        </Card>
      </div>
    );
  }

  const schoolName = auth.data?.name || "Unknown School";
  const udise = auth.data?.udise || "";

  return (
    <div className="min-h-screen bg-background">
      <Header subtitle="Log Activity" activePath="/activities" />
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <button
          onClick={() => navigate({ to: "/activities" })}
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Activities
        </button>
        
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">Log Activity</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {ACTIVITY_LABELS[activity || "tree"]}
                </p>
              </div>
              <Badge variant="secondary">{udise}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">School: {schoolName}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4" /> Activity Date *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4" /> Students Participated *
                </label>
                <input
                  type="number"
                  value={form.students}
                  onChange={(e) => setForm({...form, students: e.target.value })}
                  placeholder="e.g. 45"
                  min="1"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" /> Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value })}
                  placeholder="e.g. School campus, Vetal Tekdi, etc."
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4" /> Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value })}
                  placeholder="Describe what was done, impact, challenges..."
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Camera className="h-4 w-4" /> Upload Photos (Geo-tagged) *
                </label>
                <label className="border-2 border-dashed border-input rounded-md p-6 text-center block cursor-pointer hover:bg-muted/50 transition">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {form.photos.length > 0 
                    ? `${form.photos.length} file(s) selected` 
                      : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB each. Include before/after photos.
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                {form.photos.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {form.photos.map((f, i) => (
                      <div key={i}>✓ {f.name}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground">
                <strong>Note:</strong> Submissions are reviewed by your Ward Officer. Ensure photos are geo-tagged 
                and clearly show the activity. False reporting may lead to suspension.
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Submit Activity Log
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}