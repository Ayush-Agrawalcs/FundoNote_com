import Masonry from "react-masonry-css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  autocompleteClasses,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import { useState, useRef } from "react";

const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1100: 2,
  700: 1,
};

const NotesGrid = ({
  notes,
  setAnchorEl,
  setActiveNoteId,
  handleDelete,
  editNote,
  setEditNote,
  saveEdit,
  handleArchive
}) => {
  const [hoverId, setHoverId] = useState(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleBlur = (e) => {
    if (
      e.relatedTarget !== titleRef.current &&
      e.relatedTarget !== descRef.current
    ) {
      saveEdit();
    }
  };

  return (
   <Masonry
  breakpointCols={breakpointColumnsObj}
  className="notes-masonry-grid"
  columnClassName="notes-masonry-column"
>
  {notes.map((note) => (
    <Card
      key={note.id}
      onMouseEnter={() => setHoverId(note.id)}
      onMouseLeave={() => setHoverId(null)}
      sx={{
        backgroundColor: note.color || "#fff",
        borderRadius: 2,
        boxShadow: "0 1px 6px rgba(32,33,36,.28)",
        maxWidth: 260,
        width: "100%",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* ✅ ADD THIS LINE (important) */}
      <CardContent
        sx={{ p: 1.5, flexGrow: 1 }}
        onClick={() => setEditNote({ ...note })}
      >
        {editNote?.id === note.id ? (
          <>
            <TextField
              inputRef={titleRef}
              variant="standard"
              fullWidth
              autoFocus
              placeholder="Title"
              value={editNote.title || ""}
              onChange={(e) =>
                setEditNote({ ...editNote, title: e.target.value })
              }
              onBlur={handleBlur}
            />

            <TextField
              inputRef={descRef}
              variant="standard"
              fullWidth
              multiline
              placeholder="Take a note..."
              value={editNote.description || ""}
              onChange={(e) =>
                setEditNote({
                  ...editNote,
                  description: e.target.value,
                })
              }
              onBlur={handleBlur}
            />
          </>
        ) : (
          <>
            {note.title && (
              <Typography fontWeight={600}>{note.title}</Typography>
            )}
            <Typography variant="body2">{note.description}</Typography>
          </>
        )}
      </CardContent>

      {/* 🔥 Hover icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1,
          pb: 1,
          mt: "auto",
          opacity: hoverId === note.id ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: hoverId === note.id ? "auto" : "none",
        }}
      >
        <Box>
          <Tooltip title="Color">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevent edit trigger
                setAnchorEl(e.currentTarget);
                setActiveNoteId(note.id);
              }}
            >
              <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reminders" arrow>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <AddAlertIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Collaborators" arrow>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <PersonAddAlt1OutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Image">
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Archive">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // ✅ important
                handleArchive(note.id);
              }}
            >
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="More">
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // ✅ important
              handleDelete(note.id);
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  ))}
</Masonry>
  );
};

export default NotesGrid;
