"use client";

import { useState } from "react";
import { StepProject } from "@/components/estimator/step-project";
import { StepEstimate } from "@/components/estimator/step-estimate";
import { StepContact } from "@/components/estimator/step-contact";
import { StepConfirmation } from "@/components/estimator/step-confirmation";

type Step = 1 | 2 | 3 | 4;

export function Estimator() {
  const [step, setStep] = useState<Step>(1);

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  const restart = () => setStep(1);

  return (
    <>
      {step === 1 && <StepProject onNext={next} />}
      {step === 2 && <StepEstimate onNext={next} onBack={back} />}
      {step === 3 && <StepContact onNext={next} onBack={back} />}
      {step === 4 && <StepConfirmation onRestart={restart} />}
    </>
  );
}