import schedules from "@/data/schedules.json";
import ScheduleDetail from "./ScheduleDetail";

export function generateStaticParams() {
  return schedules.map((s) => ({ id: String(s.id) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ScheduleDetail id={Number(id)} />;
}
