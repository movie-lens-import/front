"use client";

import { PageSubtitle } from "@/app/_components/page-subtitle";
import { PageTitle } from "@/app/_components/page-title";
import { StatusBadge } from "@/components/ui/status-badge";
import { DetailItem } from "./_components/detail-item";
import { Column } from "./_components/column";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useParams } from "next/navigation";
import { PageSkeleton } from "./_components/page-skeleton";

export default function Page() {
  const { jobId } = useParams();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_FLASK_API_URL}/tasks/${jobId}`,
    fetcher
  );

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <main className="flex flex-col min-h-screen w-full gap-6 pt-6 pl-10">
      <header>
        <PageTitle title="Details" />
        <PageSubtitle title="Keep track of the status and results of your file processing tasks." />
      </header>

      <div className="flex">
        <Column>
          <DetailItem label="Job ID" value={jobId} />
          <DetailItem label="Filename" value={data.task.name} />
          <DetailItem label="Table name" value={data.task.table_name} />
          <DetailItem
            label="Rows failed"
            value={
              data.task.status !== "completed"
                ? "Still in progress"
                : data.task.rows_failed
            }
          />
          <DetailItem
            label="Rows inserted"
            value={
              data.task.status !== "completed"
                ? "Still in progress"
                : data.task.rows_inserted
            }
          />
        </Column>

        <Column>
          <DetailItem
            label="Status"
            value={<StatusBadge status={data.task.status} />}
          />
          <DetailItem
            label="Elapsed time"
            value={
              data.task.status !== "completed"
                ? "Still in progress"
                : `${data.task.processing_time} seconds`
            }
          />
          <DetailItem label="Created at" value={data.task.created_at} />
          <DetailItem label="Updated at" value={data.task.updated_at} />
          <DetailItem
            label="Completed at"
            value={
              data.task.status !== "completed"
                ? "Still in progress"
                : data.task.completed_at
            }
          />
        </Column>
      </div>
    </main>
  );
}
