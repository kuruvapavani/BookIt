"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Fetch from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experiences");
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Filter based on search query
  const filtered = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(query.toLowerCase()) ||
      exp.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar onSearch={(val) => setQuery(val)} />

      <div className="px-6 py-10 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading experiences...</p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8 justify-center place-items-center">
            {filtered.map((exp) => (
              <ExperienceCard key={exp._id} {...exp} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No experiences found.
          </p>
        )}
      </div>
    </main>
  );
}
