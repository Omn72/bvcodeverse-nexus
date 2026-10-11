"use client";

import { Calendar, Code, Users, Trophy, BookOpen, Zap } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Join Community",
    date: "Step 1",
    content: "Connect with fellow developers, share ideas, and start your coding journey with BVCodeVerse.",
    category: "Community",
    icon: Users,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Learn & Code",
    date: "Step 2",
    content: "Access curated resources, attend workshops, and participate in coding challenges.",
    category: "Learning",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Build Projects",
    date: "Step 3",
    content: "Work on real-world projects, collaborate with peers, and build your portfolio.",
    category: "Development",
    icon: BookOpen,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Compete & Win",
    date: "Step 4",
    content: "Participate in hackathons, coding competitions, and showcase your skills.",
    category: "Competition",
    icon: Trophy,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Events & Growth",
    date: "Step 5",
    content: "Organize events, mentor newcomers, and grow as a tech leader in the community.",
    category: "Leadership",
    icon: Calendar,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 45,
  },
  {
    id: 6,
    title: "Innovation Hub",
    date: "Step 6",
    content: "Lead cutting-edge research, develop innovative solutions, and shape the future of tech.",
    category: "Innovation",
    icon: Zap,
    relatedIds: [5],
    status: "pending" as const,
    energy: 30,
  },
];

export default function BVCodeVerseTimeline() {
  return (
    <section className="py-0 bg-black">
      <div className="text-center mb-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">Your Journey</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Why Choose <span className="gradient-text">BVCodeVerse</span>
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
          Explore your development journey through our interactive orbital timeline. Click on any node to discover what makes us special.
        </p>
      </div>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </section>
  );
}
