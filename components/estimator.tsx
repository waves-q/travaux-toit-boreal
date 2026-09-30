"use client";

import { useState } from "react";
import { StepProject } from "@/components/estimator/step-project";
import { StepEstimate } from "@/components/estimator/step-estimate";
import { StepContact } from "@/components/estimator/step-contact";
import { StepConfirmation } from "@/components/estimator/step-confirmation";
import type { ProjectType, Material, Slope } from "@/lib/calculate";
import { IframeResizer } from "@/components/iframe-resizer";

export type FormData = {
  projectType: ProjectType;
  material: Material;
  area: number;
  slope: Slope;
  demolition: boolean;

  fullName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  projectType: "remplacement",
  material: "bardeaux",
  area: 1500,
  slope: "moyenne",
  demolition: false,

  fullName: "",
  email: "",
  phone: "",
  city: "",
  message: "",
};

type Step = 1 | 2 | 3 | 4;

export function Estimator() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      // Si on quitte "remplacement", on désactive la démolition
      if (key === "projectType" && value !== "remplacement") {
        next.demolition = false;
      }
      return next;
    });

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const back = () => {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };
  const restart = () => {
    setFormData(INITIAL_FORM);
    setError(null);
    setStep(1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error ?? "Une erreur est survenue. Veuillez réessayer."
        );
      }

      setStep(4);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
       <IframeResizer />
      {step === 1 && (
        <StepProject formData={formData} update={update} onNext={next} />
      )}
      {step === 2 && (
        <StepEstimate formData={formData} onNext={next} onBack={back} />
      )}
      {step === 3 && (
        <StepContact
          formData={formData}
          update={update}
          onBack={back}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
        />
      )}
      {step === 4 && <StepConfirmation formData={formData} onRestart={restart} />}
    </>
  );
}