"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculateEstimate } from "@/lib/calculate";
import type { FormData } from "@/components/estimator";

type StepEstimateProps = {
  formData: FormData;
  onNext: () => void;
  onBack: () => void;
};

const format = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);

export function StepEstimate({ formData, onNext, onBack }: StepEstimateProps) {
  const estimate = calculateEstimate({
    projectType: formData.projectType,
    material: formData.material,
    area: formData.area,
    slope: formData.slope,
    demolition: formData.demolition,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Votre estimation</CardTitle>
        <CardDescription>
          Voici une estimation basée sur les informations fournies. Elle sera
          affinée lors de la visite.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Fourchette (mise en avant) */}
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Estimation
          </p>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl">
            {format(estimate.rangeMin)} – {format(estimate.rangeMax)}
          </p>
          <p className="text-muted-foreground text-xs">
            Fourchette de prix (±10 %)
          </p>
        </div>

        <Separator />

        {/* Sous-total */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Sous-total estimé</span>
          <span className="text-base font-semibold">
            {format(estimate.subtotal)}
          </span>
        </div>

        <Separator />

        {/* Taxes */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">TPS (5 %)</span>
            <span>{format(estimate.tps)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">TVQ (9,975 %)</span>
            <span>{format(estimate.tvq)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Total taxes incluses</span>
          <span className="text-xl font-bold">{format(estimate.total)}</span>
        </div>

        <p className="text-muted-foreground text-xs">
          Estimation non contractuelle. Le prix final peut varier selon
          l&apos;état réel de la toiture.
        </p>

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button type="button" onClick={onNext}>
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}