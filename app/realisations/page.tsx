import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const revalidate = 3600; // revalide toutes les heures

type WpPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

const WP_API =
  "https://wordpress.org/news/wp-json/wp/v2/posts?per_page=5&_fields=id,date,link,title,excerpt";

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "…").trim();

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-CA", { dateStyle: "long" }).format(new Date(iso));

export default async function RealisationsPage() {
  let posts: WpPost[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(WP_API, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`WordPress a répondu ${res.status}`);
    posts = await res.json();
  } catch (err) {
    console.error("Erreur fetch WordPress:", err);
    error = "Impossible de charger les réalisations pour le moment.";
  }

  return (
    <main className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Nos réalisations</h1>
          <p className="text-muted-foreground text-sm">
            Dernières nouvelles et projets de Toitures Boréal.
          </p>
        </div>

        {error && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {error}
            </CardContent>
          </Card>
        )}

        {!error && posts.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Aucune réalisation pour l&apos;instant.
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle
                  className="text-lg leading-snug"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <CardDescription>{formatDate(post.date)}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {stripHtml(post.excerpt.rendered)}
                </p>

                <Button asChild variant="outline" size="sm" className="self-start">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    Lire l&apos;article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}