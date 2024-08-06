interface ProductionCompaniesProps {
  companies: { id: number; name: string }[];
}

export const ProductionCompanies = ({
  companies,
}: ProductionCompaniesProps) => (
  <div className="flex flex-col gap-2">
    <h3 className="mb-4 text-2xl font-bold">Production Companies</h3>
    <ul className="flex flex-col gap-2">
      {companies.map((company) => (
        <li key={company.id} className="text-muted-foreground">
          {company.name}
        </li>
      ))}
    </ul>
  </div>
);
