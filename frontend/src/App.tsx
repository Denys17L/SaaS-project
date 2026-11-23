
import { useState } from "react";
import type { ComponentType } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Vote,
  CalendarDays,
  FileText,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ChevronDown,
  Landmark,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import BudgetPage from "./pages/BudgetPage";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Budżet", icon: Wallet },
  { label: "Transakcje", icon: ArrowLeftRight },
  { label: "Propozycje", icon: Vote },
  { label: "Wydarzenia", icon: CalendarDays },
  { label: "Dokumenty", icon: FileText },
  { label: "Raporty", icon: ChartNoAxesCombined },
];

const chartData = [
  { month: "Sty", income: 4200, expenses: 1800 },
  { month: "Lut", income: 5100, expenses: 2400 },
  { month: "Mar", income: 4600, expenses: 2100 },
  { month: "Kwi", income: 6200, expenses: 3200 },
  { month: "Maj", income: 5700, expenses: 2800 },
  { month: "Cze", income: 7200, expenses: 3500 },
  { month: "Lip", income: 6800, expenses: 3100 },
];

const transactions = [
  { title: "Składki członkowskie", category: "Przychód", date: "23.11.2026", amount: "+ 2 400 zł", type: "income" },
  { title: "Materiały promocyjne", category: "Marketing", date: "21.11.2026", amount: "- 650 zł", type: "expense" },
  { title: "Sponsor wydarzenia", category: "Przychód", date: "19.11.2026", amount: "+ 1 500 zł", type: "income" },
  { title: "Wynajem sali", category: "Wydarzenia", date: "17.11.2026", amount: "- 400 zł", type: "expense" },
];

const proposals = [
  { title: "Warsztaty technologiczne", author: "Anna Kowalska", votes: "18 / 25", progress: 72, days: "2 dni" },
  { title: "Zakup sprzętu audio", author: "Piotr Nowak", votes: "12 / 25", progress: 48, days: "4 dni" },
  { title: "Wyjazd integracyjny", author: "Michał Wiśniewski", votes: "9 / 25", progress: 36, days: "6 dni" },
];

