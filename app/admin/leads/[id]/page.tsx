import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type LeadDetail = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  projectType: "remplacement" | "reparation" | "nouvelle";
  material: "bardeaux" | "tole" | "membrane";
  area: number;
  slope: "faible" | "moyenne" | "forte";
  demolition: boolean;
  subtotal: string;
  rangeMin: string;
  rangeMax: string;
  tps: string;
  tvq: string;
  total: string;
  submittedAt: string;
};

const PROJECT_LABELS: Record<LeadDetail["projectType"], string> = {
  remplacement: "Remplacement complet",
  reparation: "Réparation",
  nouvelle: "Nouvelle construction",
};

const MATERIAL_LABELS: Record<LeadDetail["material"], string> = {
  bardeaux: "Bardeaux d'asphalte",
  tole: "Tôle",
  membrane: "Membrane élastomère",
};

const SLOPE_LABELS: Record<LeadDetail["slope"], string> = {
  faible: "Faible",
  moyenne: "Moyenne",
  forte: "Forte",
};

const format = (n: number | string) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(Number(n));

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const sql = getDb();
  const rows = (await sql`
    SELECT
      id, full_name AS "fullName", email, phone, city, message,
      project_type AS "projectType", material, area, slope, demolition,
      subtotal, range_min AS "rangeMin", range_max AS "rangeMax",
      tps, tvq, total,
      submitted_at AS "submittedAt"
    FROM leads
    WHERE id = ${numericId}
    LIMIT 1
  `) as LeadDetail[];

  const lead = rows[0];
  if (!lead) notFound();

  return (
    <main className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/admin/leads">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{lead.fullName}</h1>
            <p className="text-muted-foreground text-sm">
              Reçu le {formatDate(lead.submittedAt)}
            </p>
          </div>
          <Badge variant="secondary">
            {PROJECT_LABELS[lead.projectType]}
          </Badge>
        </div>

        {/* Coordonnées */}
        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Courriel" value={lead.email} />
            <Row label="Téléphone" value={lead.phone} />
            <Row label="Ville" value={lead.city} />
            {lead.message && <Row label="Message" value={lead.message} />}
          </CardContent>
        </Card>

        {/* Projet */}
        <Card>
          <CardHeader>
            <CardTitle>Projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Type" value={PROJECT_LABELS[lead.projectType]} />
            <Row label="Matériau" value={MATERIAL_LABELS[lead.material]} />
            <Row label="Superficie" value={`${lead.area.toLocaleString("fr-CA")} pi²`} />
            <Row label="Pente" value={SLOPE_LABELS[lead.slope]} />
            {lead.demolition && <Row label="Démolition" value="Incluse" />}
          </CardContent>
        </Card>

        {/* Estimation */}
        <Card>
          <CardHeader>
            <CardTitle>Estimation</CardTitle>
            <CardDescription>
              Fourchette : {format(lead.rangeMin)} – {format(lead.rangeMax)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Sous-total" value={format(lead.subtotal)} />
            <Row label="TPS (5 %)" value={format(lead.tps)} />
            <Row label="TVQ (9,975 %)" value={format(lead.tvq)} />
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total taxes incluses</span>
              <span className="text-lg font-bold">{format(lead.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium break-words">{value}</span>
    </div>
  );
}