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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import type { FormData } from "@/components/estimator";

type StepContactProps = {
  formData: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
};

export function StepContact({
  formData,
  update,
  onBack,
  onSubmit,
  submitting,
  error,
}: StepContactProps) {
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
          <Input
            id="fullName"
            type="text"
            placeholder="Ex. : Marie Tremblay"
            value={formData.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Courriel */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Courriel <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Ex. : marie@exemple.com"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Ex. : 514 555-1234"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Ville */}
        <div className="space-y-2">
          <Label htmlFor="city">
            Ville <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Ex. : Terrebonne"
            value={formData.city}
            onChange={(e) => update("city", e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Message */}
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
            value={formData.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Message d'erreur */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={submitting}
          >
            Retour
          </Button>
          <Button type="button" onClick={onSubmit} disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}