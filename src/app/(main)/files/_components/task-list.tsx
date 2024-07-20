"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Task } from "@/@types/task";

export function TaskList() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_FLASK_API_URL}/tasks`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  return (
    <TooltipProvider>
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
            <TableHead className="uppercase text-xs font-semibold tracking-wide"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!isLoading &&
            data.results?.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell className="py-4">{task.name}</TableCell>
                <TableCell className="py-4">
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="py-4">{task.created_at}</TableCell>
                <TableCell className="py-4">{task.updated_at}</TableCell>
                <TableCell className="py-4">{task.completed_at}</TableCell>
                <TableCell className="py-4 flex items-center gap-2">
                  <TaskActionTooltiped
                    title="View details"
                    href={`/files/${task.job_id}`}
                  >
                    <TbExternalLink size={24} />
                  </TaskActionTooltiped>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}

interface TaskActionTooltipedProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

export function TaskActionTooltiped({
  className,
  title,
  children,
  href,
}: TaskActionTooltipedProps) {
  return (
    <Tooltip delayDuration={1}>
      <TooltipTrigger>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn(["hover:bg-zinc-200", className])}
        >
          <Link href={href}>{children}</Link>
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span className="text-sm">{title}</span>
      </TooltipContent>
    </Tooltip>
  );
}
