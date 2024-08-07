import { FaUserAlt } from "react-icons/fa";

interface PersonListProps {
  title: string;
  persons: string[];
  role: string;
}

export const PersonList = ({ title, persons, role }: PersonListProps) => (
  <div>
    <h3 className="mb-4 text-2xl font-bold">{title}</h3>
    <ul className="max-w-xl justify-between gap-4 flex flex-wrap">
      {persons.map((person) => (
        <li key={person} className="w-[280px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100">
              <FaUserAlt />
            </div>
            <section className="flex flex-col">
              <span className="text-primary font-medium">{person}</span>
              <span>{role}</span>
            </section>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
