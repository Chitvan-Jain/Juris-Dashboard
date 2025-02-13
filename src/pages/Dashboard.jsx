import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Users, Newspaper, Calendar, Scale, Lightbulb, Briefcase, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";

import TeamTab from "../components/tabs/TeamTab";
import BlogsTab from "../components/tabs/BlogsTab";
import JournalsTab from "../components/tabs/JournalsTab";
import EventsTab from "../components/tabs/EventsTab";
import LegalNewsTab from "../components/tabs/LegalNewsTab";
import OpportunitiesTab from "../components/tabs/OpportunitiesTab";
import CareerTab from "../components/tabs/CareerTab";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isPublicationsOpen, setPublicationsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path, { replace: true }); // Prevents route stacking
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <nav className="mt-4 space-y-2">
          <button onClick={() => handleNavigation("/dashboard/team")} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
            <Users className="w-5 h-5 mr-2" />
            Team
          </button>

          {/* Publications Dropdown */}
          <div className="relative">
            <button onClick={() => setPublicationsOpen(!isPublicationsOpen)} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
              <Newspaper className="w-5 h-5 mr-2" />
              Publications
              <ChevronDown className="w-4 h-4 ml-auto transform transition-transform" style={{ transform: isPublicationsOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            {isPublicationsOpen && (
              <div className="ml-8 mt-1 space-y-2">
                <button onClick={() => handleNavigation("/dashboard/publications/blogs")} className="block w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
                  Blogs
                </button>
                <button onClick={() => handleNavigation("/dashboard/publications/journals")} className="block w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
                  Journals
                </button>
              </div>
            )}
          </div>

          <button onClick={() => handleNavigation("/dashboard/events")} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
            <Calendar className="w-5 h-5 mr-2" />
            Events
          </button>

          <button onClick={() => handleNavigation("/dashboard/legal-news")} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
            <Scale className="w-5 h-5 mr-2" />
            Legal News
          </button>

          <button onClick={() => handleNavigation("/dashboard/opportunities")} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
            <Lightbulb className="w-5 h-5 mr-2" />
            Opportunities
          </button>

          <button onClick={() => handleNavigation("/dashboard/career")} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-200 rounded">
            <Briefcase className="w-5 h-5 mr-2" />
            Career
          </button>

          <button onClick={handleSignOut} className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-red-200 rounded">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <Routes>
          <Route path="team" element={<TeamTab />} />
          <Route path="publications/blogs" element={<BlogsTab />} />
          <Route path="publications/journals" element={<JournalsTab />} />
          <Route path="events" element={<EventsTab />} />
          <Route path="legal-news" element={<LegalNewsTab />} />
          <Route path="opportunities" element={<OpportunitiesTab />} />
          <Route path="career" element={<CareerTab />} />
          <Route path="/" element={<TeamTab />} />
        </Routes>
      </div>
    </div>
  );
}
