import { Routes, Route } from "react-router-dom";
import AppShell from "@/components/AppShell";
import Landing from "@/pages/Landing";
import Scanner from "@/pages/Scanner";
import Dashboard from "@/pages/Dashboard";
import Details from "@/pages/Details";
import History from "@/pages/History";
import Report from "@/pages/Report";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/dashboard/:scanId" element={<Dashboard />} />
        <Route path="/findings/:scanId/:findingId" element={<Details />} />
        <Route path="/history" element={<History />} />
        <Route path="/report/:scanId" element={<Report />} />
      </Route>
    </Routes>
  );
}
