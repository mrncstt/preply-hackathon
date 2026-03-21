"use client";

import { Star, Heart, Shield, Globe, Clock, MessageCircle, Video } from "lucide-react";
import type { InterviewProfile } from "@/components/voice-agent/types";

interface TutorResultsProps {
  profile: InterviewProfile;
  onStartOver: () => void;
}

interface MockTutor {
  name: string;
  country: string;
  flag: string;
  photo: string;
  headline: string;
  rating: number;
  reviews: number;
  price: number;
  activeStudents: number;
  lessonsTotal: number;
  languages: string[];
  specialties: string[];
  bio: string;
  superTutor: boolean;
  responseTime: string;
  bookedRecently: number;
}

function generateTutors(profile: InterviewProfile): MockTutor[] {
  const lang = profile.target_language || "English";
  const interest = profile.real_interest || "general topics";

  return [
    {
      name: "Sofia Martinez",
      country: "Spain",
      flag: "ES",
      photo: "",
      headline: `Native ${lang} tutor who loves ${interest} too!`,
      rating: 4.97,
      reviews: 342,
      price: 22,
      activeStudents: 28,
      lessonsTotal: 4521,
      languages: [lang, "English", "Portuguese"],
      specialties: ["Conversation", "Business", profile.required_skill?.split(" ")[0] || "General"],
      bio: `I specialize in making ${lang} fun by connecting lessons to what you love. Whether it's ${interest} or everyday conversation, we'll build your skills naturally.`,
      superTutor: true,
      responseTime: "1 hour",
      bookedRecently: 12,
    },
    {
      name: "Lucas Chen",
      country: "Brazil",
      flag: "BR",
      photo: "",
      headline: `Certified ${lang} teacher with passion-based methods`,
      rating: 4.93,
      reviews: 187,
      price: 18,
      activeStudents: 19,
      lessonsTotal: 2830,
      languages: [lang, "English", "Mandarin"],
      specialties: ["IELTS Prep", "Grammar", "Pronunciation"],
      bio: `My teaching philosophy: learn through what excites you. Your interest in ${interest} is the perfect foundation for building ${lang} fluency.`,
      superTutor: true,
      responseTime: "30 min",
      bookedRecently: 8,
    },
    {
      name: "Emma Williams",
      country: "United Kingdom",
      flag: "GB",
      photo: "",
      headline: `Patient ${lang} tutor for ${profile.current_level || "all"} levels`,
      rating: 4.89,
      reviews: 95,
      price: 15,
      activeStudents: 14,
      lessonsTotal: 1240,
      languages: [lang, "English", "French"],
      specialties: ["Beginners", "Conversation", "Culture"],
      bio: `I believe every student learns differently. Let's use your passion for ${interest} to make ${lang} stick. Relaxed, supportive lessons with real progress.`,
      superTutor: false,
      responseTime: "2 hours",
      bookedRecently: 5,
    },
  ];
}

function getPreplySignupUrl(profile: InterviewProfile): string {
  const params = new URLSearchParams();
  const lang = (profile.target_language || "english").toLowerCase();
  params.set("subject", lang);
  params.set("source_page", "get-started");
  params.set("source_element", "end-matcher");

  if (profile.current_level) {
    const levelMap: Record<string, string> = {
      beginner: "basics",
      elementary: "basics",
      intermediate: "intermediate",
      "upper-intermediate": "advanced",
      advanced: "advanced",
    };
    params.set("level", levelMap[profile.current_level] || "basics");
  }

  return `https://preply.com/en/online/${lang}-tutors?${params.toString()}`;
}

