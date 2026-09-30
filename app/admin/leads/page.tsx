import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getDb } from "@/lib/db";
import { LeadsFilter } from "./leads-filter";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Lead = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  projectType: "remplacement" | "reparation" | "nouvelle";
  material: string;
  total: string;
  submittedAt: string;
};

type Props = {
  searchParams: Promise<{ type?: string }>;
};

const PROJECT_LABELS: Record<Lead["projectType"], string> = {
  remplacement: "Remplacement",
  reparation: "Réparation",
  nouvelle: "Nouvelle",
};

const MATERIAL_LABELS: Record<string, string> = {
  bardeaux: "Bardeaux d'asphalte",
  tole: "Tôle",
  membrane: "Membrane élastomère",
};

const format = (n: number | string) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(Number(n));

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));

export default async function AdminLeadsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const sql = getDb();

  const leads = (
    type && type !== "tous"
      ? await sql`
          SELECT
            id, full_name AS "fullName", email, phone, city,
            project_type AS "projectType", material, area, total,
            submitted_at AS "submittedAt"
          FROM leads
          WHERE project_type = ${type}
          ORDER BY submitted_at DESC
        `
      : await sql`
          SELECT
            id, full_name AS "fullName", email, phone, city,
            project_type AS "projectType", material, area, total,
            submitted_at AS "submittedAt"
          FROM leads
          ORDER BY submitted_at DESC
        `
  ) as Lead[];

  return (
    <main className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Leads reçus</h1>
          <p className="text-muted-foreground text-sm">
            Soumissions reçues via l&apos;estimateur en ligne.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste</CardTitle>
            <CardDescription>
              {leads.length} lead{leads.length > 1 ? "s" : ""}
              {type && type !== "tous" ? " (filtré)" : " au total"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <LeadsFilter currentType={type ?? "tous"} />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Matériau</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Reçu le</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Aucun lead pour ce filtre.
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="hover:underline"
                          >
                            {lead.fullName}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{lead.email}</div>
                          <div className="text-muted-foreground text-xs">{lead.phone}</div>
                        </TableCell>
                        <TableCell>{lead.city}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{PROJECT_LABELS[lead.projectType]}</Badge>
                        </TableCell>
                        <TableCell>{MATERIAL_LABELS[lead.material] ?? lead.material}</TableCell>
                        <TableCell className="text-right font-medium">
                          {format(lead.total)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(lead.submittedAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}