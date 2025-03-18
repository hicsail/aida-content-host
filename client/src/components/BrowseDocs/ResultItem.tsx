import { FC, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import {
  StyledButton,
  StyledMarkdown,
  TypographyH5,
  TypographyH6,
  TypographyLink,
} from "../GeneralComponents";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface ResultItemProps {
  docGroup: {
    pdf_id: string;
    title: string;
    date: string;
    docs: {
      id: string;
      description: string;
      topic: string;
      keywords: string[];
    }[];
    link: string;
  };
  itemsPerGroupPage: number;
}

export const ResultItem: FC<ResultItemProps> = ({ docGroup, itemsPerGroupPage }) => {
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  const [groupPage, setGroupPage] = useState<{ [key: string]: number }>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

  const groupCurrentPage = groupPage[docGroup.pdf_id] || 1;
  const paginatedDocs = docGroup.docs.slice(
    (groupCurrentPage - 1) * itemsPerGroupPage,
    groupCurrentPage * itemsPerGroupPage
  );

  const toggleGroupExpand = (pdf_id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [pdf_id]: !prev[pdf_id] }));
  };

  const handleGroupPageChange = (pdf_id: string, value: number) => {
    setGroupPage((prev) => ({ ...prev, [pdf_id]: value }));
  };

  const toggleDescriptionExpand = (id: string) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const MAX_LENGTH = 400;

  return (
    <Card key={docGroup.pdf_id} sx={{ mb: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          textAlign: "left",
          cursor: "pointer",
          px: 2,
          pt: 2,
        }}
        onClick={() => toggleGroupExpand(docGroup.pdf_id)}
      >
        <TypographyH5 sx={{ flexGrow: 1, margin: 0 }}>{docGroup.title}</TypographyH5>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <IconButton>
            {expandedGroups[docGroup.pdf_id] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="caption" color="text.secondary">
          {docGroup.date && new Date(docGroup.date).toDateString()}
        </Typography>

        <Collapse in={expandedGroups[docGroup.pdf_id]}>
          {paginatedDocs.map((doc) => (
            <Card key={doc.id} sx={{ p: 2, mt: 2 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <TypographyH6>Topic: {doc.topic}</TypographyH6>
                  <StyledMarkdown>
                    {expandedDescriptions[doc.id] || doc.description.length <= MAX_LENGTH
                      ? doc.description
                      : `${doc.description.substring(0, MAX_LENGTH)}... `}
                  </StyledMarkdown>
                  {doc.description.length > MAX_LENGTH && (
                    <TypographyLink
                      component="span"
                      onClick={() => toggleDescriptionExpand(doc.id)}
                    >
                      {expandedDescriptions[doc.id] ? "View Less" : "View More"}
                    </TypographyLink>
                  )}
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {doc.keywords.map((keyword, index) => (
                    <Chip key={index} label={keyword} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
          {docGroup.docs.length > itemsPerGroupPage && (
            <Pagination
              count={Math.ceil(docGroup.docs.length / itemsPerGroupPage)}
              page={groupCurrentPage}
              onChange={(_, value) => handleGroupPageChange(docGroup.pdf_id, value)}
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            />
          )}
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <StyledButton size="small" variant="contained" href={docGroup.link} target="_blank">
          Continue Reading
        </StyledButton>
      </CardActions>
    </Card>
  );
};
