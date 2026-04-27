import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { BarChart3, Users, Leaf, TrendingUp, MapPin, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import schoolsJson from "@/data/schools.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

type School = {
  name: string;
  students: number;
  activities: number;
  address?: string;
  udise: string;
  ecoClubActive: boolean;
};

type SchoolsData = {
  PMC: School[];
  PCMC: School[];
  Rural: School[];
};

function Dashboard() {
  const data: SchoolsData = useMemo(() => {
    const grouped: SchoolsData = { PMC: [], PCMC: [], Rural: [] };

    Object.entries(schoolsJson).forEach(([key, schools]) => {
      if (!Array.isArray(schools)) return;

      if (key.startsWith("PMC")) {
        grouped.PMC.push(...(schools as School[]));
      } else if (key.startsWith("PCMC")) {
        grouped.PCMC.push(...(schools as School[]));
      } else {
        grouped.Rural.push(...(schools as School[]));
      }
    });

    return grouped;
  }, []);

  const stats = useMemo(() => {
    const allSchools = [...data.PMC,...data.PCMC,...data.Rural];
    const activeClubs = allSchools.filter(s => s.ecoClubActive);
    const totalStudents = allSchools.reduce((sum, s) => sum + s.students, 0);
    const totalActivities = allSchools.reduce((sum, s) => sum + s.activities, 0);

    return {
      totalSchools: allSchools.length,
      activeClubs: activeClubs.length,
      compliance: allSchools.length? Math.round((activeClubs.length / allSchools.length) * 100) : 0,
      totalStudents,
      totalActivities,
      avgActivities: activeClubs.length? (totalActivities / activeClubs.length).toFixed(1) : 0,
    };
  }, [data]);

  const regionData = [
    { name: "PMC", schools: data.PMC.length, active: data.PMC.filter(s => s.ecoClubActive).length },
    { name: "PCMC", schools: data.PCMC.length, active: data.PCMC.filter(s => s.ecoClubActive).length },
    { name: "Rural", schools: data.Rural.length, active: data.Rural.filter(s => s.ecoClubActive).length },
  ];

  const pieData = [
    { name: "Active Eco-Clubs", value: stats.activeClubs, color: "#22c55e" },
    { name: "Inactive", value: stats.totalSchools - stats.activeClubs, color: "#e5e7eb" },
  ];

  const topSchools = useMemo(() => {
    return [...data.PMC,...data.PCMC,...data.Rural]
    .filter(s => s.ecoClubActive)
    .sort((a, b) => b.activities - a.activities)
    .slice(0, 5);
  }, [data]);

  const getRegion = (school: School): string => {
    if (data.PMC.includes(school)) return "PMC";
    if (data.PCMC.includes(school)) return "PCMC";
    return "Rural";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Pune Eco-Club Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Live tracking of Mission LIFE activities across PMC, PCMC & Rural Pune schools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSchools}</div>
              <p className="text-xs text-muted-foreground">{stats.totalStudents.toLocaleString()} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Eco-Clubs</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeClubs}</div>
              <p className="text-xs text-muted-foreground">{stats.compliance}% compliance rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Activities Logged</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
              <p className="text-xs text-muted-foreground">{stats.avgActivities} avg per school</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mission LIFE Portal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <a
                href="https://missionlife.moef.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-primary hover:underline"
              >
                Open ↗
              </a>
              <p className="text-xs text-muted-foreground">Official submissions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Region-wise Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="schools" fill="hsl(var(--muted))" name="Total Schools" />
                  <Bar dataKey="active" fill="hsl(var(--primary))" name="Active Clubs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eco-Club Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Performing Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Rank</th>
                    <th className="text-left py-3 px-2 font-medium">School Name</th>
                    <th className="text-left py-3 px-2 font-medium">Region</th>
                    <th className="text-left py-3 px-2 font-medium">Students</th>
                    <th className="text-left py-3 px-2 font-medium">Activities</th>
                    <th className="text-left py-3 px-2 font-medium">UDISE</th>
                  </tr>
                </thead>
                <tbody>
                  {topSchools.map((school, idx) => (
                    <tr key={school.udise} className="border-b last:border-0">
                      <td className="py-3 px-2 font-medium">#{idx + 1}</td>
                      <td className="py-3 px-2">{school.name}</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                          <MapPin className="h-3 w-3" /> {getRegion(school)}
                        </span>
                      </td>
                      <td className="py-3 px-2">{school.students.toLocaleString()}</td>
                      <td className="py-3 px-2 font-semibold text-primary">{school.activities}</td>
                      <td className="py-3 px-2 text-muted-foreground">{school.udise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}