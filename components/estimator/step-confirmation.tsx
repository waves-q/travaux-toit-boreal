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
import { CheckCircle2 } from "lucide-react";
import { calculateEstimate } from "@/lib/calculate";
import type { FormData } from "@/components/estimator";

type StepConfirmationProps = {
  formData: FormData;
  onRestart: () => void;
};

const format = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);

const PROJECT_LABELS: Record<FormData["projectType"], string> = {
  remplacement: "Remplacement complet",
  reparation: "Réparation",
  nouvelle: "Nouvelle construction",
};

const MATERIAL_LABELS: Record<FormData["material"], string> = {
  bardeaux: "Bardeaux d'asphalte",
  tole: "Tôle",
  membrane: "Membrane élastomère",
};

const SLOPE_LABELS: Record<FormData["slope"], string> = {
  faible: "Faible",
  moyenne: "Moyenne",
  forte: "Forte",
};

export function StepConfirmation({ formData, onRestart }: StepConfirmationProps) {
  const firstName = formData.fullName.split(" ")[0] || "";
  const estimate = calculateEstimate({
    projectType: formData.projectType,
    material: formData.material,
    area: formData.area,
    slope: formData.slope,
    demolition: formData.demolition,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <CardTitle className="text-2xl">
          Merci{firstName ? `, ${firstName}` : ""} !
        </CardTitle>
        <CardDescription>
          Votre demande a bien été reçue. Voici un résumé.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-center text-sm text-muted-foreground">
          Un membre de l&apos;équipe de Toitures Boréal vous contactera dans les
          prochaines 24 à 48 heures pour valider votre estimation.
        </p>

        
        <div className="flex justify-center pt-2">
          <Button type="button" variant="outline" onClick={onRestart}>
            Faire une nouvelle estimation
          </Button>
        </div>

        {/* Récap projet */}
        <div className="rounded-lg border p-4 space-y-3 text-sm">
          <p className="font-semibold">Votre projet</p>
          <dl className="grid gap-2">
            <Row label="Type" value={PROJECT_LABELS[formData.projectType]} />
            <Row label="Matériau" value={MATERIAL_LABELS[formData.material]} />
            <Row label="Superficie" value={`${formData.area.toLocaleString("fr-CA")} pi²`} />
            <Row label="Pente" value={SLOPE_LABELS[formData.slope]} />
            {formData.demolition && (
              <Row label="Démolition" value="Incluse" />
            )}
          </dl>
        </div>

        {/* Récap coordonnées */}
        <div className="rounded-lg border p-4 space-y-3 text-sm">
          <p className="font-semibold">Vos coordonnées</p>
          <dl className="grid gap-2">
            <Row label="Nom" value={formData.fullName} />
            <Row label="Courriel" value={formData.email} />
            <Row label="Téléphone" value={formData.phone} />
            <Row label="Ville" value={formData.city} />
            {formData.message && <Row label="Message" value={formData.message} />}
          </dl>
        </div>

        <Separator />

        {/* Récap estimation */}
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Estimation</p>
            <p className="text-2xl font-bold tracking-tight sm:text-3xl">
              {format(estimate.rangeMin)} – {format(estimate.rangeMax)}
            </p>
            <p className="text-muted-foreground text-xs">Fourchette de prix (±10 %)</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{format(estimate.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">TPS (5 %)</span>
            <span>{format(estimate.tps)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">TVQ (9,975 %)</span>
            <span>{format(estimate.tvq)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total taxes incluses</span>
            <span className="text-lg font-bold">{format(estimate.total)}</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground shrink-0">{label}</dt>
      <dd className="text-right font-medium break-words">{value}</dd>
    </div>
  );
}