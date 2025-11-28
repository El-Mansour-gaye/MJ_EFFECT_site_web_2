// /app/admin/(protected)/catalogue/page.tsx
import CatalogueTable from "@/components/admin/catalogue-table";
import { Suspense } from "react";

export default function CataloguePage() {
  return (
    <div>
      <Suspense fallback={<p>Chargement du catalogue...</p>}>
        <CatalogueTable />
      </Suspense>
    </div>
  );
}