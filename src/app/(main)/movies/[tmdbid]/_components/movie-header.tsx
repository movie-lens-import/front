import { PageSubtitle } from "@/app/_components/page-subtitle";
import { Separator } from "@/components/ui/separator";

interface MovieHeaderProps {
  title: string;
  releaseDate: string;
}

export const MovieHeader = ({ title, releaseDate }: MovieHeaderProps) => (
  <div className="flex flex-col gap-4 max-w-lg">
    <h1 className="text-4xl font-medium">{title}</h1>
    <PageSubtitle title={releaseDate.split("-")[0]} />
    <Separator />
  </div>
);
