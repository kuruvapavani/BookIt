"use client";

import { useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");

  const experiences = [
    {
      _id: "1",
      title: "Kayaking Adventure",
      location: "Udupi",
      description:
        "Curated small-group experience. Certified guide. Safety first with gear included.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      price: 999,
    },
    {
      _id: "2",
      title: "Nandi Hills Sunrise Hike",
      location: "Bangalore",
      description:
        "Catch the first light of dawn from Nandi Hills with an expert local guide.",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      price: 899,
    },
    {
      _id: "3",
      title: "Scuba Diving",
      location: "Goa",
      description:
        "Dive into turquoise waters and explore colorful coral reefs with professionals.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      price: 1999,
    },
    {
      _id: "4",
      title: "Mountain Trek",
      location: "Manali",
      description:
        "Hike scenic mountain trails surrounded by pine forests and snow peaks.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      price: 1499,
    },
    {
      _id: "5",
      title: "Desert Safari",
      location: "Jaisalmer",
      description:
        "Ride across golden dunes on a camel and experience a stunning desert sunset.",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
      price: 1299,
    },
    {
      _id: "6",
      title: "Paragliding Experience",
      location: "Bir Billing",
      description:
        "Soar over valleys and rivers in India’s paragliding capital with safety gear provided.",
      image:
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
      price: 2499,
    },
    {
      _id: "7",
      title: "Backwater Houseboat Stay",
      location: "Alleppey",
      description:
        "Relax in a traditional houseboat as you cruise through Kerala’s peaceful backwaters.",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      price: 2999,
    },
    {
      _id: "8",
      title: "Snow Skiing",
      location: "Gulmarg",
      description:
        "Enjoy a thrilling ski adventure on the snow-capped slopes of Gulmarg with instructors.",
      image:
        "https://images.unsplash.com/photo-1615133051766-03a90a27f5f6?auto=format&fit=crop&w=800&q=80",
      price: 3499,
    },
    {
      _id: "9",
      title: "Tea Plantation Walk",
      location: "Munnar",
      description:
        "Stroll through scenic tea gardens, learn about tea-making, and enjoy tastings.",
      image:
        "https://images.unsplash.com/photo-1574226516831-e1dff420e12c?auto=format&fit=crop&w=800&q=80",
      price: 799,
    },
    {
      _id: "10",
      title: "Caving Expedition",
      location: "Meghalaya",
      description:
        "Explore ancient limestone caves with headlamps and professional caving guides.",
      image:
        "https://images.unsplash.com/photo-1581804928342-4e3405e39c91?auto=format&fit=crop&w=800&q=80",
      price: 1599,
    },
  ];

  const filtered = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(query.toLowerCase()) ||
      exp.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar onSearch={(val) => setQuery(val)} />

      <div className="px-6 py-10 max-w-7xl mx-auto">
        {filtered.length > 0 ? (
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
