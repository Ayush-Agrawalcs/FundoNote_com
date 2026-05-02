import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Popover,
} from "@mui/material";

import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import AddAlertIcon from "@mui/icons-material/AddAlert";

import api from "../../Services/axiosServices";
import { useEffect, useState } from "react";

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#f28b82" },
  { name: "Orange", value: "#fbbc04" },
  { name: "Yellow", value: "#fff475" },
  { name: "Green", value: "#ccff90" },
  { name: "Teal", value: "#a7ffeb" },
  { name: "Sky Blue", value: "#cbf0f8" },
  { name: "Blue", value: "#aecbfa" },
  { name: "Purple", value: "#d7aefb" },
];

const Archive = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);

  // 🔹 fetch archived notes
  const fetchArchivedNotes = async () => {
    const uid = localStorage.getItem("userId");
    const res = await api.get(
      `/notes?isArchived=true&user_id=${uid}&isTrashed=false`
    );
    setArchivedNotes(res.data);
  };

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  // 🔹 unarchive
  const handleUnarchive = async (id) => {
    await api.patch(`/notes/${id}`, { isArchived: false });

    setArchivedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  // 🔹 permanent delete
  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);

    setArchivedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  // ✅ COLOR CHANGE — FIXED
  const handleColorChange = async (colorObj) => {
    if (!activeNoteId) return;

    // 🔥 UI UPDATE FIRST
    setArchivedNotes((prev) =>
      prev.map((note) =>
        note.id === activeNoteId
          ? { ...note, color: colorObj.value }
          : note
      )
    );

    setAnchorEl(null);

    try {
      const note = archivedNotes.find(
        (n) => n.id === activeNoteId
      );

      await api.put(`/notes/${activeNoteId}`, {
        ...note,
        color: colorObj.value,
      });
    } catch (err) {
      console.error("Color update failed", err);
    }

    setActiveNoteId(null);
  };

  // ✅ EMPTY STATE
  if (archivedNotes.length === 0) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#5f6368",
        }}
      >
        <ArchiveOutlinedIcon
          sx={{ fontSize: 120, color: "#e0e0e0" }}
        />
        <Typography sx={{ fontSize: 20 }}>
          Your archived notes appear here
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Archived
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {archivedNotes.map((note) => (
          <Card
            key={note.id}
            sx={{
              width: 250,
              backgroundColor: note.color || "#fff",
            }}
          >
            <CardContent>
              <Typography fontWeight={600}>
                {note.title}
              </Typography>
              <Typography variant="body2">
                {note.description}
              </Typography>
            </CardContent>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 1,
                pb: 1,
              }}
            >
              <Tooltip title="Change color">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setActiveNoteId(note.id);
                  }}
                >
                  <ColorLensOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Reminders">
                <IconButton size="small">
                  <AddAlertIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Unarchive">
                <IconButton
                  size="small"
                  onClick={() => handleUnarchive(note.id)}
                >
                  <UnarchiveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(note.id)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>

      {/* 🎨 COLOR POPOVER */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ display: "flex", p: 1, gap: 1 }}>
          {COLORS.map((c) => (
            <Tooltip key={c.value} title={c.name}>
              <Box
                onClick={() => handleColorChange(c)}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: c.value,
                  cursor: "pointer",
                  border: "1px solid #ccc",
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default Archive;
