import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Leaf, User, Shield, LogIn } from "lucide-react";
import { useState } from "react";
import schoolsData from "../data/schools.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search) => ({
    activity: search.activity as string | undefined,
    returnTo: search.returnTo as string | undefined,
  }),
});

type AccountType = "school" | "officer";

type School = {
  name: string;
  udise: string;
  ecoClubActive: boolean;
};

const SCHOOLS: Record<string, School[]> = schoolsData;
const allSchools = Object.values(SCHOOLS).flat();

function LoginPage() {
  const [accountType, setAccountType] = useState<AccountType>("school");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { activity, returnTo } = useSearch({ from: "/login" });

  const redirectAfterLogin = () => {
    if (returnTo === "/log-activity" && activity) {
      navigate({ to: "/log-activity", search: { activity } });
    } else {
      navigate({ to: '/' });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (accountType === "school") {
      const school = allSchools.find(s => s.udise === identifier);
      if (!school) {
        setError("UDISE code not found");
        return;
      }
      if (password!== "eco123") {
        setError("Incorrect password");
        return;
      }
      localStorage.setItem("auth", JSON.stringify({ type: "school", data: school }));
      redirectAfterLogin();
    } else {
      if (password!== "admin123") {
        setError("Incorrect password");
        return;
      }
      localStorage.setItem("auth", JSON.stringify({ type: "officer", data: { id: identifier } }));
      redirectAfterLogin();
    }
  };

  const handleQuickDemo = (type: AccountType) => {
    if (type === "school") {
      localStorage.setItem("auth", JSON.stringify({ 
        type: "school", 
        data: allSchools[0] 
      }));
    } else {
      localStorage.setItem("auth", JSON.stringify({ 
        type: "officer", 
        data: { id: "PMC-WARD-01" } 
      }));
    }
    redirectAfterLogin();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header subtitle="Login" activePath="/login" />
      
      <main className="pt-16">
        <section className="mx-auto max-w-md px-4 py-20">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Pune Eco-Club Tracker</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your dashboard
              {activity && (
                <span className="block mt-1 text-primary font-medium">
                  Logging: {activity}
                </span>
              )}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 rounded-xl border border-border bg-card p-6 shadow-(--shadow-card)">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium">Account Type</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setAccountType("school"); setIdentifier(""); setError(""); }}
                    className={`rounded-lg border p-3 text-center transition ${
                      accountType === "school"
                   ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <User className="mx-auto h-5 w-5" />
                    <div className="mt-1 text-xs font-semibold">School</div>
                    <div className="text-xs text-muted-foreground">School Dashboard</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAccountType("officer"); setIdentifier(""); setError(""); }}
                    className={`rounded-lg border p-3 text-center transition ${
                      accountType === "officer"
                   ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <Shield className="mx-auto h-5 w-5" />
                    <div className="mt-1 text-xs font-semibold">Officer</div>
                    <div className="text-xs text-muted-foreground">Admin Dashboard</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium">
                  {accountType === "school"? "UDISE Code" : "Officer ID"}
                </label>
                <input
                  type="text"
                  placeholder={accountType === "school"? "e.g. 27251101001" : "e.g. PMC-WARD-05"}
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="mt-1 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mt-3 text-xs text-red-600">{error}</div>
            )}

            <button
              type="submit"
              className="mt-4 w-full h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In as {accountType === "school"? "School" : "Officer"}
            </button>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-3">
                Quick Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("school")}
                  className="h-10 rounded-md border border-border text-xs font-medium hover:bg-secondary"
                >
                  School Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("officer")}
                  className="h-10 rounded-md border border-border text-xs font-medium hover:bg-secondary"
                >
                  Officer Demo
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}