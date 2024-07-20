import fetchTasks from "@/actions/fetch-tasks";
import { PageTitle } from "@/app/_components/page-title";
import { TaskList } from "./_components/task-list";
import { PageSubtitle } from "@/app/_components/page-subtitle";
import { TaskListServer } from "./_components/task-list-server";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-6 pt-6 pl-10">
      <header>
        <PageTitle title="Files" />
        <PageSubtitle title="Monitor the status of your files processing and manage their progress from this page" />
      </header>
      <TaskList />
    </main>
  );
}
