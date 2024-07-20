interface PageSubtitleProps {
  title: string;
}

export const PageSubtitle = ({ title }: PageSubtitleProps) => (
  <h3 className="text-lg text-muted-foreground">{title}</h3>
);