function App() {
  const [dark, setDark] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const theme = dark
    ? "bg-[#101D30] text-slate-100"
    : "bg-[#F4F6FA] text-slate-800";

  const panel = dark
    ? "bg-[#182840] border-slate-700"
    : "bg-white border-slate-100";

  const muted = dark ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`min-h-screen ${theme}`}>
      <aside className={`fixed left-0 top-0 z-10 flex h-screen w-64 flex-col border-r ${panel} px-5 py-6`}>
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D3B64] text-white">
            <Landmark size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">CampusDAO</h1>
            <p className={`text-xs ${muted}`}>University Finance</p>
          </div>
        </div>

        <p className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider ${muted}`}>
          Menu główne
        </p>

        <nav className="flex-1 space-y-1">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActivePage(label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                activePage === label
                  ? "bg-[#1D3B64] text-white shadow-md"
                  : dark
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className={`border-t pt-5 ${dark ? "border-slate-700" : "border-slate-100"}`}>
          <button
            onClick={() => setActivePage("Ustawienia")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${muted} hover:bg-slate-500/10`}
          >
            <Settings size={19} />
            Ustawienia
          </button>

          <div className={`mt-5 flex items-center gap-3 rounded-xl p-3 ${dark ? "bg-slate-700/50" : "bg-slate-50"}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCE7F5] font-semibold text-[#1D3B64]">
              DL
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Denys Lysak</p>
              <p className={`text-xs ${muted}`}>Administrator</p>
            </div>

            <ChevronDown size={16} className={muted} />
          </div>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className={`flex h-[76px] items-center justify-between border-b px-9 ${panel}`}>
          <div>
            <p className={`text-xs ${muted}`}>Organizacja / CampusDAO</p>
            <h2 className="text-lg font-semibold">{activePage}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden items-center gap-2 rounded-lg px-3 py-2 md:flex ${dark ? "bg-slate-700" : "bg-slate-50"}`}>
              <Search size={17} className={muted} />
              <span className={`text-sm ${muted}`}>Szukaj...</span>
              <span className={`ml-6 text-xs ${muted}`}>⌘ K</span>
            </div>

            <button
              onClick={() => setDark(!dark)}
              className={`rounded-lg p-2.5 ${dark ? "bg-slate-700" : "bg-slate-50"} ${muted}`}
              aria-label="Zmień motyw"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button className={`relative rounded-lg p-2.5 ${dark ? "bg-slate-700" : "bg-slate-50"}`}>
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-500">Sepolia Testnet</span>
            </div>
          </div>
        </header>

        {activePage === "Budżet" ? (
          <BudgetPage dark={dark} />
        ) : (
          <div className="p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Witaj, Denys 👋</h2>
                <p className={`mt-1 text-sm ${muted}`}>
                  Oto aktualny przegląd finansów Twojej organizacji.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-[#1D3B64] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#345C91]">
                <Plus size={18} />
                Dodaj transakcję
              </button>
            </div>

            <section className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Dostępne środki" value="12 450 zł" detail="Aktualne saldo" icon={Wallet} color="blue" dark={dark} />
              <StatCard title="Zarezerwowane środki" value="3 200 zł" detail="Na zatwierdzone propozycje" icon={Landmark} color="purple" dark={dark} />
              <StatCard title="Przychody" value="24 800 zł" detail="+12,5% w tym semestrze" icon={ArrowUpRight} color="green" dark={dark} />
              <StatCard title="Wydatki" value="9 150 zł" detail="W bieżącym semestrze" icon={ArrowDownRight} color="red" dark={dark} />
            </section>

            <section className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className={`rounded-2xl border p-6 xl:col-span-2 ${panel}`}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">Aktywność budżetu</h3>
                    <p className={`mt-1 text-xs ${muted}`}>
                      Przychody i wydatki w ostatnich miesiącach
                    </p>
                  </div>

                  <button className={`rounded-lg border px-3 py-2 text-xs ${dark ? "border-slate-600" : "border-slate-200"}`}>
                    Ostatnie 7 miesięcy <ChevronDown size={14} className="ml-2 inline" />
                  </button>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#345C91" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#345C91" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D97777" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#D97777" stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={dark ? "#334155" : "#E9EDF3"} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: dark ? "#94A3B8" : "#8793A5", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: dark ? "#94A3B8" : "#8793A5", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: dark ? "#182840" : "#fff", border: "1px solid #CBD5E1", borderRadius: 12, color: dark ? "#fff" : "#1e293b" }} />
                      <Area type="monotone" dataKey="income" name="Przychody" stroke="#345C91" strokeWidth={2.5} fill="url(#incomeGradient)" />
                      <Area type="monotone" dataKey="expenses" name="Wydatki" stroke="#D97777" strokeWidth={2.5} fill="url(#expenseGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex gap-6 text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#345C91]" />
                    Przychody
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D97777]" />
                    Wydatki
                  </span>
                </div>
              </div>

              <div className={`rounded-2xl border p-6 ${panel}`}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Aktywne propozycje</h3>
                    <p className={`mt-1 text-xs ${muted}`}>Głosowania społeczności</p>
                  </div>
                  <Vote size={20} className="text-[#527FAE]" />
                </div>

                <div className="space-y-6">
                  {proposals.map((proposal) => (
                    <div key={proposal.title}>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">{proposal.title}</p>
                          <p className={`mt-1 text-xs ${muted}`}>{proposal.author}</p>
                        </div>
                        <span className={`whitespace-nowrap text-xs ${muted}`}>{proposal.days}</span>
                      </div>

                      <div className={`h-2 overflow-hidden rounded-full ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
                        <div className="h-full rounded-full bg-[#527FAE]" style={{ width: `${proposal.progress}%` }} />
                      </div>

                      <p className={`mt-2 text-xs ${muted}`}>{proposal.votes} głosów</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePage("Propozycje")}
                  className="mt-6 w-full rounded-xl border border-[#527FAE]/30 py-2.5 text-sm font-semibold text-[#6E9BD0] hover:bg-[#527FAE]/10"
                >
                  Zobacz wszystkie
                </button>
              </div>
            </section>

            <section className={`rounded-2xl border p-6 ${panel}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Ostatnie transakcje</h3>
                  <p className={`mt-1 text-xs ${muted}`}>Najnowsze operacje finansowe</p>
                </div>

                <button
                  onClick={() => setActivePage("Transakcje")}
                  className="text-sm font-semibold text-[#6E9BD0]"
                >
                  Zobacz wszystkie
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left">
                  <thead>
                    <tr className={`border-b text-xs ${muted} ${dark ? "border-slate-700" : "border-slate-100"}`}>
                      <th className="pb-3 font-medium">Transakcja</th>
                      <th className="pb-3 font-medium">Kategoria</th>
                      <th className="pb-3 font-medium">Data</th>
                      <th className="pb-3 text-right font-medium">Kwota</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.title} className={`border-b last:border-0 ${dark ? "border-slate-700" : "border-slate-50"}`}>
                        <td className="py-4 text-sm font-medium">{transaction.title}</td>
                        <td className={`py-4 text-sm ${muted}`}>{transaction.category}</td>
                        <td className={`py-4 text-sm ${muted}`}>{transaction.date}</td>
                        <td className={`py-4 text-right text-sm font-semibold ${transaction.type === "income" ? "text-emerald-500" : "text-red-400"}`}>
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <footer className={`mt-7 flex flex-wrap items-center justify-between gap-3 text-xs ${muted}`}>
              <span>© 2026 CampusDAO. Projekt demonstracyjny.</span>
              <span className="flex items-center gap-2">
                <Users size={14} />
                Transparentność · Wspólne decyzje · Zaufanie
              </span>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  detail: string;
  icon: ComponentType<{ size?: number }>;
  color: "blue" | "purple" | "green" | "red";
  dark: boolean;
};

function StatCard({ title, value, detail, icon: Icon, color, dark }: StatCardProps) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-emerald-500/10 text-emerald-500",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className={`rounded-2xl border p-5 ${dark ? "bg-[#182840] border-slate-700" : "bg-white border-slate-100"}`}>
      <div className="mb-5 flex items-center justify-between">
        <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {title}
        </p>

        <div className={`rounded-xl p-2.5 ${colors[color]}`}>
          <Icon size={19} />
        </div>
      </div>

      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className={`mt-2 text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
        {detail}
      </p>
    </div>
  );
}

export default App;
