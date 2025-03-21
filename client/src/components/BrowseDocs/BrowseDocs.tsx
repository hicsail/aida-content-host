import { FC, useState } from "react";
import { FilterPanel } from "./FilterPanel";
import { ResultTable } from "./ResultTable";
import { Box, Container } from "@mui/material";

export const BrowseDocs: FC = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    topics: [] as string[],
    keywords: [] as string[],
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        display: "flex",
        background: "#F4F6F8",
        gap: 2,
        pl: 2,
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 80px)",
          position: "sticky",
          left: 0,
          top: 0,
          overflowY: "auto",
          pt: 9,
        }}
      >
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          width: "860px",
          pr: 2,
          py: 9,
        }}
      >
        <ResultTable filters={filters} />
      </Box>
    </Container>
  );
};
