"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type StepContactProps = {
  onNext: () => void;
  onBack: () => void;
};

export function StepContact({ onNext, onBack }: StepContactProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vos coordonnées</CardTitle>
        <CardDescription>
          Laissez-nous vos informations pour recevoir votre soumission détaillée.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Nom complet */}
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Nom complet <span className="text-destructive">*</span>
          </Label>
          <Input id="fullName" type="text" placeholder="Ex. : Marie Tremblay" />
        </div>

        {/* Courriel */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Courriel <span className="text-destructive">*</span>
          </Label>
          <Input id="email" type="email" placeholder="Ex. : marie@exemple.com" />
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" type="tel" placeholder="Ex. : 514 555-1234" />
        </div>

        {/* Ville */}
        <div className="space-y-2">
          <Label htmlFor="city">
            Ville <span className="text-destructive">*</span>
          </Label>
          <Input id="city" type="text" placeholder="Ex. : Terrebonne" />
        </div>

        {/* Message (facultatif) */}
        <div className="space-y-2">
          <Label htmlFor="message">
            Message{" "}
            <span className="text-muted-foreground text-xs font-normal">
              (facultatif)
            </span>
          </Label>
          <Textarea
            id="message"
            placeholder="Détails supplémentaires sur votre projet…"
            rows={4}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button type="button" onClick={onNext}>
            Envoyer ma demande
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}