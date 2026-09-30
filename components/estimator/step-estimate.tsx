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

type StepEstimateProps = {
  onNext: () => void;
  onBack: () => void;
};

export function StepEstimate({ onNext, onBack }: StepEstimateProps) {
  // --- Données en dur (temporaire) ---
  const sousTotal = 9750;
  const fourchetteMin = sousTotal * 0.9;
  const fourchetteMax = sousTotal * 1.1;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const total = sousTotal + tps + tvq;

  const format = (n: number) =>
    new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    }).format(n);

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
            {format(fourchetteMin)} – {format(fourchetteMax)}
          </p>
          <p className="text-muted-foreground text-xs">
            Fourchette de prix (±10 %)
          </p>
        </div>

        <Separator />

        {/* Sous-total */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Sous-total estimé</span>
          <span className="text-base font-semibold">{format(sousTotal)}</span>
        </div>

        <Separator />

        {/* Taxes */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">TPS (5 %)</span>
            <span>{format(tps)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">TVQ (9,975 %)</span>
            <span>{format(tvq)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Total taxes incluses</span>
          <span className="text-xl font-bold">{format(total)}</span>
        </div>

        <p className="text-muted-foreground text-xs">
          Estimation non contractuelle. Le prix final peut varier selon l&apos;état
          réel de la toiture.
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