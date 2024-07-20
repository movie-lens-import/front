export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <span className="font-semibold">{label}</span>
    <span>{value}</span>
  </div>
);
