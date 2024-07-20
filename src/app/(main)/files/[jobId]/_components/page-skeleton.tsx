import { PageSubtitle } from "@/app/_components/page-subtitle";
import { PageTitle } from "@/app/_components/page-title";
import Skeleton from "react-loading-skeleton";
import { Column } from "./column";
import { DetailItem } from "./detail-item";
import "react-loading-skeleton/dist/skeleton.css";

export function PageSkeleton() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-6 pt-6 pl-10">
      <header>
        <PageTitle title="Details" />
        <PageSubtitle title="Monitor the status of your files processing and manage their progress from this page" />
      </header>

      <div className="flex">
        <Column>
          <DetailItem label="Job ID" value={<Skeleton width={200} />} />
          <DetailItem label="Filename" value={<Skeleton width={200} />} />
          <DetailItem label="Table name" value={<Skeleton width={200} />} />
          <DetailItem label="Rows failed" value={<Skeleton width={50} />} />
          <DetailItem label="Rows inserted" value={<Skeleton width={50} />} />
        </Column>

        <Column>
          <DetailItem label="Status" value={<Skeleton width={100} />} />
          <DetailItem label="Elapsed time" value={<Skeleton width={100} />} />
          <DetailItem label="Created at" value={<Skeleton width={150} />} />
          <DetailItem label="Updated at" value={<Skeleton width={150} />} />
          <DetailItem label="Completed at" value={<Skeleton width={150} />} />
        </Column>
      </div>
    </main>
  );
}
