"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type StepProjectProps = {
  onNext: () => void;
};

export function StepProject({ onNext }: StepProjectProps) {
  const [projectType, setProjectType] = useState("remplacement");

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Votre projet</CardTitle>
        <CardDescription>
          Quelques questions pour estimer votre soumission.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Type de projet */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Type de projet</Label>
          <RadioGroup
            value={projectType}
            onValueChange={setProjectType}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="remplacement" id="remplacement" />
              <Label htmlFor="remplacement" className="cursor-pointer font-normal">
                Remplacement complet
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="reparation" id="reparation" />
              <Label htmlFor="reparation" className="cursor-pointer font-normal">
                Réparation
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="nouvelle" id="nouvelle" />
              <Label htmlFor="nouvelle" className="cursor-pointer font-normal">
                Nouvelle construction
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Matériau */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Matériau</Label>
          <RadioGroup
            defaultValue="bardeaux"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="bardeaux" id="bardeaux" />
              <Label htmlFor="bardeaux" className="cursor-pointer font-normal">
                Bardeaux d&apos;asphalte
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="tole" id="tole" />
              <Label htmlFor="tole" className="cursor-pointer font-normal">
                Tôle
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="membrane" id="membrane" />
              <Label htmlFor="membrane" className="cursor-pointer font-normal">
                Membrane élastomère
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Superficie */}
        <div className="space-y-3">
          <Label htmlFor="superficie" className="text-base font-semibold">
            Superficie (pieds carrés)
          </Label>
          <Input
            id="superficie"
            type="number"
            placeholder="Ex. : 1500"
            min={300}
            max={10000}
            defaultValue={1500}
          />
          <p className="text-muted-foreground text-xs">
            Entre 300 et 10 000 pi².
          </p>
        </div>

        {/* Pente */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Pente du toit</Label>
          <RadioGroup defaultValue="moyenne" className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="faible" id="faible" />
              <Label htmlFor="faible" className="cursor-pointer font-normal">
                Faible
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="moyenne" id="moyenne" />
              <Label htmlFor="moyenne" className="cursor-pointer font-normal">
                Moyenne
              </Label>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border p-3">
              <RadioGroupItem value="forte" id="forte" />
              <Label htmlFor="forte" className="cursor-pointer font-normal">
                Forte
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Démolition — visible seulement si remplacement complet */}
        {projectType === "remplacement" && (
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <Checkbox id="demolition" />
            <div className="space-y-1">
              <Label htmlFor="demolition" className="cursor-pointer font-normal">
                Démolition de l&apos;ancien toit
              </Label>
              <p className="text-muted-foreground text-xs">
                Disponible uniquement pour un remplacement complet.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-end pt-2">
          <Button type="button" onClick={onNext}>
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}