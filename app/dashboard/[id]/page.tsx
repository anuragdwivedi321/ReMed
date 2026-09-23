import ListingDetailClient from "@/components/ListingDetailClient";

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
  return <ListingDetailClient params={params} />;
}
