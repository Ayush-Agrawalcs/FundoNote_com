import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  ClickAwayListener,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";


import { useState } from "react";

const NotesList = ({
  notes,
  setAnchorEl,
  setActiveNoteId,
  handleDelete,
  editNote,
  setEditNote,
  saveEdit,
}) => {
  const [hoverId, setHoverId] = useState(null);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {notes.map((note) => (
          <ClickAwayListener
            key={note.id}
            onClickAway={() => {
              if (editNote?.id === note.id) {
                saveEdit();
              }
            }}
          >
           <Card
  onMouseEnter={() => setHoverId(note.id)}
  onMouseLeave={() => setHoverId(null)}
  sx={{
    backgroundColor: note.color || "#fff",
    borderRadius: 2,
    boxShadow: "0 1px 6px rgba(32, 33, 36, .28)",
    cursor: "pointer",
    minHeight: 135,
    display: "flex",
    flexDirection: "column",
  }}
>
  {/* ✅ ONLY THIS LINE ADDED (important) */}
  <CardContent
    sx={{ p: 1.5, flexGrow: 1 }}
    onClick={() => setEditNote({ ...note })}
  >
    {editNote?.id === note.id ? (
      <>
        <TextField
          variant="standard"
          fullWidth
          autoFocus
          placeholder="Title"
          value={editNote.title || ""}
          onChange={(e) =>
            setEditNote({
              ...editNote,
              title: e.target.value,
            })
          }
        />

        <TextField
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
        />
      </>
    ) : (
      <>
        {note.title && (
          <Typography fontWeight={600}>
            {note.title}
          </Typography>
        )}
        <Typography variant="body2">
          {note.description}
        </Typography>
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
      }}
    >
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

      <Tooltip title="Add image">
        <IconButton size="small" onClick={(e) => e.stopPropagation()}>
          <ImageOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Archive">
        <IconButton size="small" onClick={(e) => e.stopPropagation()}>
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
          </ClickAwayListener>
        ))}
      </Box>
    </Box>
  );
};

export default NotesList;
