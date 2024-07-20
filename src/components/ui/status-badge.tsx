interface BadgeProps {
  status: string;
}

export function StatusBadge({ status }: BadgeProps) {
  const statusColor = {
    queued: "bg-yellow-100",
    started: "bg-blue-100",
    completed: "bg-green-100",
    failed: "bg-red-100",
  }[status];

  return (
    <span
      className={`px-2 py-1.5 rounded-full text-xs capitalize font-medium ${statusColor}`}
    >
      {status}
    </span>
  );
}
