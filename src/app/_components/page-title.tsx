interface PageTitlesProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitlesProps) => (
  <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
);
