import { Box, Collapse, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { StyledButton, StyledCheckbox, TypographyH4 } from "../GeneralComponents";
import { fetchKeywords, fetchTopics } from "../../utils/api";

const clusters = ["All", "Business", "Education", "Government", "Others"];

interface FilterPanelProps {
  filters: { cluster: string; topics: string[]; keywords: string[] };
  onFilterChange: (newFilters: { cluster: string; topics: string[]; keywords: string[] }) => void;
}

export const FilterPanel: FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    fetchTopics().then(setTopics);
    fetchKeywords().then(setKeywords);
  }, []);

  const handleClusterChange = (cluster: string) => {
    onFilterChange({ ...filters, cluster });
    onFilterChange({ cluster, topics, keywords });
  };

  const handleCheckboxChange = (type: "topics" | "keywords", value: string) => {
    const updatedValues = filters[type].includes(value)
      ? filters[type].filter((item) => item !== value)
      : [...filters[type], value];

    onFilterChange({ ...filters, [type]: updatedValues });
  };

  return (
    <Box sx={{ width: 300, px: 4, py: 2, border: "1px solid #dae4d8", background: "white" }}>
      <TypographyH4 textAlign="left" sx={{ mb: 1 }}>
        Document Clusters
      </TypographyH4>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {clusters.map((option: string) => (
          <StyledButton
            key={option}
            variant={filters.cluster === option ? "contained" : "outlined"}
            onClick={() => handleClusterChange(option)}
          >
            {option}
          </StyledButton>
        ))}
      </Box>

      <Collapse in={!!filters.cluster} timeout="auto" unmountOnExit>
        <Box mt={2} display="flex" flexDirection="column">
          <TypographyH4 textAlign="left" sx={{ mb: 1 }}>
            Topics
          </TypographyH4>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={filters.topics.length === topics.length}
                    indeterminate={
                      filters.topics.some(Boolean) && filters.topics.length !== topics.length
                    }
                    onChange={() =>
                      onFilterChange({
                        ...filters,
                        topics: filters.topics.length === topics.length ? [] : topics,
                      })
                    }
                  />
                }
                label="All Topics"
                sx={{ textAlign: "left", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
              />
              {topics.map((topic) => (
                <FormControlLabel
                  key={topic}
                  control={
                    <StyledCheckbox
                      checked={filters.topics.includes(topic)}
                      onChange={() => handleCheckboxChange("topics", topic)}
                    />
                  }
                  label={topic}
                  sx={{ textAlign: "left", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box mt={2} display="flex" flexDirection={"column"}>
          <TypographyH4 textAlign="left" sx={{ mb: 1 }}>
            Keywords
          </TypographyH4>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={filters.keywords.length === keywords.length}
                    indeterminate={
                      filters.keywords.some(Boolean) && filters.keywords.length !== keywords.length
                    }
                    onChange={() =>
                      onFilterChange({
                        ...filters,
                        keywords: filters.keywords.length === keywords.length ? [] : keywords,
                      })
                    }
                  />
                }
                label="All Keywords"
                sx={{ textAlign: "left", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
              />
              {keywords.map((keyword) => (
                <FormControlLabel
                  key={keyword}
                  control={
                    <StyledCheckbox
                      checked={filters.keywords.includes(keyword)}
                      onChange={() => handleCheckboxChange("keywords", keyword)}
                    />
                  }
                  label={keyword}
                  sx={{ textAlign: "left", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Collapse>
    </Box>
  );
};
