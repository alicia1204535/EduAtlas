import type { School } from "./types";
import { loadAllSchools } from "./schools";

// ── Question Definitions ──
export interface Question {
  id: string;
  question: string;
  subtitle?: string;
  type: "single" | "multi" | "range";
  options: { label: string; value: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: "curriculum",
    question: "What curriculum are you interested in?",
    subtitle: "Select all that apply. Don't worry if you're unsure — you can skip this.",
    type: "multi",
    options: [
      { label: "IB (International Baccalaureate)", value: "ib" },
      { label: "IGCSE & A-Levels (British)", value: "british" },
      { label: "AP (American)", value: "ap" },
      { label: "Australian Curriculum", value: "australian" },
      { label: "Indian Curriculum (CBSE/ICSE)", value: "indian" },
      { label: "German Curriculum", value: "german" },
      { label: "No preference / Unsure", value: "any" },
    ],
  },
  {
    id: "budget",
    question: "What's your annual budget per child?",
    subtitle: "Include tuition only. Additional costs (uniforms, transport, activities) typically add 20-40%.",
    type: "single",
    options: [
      { label: "Under SGD 25,000", value: "budget" },
      { label: "SGD 25,000 – $35,000", value: "mid" },
      { label: "SGD 35,000 – $45,000", value: "premium" },
      { label: "Above SGD 45,000", value: "luxury" },
      { label: "No budget constraint", value: "any" },
    ],
  },
  {
    id: "region",
    question: "Which part of Singapore do you prefer?",
    subtitle: "Consider your home and work location. Commute times vary significantly.",
    type: "single",
    options: [
      { label: "Central (Orchard, Bukit Timah, Novena)", value: "Central" },
      { label: "East (Tampines, Pasir Ris, Katong)", value: "East" },
      { label: "West (Jurong, Clementi, Bukit Batok)", value: "West" },
      { label: "North (Woodlands, Yishun)", value: "North" },
      { label: "North-East (Serangoon, Hougang, Punggol)", value: "North-East" },
      { label: "No preference", value: "any" },
    ],
  },
  {
    id: "ageGroup",
    question: "What age group is your child?",
    subtitle: "We'll match you with schools that serve this age range.",
    type: "single",
    options: [
      { label: "Early Years (2–5 years)", value: "early" },
      { label: "Primary (6–11 years)", value: "primary" },
      { label: "Middle School (12–14 years)", value: "middle" },
      { label: "High School / Pre-University (15–18 years)", value: "high" },
    ],
  },
  {
    id: "schoolSize",
    question: "What school size do you prefer?",
    subtitle: "Larger schools offer more activities; smaller schools offer more personal attention.",
    type: "single",
    options: [
      { label: "Small & intimate (under 1,000 students)", value: "small" },
      { label: "Medium (1,000–2,000 students)", value: "medium" },
      { label: "Large & diverse (2,000+ students)", value: "large" },
      { label: "No preference", value: "any" },
    ],
  },
  {
    id: "language",
    question: "How important are additional language offerings?",
    type: "single",
    options: [
      { label: "Very important — need Mandarin bilingual programme", value: "mandarin" },
      { label: "Somewhat important — want multiple language options", value: "multi" },
      { label: "Not a priority — English is fine", value: "any" },
    ],
  },
];

// ── Answer Type ──
export type Answers = Record<string, string | string[]>;

// ── Scoring Weights ──
const WEIGHTS: Record<string, number> = {
  curriculum: 30,
  budget: 25,
  region: 15,
  ageGroup: 15,
  schoolSize: 10,
  language: 5,
};

