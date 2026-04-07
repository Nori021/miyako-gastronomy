import guests from "@/data/guests.json";
import GuestDetail from "./GuestDetail";

export function generateStaticParams() {
  return guests.map((g) => ({ id: String(g.id) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GuestDetail id={Number(id)} />;
}
