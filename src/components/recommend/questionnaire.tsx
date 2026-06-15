"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  QUESTIONS,
  getRecommendations,
  type Answers,
  type RecommendationResult,
} from "@/lib/recommendation";
import { RecommendationResults } from "./results";

export function Questionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<RecommendationResult[] | null>(null);

  const question = QUESTIONS[step];
  const isFirst = step === 0;
  const isLast = step === QUESTIONS.length - 1;

  const currentAnswer = answers[question.id];

  function handleSingleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleMultiSelect(value: string) {
    const current = (answers[question.id] as string[]) || [];
    if (value === "any") {
      setAnswers((prev) => ({ ...prev, [question.id]: ["any"] }));
    } else {
      const withoutAny = current.filter((v) => v !== "any");
      const updated = withoutAny.includes(value)
        ? withoutAny.filter((v) => v !== value)
        : [...withoutAny, value];
      setAnswers((prev) => ({ ...prev, [question.id]: updated }));
    }
  }

  function handleNext() {
    if (isLast) {
      setResults(getRecommendations(answers));
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  // Results screen
  if (results) {
    return <RecommendationResults results={results} onRestart={handleRestart} />;
  }

  // Quiz in progress
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const canProceed =
    currentAnswer !== undefined &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer !== "");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
        {question.subtitle && (
          <p className="text-muted-foreground">{question.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-10">
        {question.options.map((option) => {
          const isSelected =
            question.type === "multi"
              ? (currentAnswer as string[])?.includes(option.value)
              : currentAnswer === option.value;

          return (
            <button
              key={option.value}
              onClick={() =>
                question.type === "multi"
                  ? handleMultiSelect(option.value)
                  : handleSingleSelect(option.value)
              }
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-muted hover:border-muted-foreground/30 hover:bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.label}</span>
                {isSelected && (
                  <Badge
                    variant="default"
                    className="h-6 w-6 p-0 flex items-center justify-center rounded-full"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Skip hint for multi-select */}
      {question.type === "multi" && !isLast && (
        <p className="text-xs text-muted-foreground -mt-6 mb-6">
          You can select multiple options, or skip by clicking Next without
          selecting.
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={isFirst}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {isLast ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            See My Results
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