// ── Scoring Algorithm ──
export function scoreSchool(school: School, answers: Answers): number {
  let score = 0;
  let totalWeight = 0;

  // 1. Curriculum match (30 pts)
  const curriculumAnswer = answers["curriculum"];
  if (curriculumAnswer) {
    totalWeight += WEIGHTS.curriculum;
    const selected = Array.isArray(curriculumAnswer)
      ? curriculumAnswer
      : [curriculumAnswer];

    if (selected.includes("any")) {
      score += WEIGHTS.curriculum * 0.8; // partial credit for "no preference"
    } else {
      const schoolCurricula = school.curriculum.map((c) => c.toLowerCase());
      const matches = selected.filter((s) => {
        if (s === "ib") return schoolCurricula.some((c) => c.includes("ib"));
        if (s === "british")
          return schoolCurricula.some((c) =>
            ["igcse", "a-levels", "cambridge", "ipc"].some((t) =>
              c.includes(t)
            )
          );
        if (s === "ap") return schoolCurricula.some((c) => c.includes("ap"));
        if (s === "australian")
          return schoolCurricula.some((c) => c.includes("australian"));
        if (s === "indian")
          return schoolCurricula.some((c) => c.includes("indian"));
        if (s === "german")
          return schoolCurricula.some((c) => c.includes("german"));
        return false;
      });
      score += (matches.length / Math.max(selected.length, 1)) * WEIGHTS.curriculum;
    }
  }

  // 2. Budget match (25 pts)
  const budgetAnswer = answers["budget"] as string;
  if (budgetAnswer) {
    totalWeight += WEIGHTS.budget;
    const avgFee = (school.feeRange.min + school.feeRange.max) / 2;
    switch (budgetAnswer) {
      case "budget":
        score += avgFee < 25000 ? WEIGHTS.budget : avgFee < 30000 ? WEIGHTS.budget * 0.6 : 0;
        break;
      case "mid":
        score +=
          avgFee >= 25000 && avgFee <= 35000
            ? WEIGHTS.budget
            : avgFee >= 20000 && avgFee <= 40000
              ? WEIGHTS.budget * 0.6
              : 0;
        break;
      case "premium":
        score +=
          avgFee >= 35000 && avgFee <= 45000
            ? WEIGHTS.budget
            : avgFee >= 30000 && avgFee <= 50000
              ? WEIGHTS.budget * 0.6
              : 0;
        break;
      case "luxury":
        score += avgFee >= 45000 ? WEIGHTS.budget : avgFee >= 40000 ? WEIGHTS.budget * 0.5 : 0;
        break;
      case "any":
        score += WEIGHTS.budget * 0.9;
        break;
    }
  }

  // 3. Region match (15 pts)
  const regionAnswer = answers["region"] as string;
  if (regionAnswer) {
    totalWeight += WEIGHTS.region;
    if (regionAnswer === "any") {
      score += WEIGHTS.region * 0.8;
    } else if (school.region === regionAnswer) {
      score += WEIGHTS.region;
    } else {
      // Adjacent regions get partial credit
      const adjacent: Record<string, string[]> = {
        Central: ["East", "West", "North-East"],
        East: ["Central", "North-East"],
        West: ["Central", "North"],
        North: ["West", "North-East", "Central"],
        "North-East": ["East", "Central", "North"],
      };
      if (adjacent[regionAnswer]?.includes(school.region)) {
        score += WEIGHTS.region * 0.4;
      }
    }
  }

  // 4. Age group match (15 pts)
  const ageAnswer = answers["ageGroup"] as string;
  if (ageAnswer) {
    totalWeight += WEIGHTS.ageGroup;
    const minFee = school.feeRange.min;
    // Use fee tiers as a proxy for age range (higher fees = older students)
    const schoolMaxFee = school.feeRange.max;

    switch (ageAnswer) {
      case "early":
        // Schools with lower starting fees are more early-years focused
        score += minFee < 25000 ? WEIGHTS.ageGroup : WEIGHTS.ageGroup * 0.5;
        break;
      case "primary":
        score += minFee < 35000 ? WEIGHTS.ageGroup : WEIGHTS.ageGroup * 0.5;
        break;
      case "middle":
        score += WEIGHTS.ageGroup * 0.9; // Most schools serve middle
        break;
      case "high":
        // Schools with IB DP, A-Levels, or AP
        const hasHighSchool = school.curriculum.some((c) =>
          ["ib dp", "a-levels", "ap", "igcse"].some((t) =>
            c.toLowerCase().includes(t)
          )
        );
        score += hasHighSchool ? WEIGHTS.ageGroup : WEIGHTS.ageGroup * 0.3;
        break;
    }
  }

  // 5. School size (10 pts)
  const sizeAnswer = answers["schoolSize"] as string;
  if (sizeAnswer) {
    totalWeight += WEIGHTS.schoolSize;
    const students = school.stats.studentCount || 1000;
    switch (sizeAnswer) {
      case "small":
        score +=
          students < 1000 ? WEIGHTS.schoolSize : students < 1500 ? WEIGHTS.schoolSize * 0.4 : 0;
        break;
      case "medium":
        score +=
          students >= 1000 && students <= 2000
            ? WEIGHTS.schoolSize
            : WEIGHTS.schoolSize * 0.5;
        break;
      case "large":
        score +=
          students > 2000 ? WEIGHTS.schoolSize : students > 1500 ? WEIGHTS.schoolSize * 0.4 : 0;
        break;
      case "any":
        score += WEIGHTS.schoolSize * 0.9;
        break;
    }
  }

  // 6. Language offerings (5 pts)
  const langAnswer = answers["language"] as string;
  if (langAnswer) {
    totalWeight += WEIGHTS.language;
    switch (langAnswer) {
      case "mandarin":
        score +=
          school.languages.includes("Mandarin")
            ? WEIGHTS.language
            : WEIGHTS.language * 0.2;
        break;
      case "multi":
        score +=
          school.languages.length >= 3
            ? WEIGHTS.language
            : school.languages.length >= 2
              ? WEIGHTS.language * 0.5
              : 0;
        break;
      case "any":
        score += WEIGHTS.language * 0.9;
        break;
    }
  }

  // Normalize to 0-100
  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 50;
}

