interface PlotSummaryProps {
  plot: string;
}

export const PlotSummary = ({ plot }: PlotSummaryProps) => (
  <div>
    <h3 className="mb-4 text-2xl font-bold">Plot Summary</h3>
    <p className="text-muted-foreground">{plot}</p>
  </div>
);