export function TutorResults({ profile, onStartOver }: TutorResultsProps) {
  const tutors = generateTutors(profile);
  const signupUrl = getPreplySignupUrl(profile);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: "#EFEFEF" }}>
        <a href="/" className="flex items-center">
          <svg width="85" viewBox="0 0 775 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#121117"><g fillRule="evenodd" clipRule="evenodd"><path d="M100.042 56.317c-4.18-6.861-9.903-12.24-17.194-16.134C75.568 36.288 67.21 34.33 57.83 34.33H0v138.654h32.378V125.44h25.44c9.403 0 17.739-1.981 25.019-5.944 7.28-3.952 13.015-9.398 17.194-16.338 4.168-6.941 6.246-14.765 6.246-23.471 0-8.707-2.09-16.508-6.246-23.37zm-28.12 31.091c-1.328 2.254-3.213 3.997-5.655 5.254-2.442 1.245-5.27 1.88-8.438 1.88H32.4V65.023h25.428c3.18 0 5.997.634 8.438 1.88 2.453 1.256 4.338 3.011 5.656 5.253 1.328 2.253 1.987 4.756 1.987 7.53s-.67 5.277-1.987 7.722z"/><path d="M194.497 73.946c3.895 4.778 6.609 11.232 8.142 19.327l-30.027 10.632c-.58-2.831-1.624-5.073-3.146-6.68-2.317-2.446-4.997-3.669-8.438-3.669s-6.52 1.167-9.233 3.465c-2.726 2.31-4.804 5.582-6.258 9.805-1.453 4.223-2.18 9.047-2.18 14.46v51.697h-30.8V66.02h27.415v18.422c2.249-4.36 4.941-8.05 8.052-11.096 3.112-3.034 6.712-5.378 10.823-7.031 4.1-1.653 8.473-2.48 13.118-2.48 9.539 0 17.058 3.363 22.554 10.1z"/><path d="M423.496 91.383c-4.566-8.447-10.8-15.15-18.682-20.109-7.882-4.948-16.593-7.428-26.12-7.428s-17.82 2.083-24.838 6.238c-4.066 2.423-7.564 5.435-10.528 9.024V66.02h-27.415v144.304h30.8v-46.716c.239.226.466.464.693.679 3.907 3.567 8.506 6.273 13.81 8.129 5.292 1.835 11.118 2.774 17.489 2.774 9.665 0 18.433-2.48 26.325-7.427 7.882-4.948 14.072-11.685 18.58-20.21 4.498-8.515 6.746-17.867 6.746-28.034s-2.283-20.168-6.848-28.625zm-27.813 41.496c-2.317 4.019-5.463 7.224-9.438 9.601-3.963 2.367-8.336 3.567-13.117 3.567-5.031 0-9.528-1.155-13.503-3.465-3.975-2.31-7.121-5.47-9.438-9.5-2.316-4.03-3.475-8.616-3.475-13.767 0-4.88 1.125-9.33 3.373-13.372 2.26-4.031 5.372-7.201 9.336-9.5 3.974-2.31 8.483-3.464 13.503-3.464s8.335 1.166 12.321 3.464c3.964 2.31 7.12 5.515 9.426 9.601 2.317 4.1 3.476 8.583 3.476 13.463s-1.17 9.352-3.476 13.372z"/><path d="M469.013 160.505c.466 5.152 1.284 9.32 2.488 12.478h-33.98V26.007h30.8v116.066c0 7.133.227 13.27.692 18.421z"/><path d="M555.359 66.01h32.98l-47.289 113.11c-4.1 9.896-9.506 17.595-16.195 23.075-6.689 5.48-15.593 8.22-26.723 8.22-4.497 0-8.87-.488-13.117-1.484-4.236-.996-7.882-2.208-10.925-3.669l9.335-29.313c2.783 1.449 5.463 2.57 8.052 3.363 2.578.792 5.122 1.189 7.643 1.189 3.578 0 6.462-.997 8.643-2.978 2.18-1.982 4.145-4.824 5.86-8.515l2.044-4.529L474.487 66.02h32.98l23.85 62.94 24.042-62.95z"/><path d="M307.622 114.763c0-9.511-2.317-18.161-6.962-25.951-4.645-7.801-10.993-13.904-19.068-18.32-8.075-4.438-17.081-6.646-27.018-6.646s-19.477 2.423-27.813 7.235c-8.347 4.812-14.911 11.492-19.67 20.006-4.77 8.515-7.154 18.06-7.154 28.623 0 10.564 2.373 20.425 7.154 28.815 4.77 8.39 11.493 14.934 20.159 19.611 8.676 4.687 18.636 7.042 29.902 7.042 13.912 0 25.235-3.295 33.968-9.918 6.576-4.959 11.437-11.345 14.548-19.135l-29.777-10.349c-.772 3.793-2.839 6.828-6.235 9.092-3.577 2.367-8.154 3.567-13.708 3.567s-10.175-1.189-14.207-3.567c-4.043-2.366-7.121-5.842-9.245-10.405-1.044-2.253-1.828-4.733-2.373-7.427h76.272c.795-4.224 1.204-8.311 1.204-12.274zm-76.227-9.918c.284-.793.579-1.55.92-2.276 1.987-4.29 4.826-7.586 8.54-9.907 3.702-2.31 8.211-3.464 13.503-3.464 3.714 0 7.121.69 10.233 2.083 3.123 1.393 5.599 3.238 7.45 5.548 1.851 2.31 2.919 4.994 3.18 8.028h-43.837z"/></g></g>
          </svg>
        </a>
        <button
          onClick={onStartOver}
          className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: "#121117" }}
        >
          Start over
        </button>
      </nav>

      {/* Header with profile summary */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "#EFEFEF", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#121117" }}>
                {profile.target_language || "Language"} tutors matched for{" "}
                <span style={{ color: "#FF7AAC" }}>{profile.learner_name || "you"}</span>
              </h1>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Based on your voice interview: {profile.current_level} level, interested in {profile.real_interest || "general learning"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,122,172,0.12)", color: "#FF7AAC" }}>
                AI Matched
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "#F3F4F6", color: "#6B7280" }}>
                {tutors.length} tutors found
              </span>
            </div>
          </div>

          {/* Learning bridge banner */}
          <div className="mt-4 p-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(255,122,172,0.08)", border: "1px solid rgba(255,122,172,0.15)" }}>
            <span className="text-lg">&#128161;</span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#FF7AAC" }}>Your learning bridge</span>
              <p className="text-sm font-medium" style={{ color: "#121117" }}>{profile.learning_bridge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutor cards */}
      <div className="flex-1 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          {tutors.map((tutor, i) => (
            <TutorCard key={i} tutor={tutor} signupUrl={signupUrl} index={i} />
          ))}

          {/* CTA to real Preply */}
          <div className="text-center py-8">
            <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>
              Want to see more tutors on Preply?
            </p>
            <a
              href={signupUrl}
              target="_blank"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold text-white no-underline hover:brightness-110 transition-all"
              style={{ background: "#FF7AAC" }}
            >
              Browse all {profile.target_language || "language"} tutors on Preply
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorCard({ tutor, signupUrl, index }: { tutor: MockTutor; signupUrl: string; index: number }) {
  const initials = tutor.name.split(" ").map((n) => n[0]).join("");
  const avatarColors = ["#FF7AAC", "#3BB3BD", "#6366F1"];

  return (
    <div
      className="p-5 rounded-2xl border flex flex-col sm:flex-row gap-5 transition-all duration-200 hover:shadow-lg"
      style={{
        borderColor: "#E5E7EB",
        background: "#fff",
        animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
          style={{ background: avatarColors[index % avatarColors.length] }}
        >
          {initials}
        </div>
        {tutor.superTutor && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#FEF3C7", color: "#D97706" }}>
            <Shield className="w-3 h-3" />
            Super Tutor
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg" style={{ color: "#121117" }}>{tutor.name}</h3>
              <span className="text-sm">{tutor.flag === "ES" ? "&#127466;&#127480;" : tutor.flag === "BR" ? "&#127463;&#127479;" : "&#127468;&#127463;"}</span>
              <div className="flex items-center gap-0.5">
                <Shield className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
              </div>
            </div>
            <p className="text-sm font-medium mt-0.5" style={{ color: "#6B7280" }}>{tutor.headline}</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
            <Heart className="w-5 h-5" style={{ color: "#D1D5DB" }} />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center flex-wrap gap-3 mt-3 text-sm" style={{ color: "#6B7280" }}>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
            <span className="font-semibold" style={{ color: "#121117" }}>{tutor.rating}</span>
            <span>({tutor.reviews} reviews)</span>
          </div>
          <span style={{ color: "#E5E7EB" }}>|</span>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{tutor.activeStudents} active students</span>
          </div>
          <span style={{ color: "#E5E7EB" }}>|</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Replies in {tutor.responseTime}</span>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 mt-3">
          <Globe className="w-3.5 h-3.5" style={{ color: "#9CA3AF" }} />
          <span className="text-xs" style={{ color: "#9CA3AF" }}>Speaks: {tutor.languages.join(", ")}</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {tutor.specialties.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#F3F4F6", color: "#374151" }}>
              {s}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm mt-3 leading-relaxed" style={{ color: "#6B7280" }}>
          {tutor.bio}
        </p>

        {/* Booked recently */}
        {tutor.bookedRecently > 0 && (
          <div className="text-xs mt-2" style={{ color: "#EF4444" }}>
            {tutor.bookedRecently} lessons booked in the last 48 hours
          </div>
        )}
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col items-center justify-between sm:items-end shrink-0 gap-3 sm:min-w-[140px]">
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: "#121117" }}>
            ${tutor.price}
          </div>
          <div className="text-xs" style={{ color: "#9CA3AF" }}>per hour</div>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <a
            href={signupUrl}
            target="_blank"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white text-center no-underline hover:brightness-110 transition-all"
            style={{ background: "#FF7AAC" }}
          >
            Book trial lesson
          </a>
          <a
            href={signupUrl}
            target="_blank"
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-center no-underline hover:bg-gray-100 transition-colors"
            style={{ color: "#121117", border: "1px solid #E5E7EB" }}
          >
            <Video className="w-3.5 h-3.5" />
            Watch intro
          </a>
        </div>
        <div className="text-xs" style={{ color: "#9CA3AF" }}>
          {tutor.lessonsTotal.toLocaleString()} lessons
        </div>
      </div>
    </div>
  );
}
