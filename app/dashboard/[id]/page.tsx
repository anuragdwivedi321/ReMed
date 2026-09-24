import { Suspense } from "react";
import ListingDetailClient from "@/components/ListingDetailClient";
import { Loader2 } from "lucide-react";

export function generateStaticParams() {
  return [
    { id: "rem-001" },
    { id: "rem-002" },
    { id: "rem-003" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-16 text-slate-400">
          <Loader2 size={32} className="animate-spin text-[#0072d2]" />
        </div>
      }
    >
      <ListingDetailClient params={params} />
    </Suspense>
  );
}
