"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type StepConfirmationProps = {
  onRestart: () => void;
};

export function StepConfirmation({ onRestart }: StepConfirmationProps) {
  // En dur pour l'instant — sera remplacé par le prénom du formData
  const firstName = "Marie";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Merci, {firstName} !</CardTitle>
        <CardDescription>
          Votre demande a bien été reçue.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <p className="text-sm text-muted-foreground">
          Un membre de l&apos;équipe de Toitures Boréal vous contactera dans les
          prochaines 24 à 48 heures pour valider votre estimation et planifier
          une visite.
        </p>

        <div className="rounded-lg border bg-muted/40 p-4 text-left text-sm space-y-1">
          <p className="font-medium">Besoin de nous joindre plus vite ?</p>
          <p className="text-muted-foreground">
            Téléphone : 450 555-1234
            <br />
            Courriel : info@toituresboreal.ca
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Button type="button" variant="outline" onClick={onRestart}>
            Faire une nouvelle estimation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}