// ── Generate Reasons ──
export function generateReasons(school: School, answers: Answers): string[] {
  const reasons: string[] = [];
  const avgFee = (school.feeRange.min + school.feeRange.max) / 2;

  const curriculumAnswer = answers["curriculum"];
  if (curriculumAnswer) {
    const selected = Array.isArray(curriculumAnswer) ? curriculumAnswer : [curriculumAnswer];
    if (!selected.includes("any")) {
      const curricula = school.curriculum.join(", ");
      reasons.push(`Offers ${curricula} curriculum matching your preference`);
    }
  }

  const budgetAnswer = answers["budget"] as string;
  if (budgetAnswer && budgetAnswer !== "any") {
    reasons.push(
      `Annual fees ~$${Math.round(avgFee / 1000)}k — within your ${budgetAnswer} range`
    );
  }

  const regionAnswer = answers["region"] as string;
  if (regionAnswer && regionAnswer !== "any" && school.region === regionAnswer) {
    reasons.push(`Located in ${school.region} Singapore — your preferred region`);
  }

  if (school.stats.studentCount) {
    const size =
      school.stats.studentCount > 2000
        ? "large"
        : school.stats.studentCount > 1000
          ? "medium-sized"
          : "small & intimate";
    reasons.push(`${size} community with ${school.stats.studentCount.toLocaleString()} students`);
  }

  if (school.stats.teacherStudentRatio) {
    reasons.push(`${school.stats.teacherStudentRatio} teacher-student ratio`);
  }

  return reasons.slice(0, 4);
}

// ── Main Function ──
export interface RecommendationResult {
  school: School;
  score: number;
  reasons: string[];
}

export function getRecommendations(answers: Answers, count = 3): RecommendationResult[] {
  const schools = loadAllSchools();
  const scored = schools
    .map((school) => ({
      school,
      score: scoreSchool(school, answers),
      reasons: generateReasons(school, answers),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return scored;
}
