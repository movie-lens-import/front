"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

interface Task {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  result: string | null;
  table_name: string;
  job_id: string;
}

export function TaskList() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_FLASK_API_URL}/tasks`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase text-xs font-semibold tracking-wide">
            Filename
          </TableHead>
          <TableHead className="uppercase text-xs font-semibold tracking-wide">
            Status
          </TableHead>
          <TableHead className="uppercase text-xs font-semibold tracking-wide">
            Created at
          </TableHead>
          <TableHead className="uppercase text-xs font-semibold tracking-wide">
            Updated at
          </TableHead>
          <TableHead className="uppercase text-xs font-semibold tracking-wide">
            Completed at
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!isLoading &&
          data.results?.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell className="py-4">{task.name}</TableCell>
              <TableCell className="py-4">
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell className="py-4">{task.created_at}</TableCell>
              <TableCell className="py-4">{task.updated_at}</TableCell>
              <TableCell className="py-4">{task.completed_at}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

interface TaskStatusBadgeProps {
  status: string;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
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
