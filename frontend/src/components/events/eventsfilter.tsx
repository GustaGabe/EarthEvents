import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"

interface EventsFilterProps {
  onFilterChange: (filters: { search: string; category: string }) => void;
}

export const EventsFilter = ({ onFilterChange }: EventsFilterProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, category });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ search, category: value });
  };

  return (
    <div className="space-y-4 mt-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <form className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Procure eventos..."
            className="pl-8"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};