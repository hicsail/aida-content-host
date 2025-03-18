import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { TypographyBody } from "../GeneralComponents";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { queryDocuments } from "../../utils/api";
import { ResultItem } from "./ResultItem";

interface CombinedDocuments {
  pdf_id: string;
  category: string;
  title: string;
  link: string;
  date: string;
  docs: {
    id: string;
    description: string;
    topic: string;
    keywords: string[];
  }[];
}

interface ResultTableProps {
  filters: { title: string; category: string; topics: string[]; keywords: string[] };
}

export const ResultTable: FC<ResultTableProps> = ({ filters }) => {
  const [documents, setDocuments] = useState<CombinedDocuments[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    queryDocuments(filters).then(setDocuments);
    setPage(1);
  }, [filters]);

  const sortedData = [...documents].sort((a, b) => {
    if (sortBy === "title")
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    queryDocuments({ ...filters, title: e.target.value }).then(setDocuments);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedDocuments = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Box>
        <TypographyBody textAlign="right" sx={{ mb: 1 }}>
          Showing {Math.min((page - 1) * itemsPerPage + 1, documents.length)}-
          {Math.min(page * itemsPerPage, documents.length)} of {documents.length} results
        </TypographyBody>
      </Box>
      <Box
        sx={{
          background: "white",
          border: "1px solid #dae4d8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
          px: 4,
          py: 3,
        }}
      >
        <TextField
          label="Search Documents"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchQuery}
          sx={{
            width: "calc(100% - 316px)",
            "& label.Mui-focused": { color: "#c00" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#c00",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 2, minWidth: 300 }}>
          <FormControl fullWidth sx={{ maxWidth: 120 }}>
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "#c00",
                },
              }}
            >
              Items Per Page
            </InputLabel>
            <Select
              value={itemsPerPage}
              label="Items Per Page"
              size="small"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c00",
                },
              }}
            >
              {[5, 10, 20, 50].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ maxWidth: 120 }}>
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "#c00",
                },
              }}
            >
              Sort By
            </InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              size="small"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c00",
                },
              }}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </Box>
      </Box>

      {paginatedDocuments.map((docGroup) => (
        <ResultItem key={docGroup.pdf_id} docGroup={docGroup} itemsPerGroupPage={3} />
      ))}

      <Pagination
        count={Math.ceil(documents.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center", height: 48 }}
      />
    </>
  );
};
