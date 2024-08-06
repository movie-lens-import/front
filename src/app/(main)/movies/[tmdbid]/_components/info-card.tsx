import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  items: string[];
}

export const InfoCard = ({ title, items }: InfoCardProps) => (
  <Card className="w-96 h-fit">
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col">
        {items.map((item) => (
          <span key={item} className="text-sm">
            {item}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);
