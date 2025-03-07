import { FC, useState } from "react";
import { FilterPanel } from "./FilterPanel";
import { ResultTable } from "./ResultTable";
import { Box, Container } from "@mui/material";

export const BrowseDocs: FC = () => {
  const [filters, setFilters] = useState({
    title: "",
    cluster: "",
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
          height: "calc(100vh - 32px)",
          position: "sticky",
          left: 0,
          top: 0,
          overflowY: "auto",
          py: 2,
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
          py: 2,
        }}
      >
        <ResultTable filters={filters} />
      </Box>
    </Container>
  );
};
