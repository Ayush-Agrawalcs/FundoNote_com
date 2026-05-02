import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";

import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import api from "../../Services/axiosServices";
import { useEffect, useState } from "react";

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  // ✅ Fetch trash notes (FIXED)
  const fetchTrash = async () => {
    try {
      const uid = Number(localStorage.getItem("userId"));

      const res = await api.get(
        `/notes?isTrashed=true&user_id=${uid}`
      );

      setTrashedNotes(res.data);
    } catch (err) {
      console.error("Error fetching trash notes:", err);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  // ✅ Restore note
  const handleRestore = async (id) => {
    try {
      await api.patch(`/notes/${id}`, {
        isTrashed: false,
      });

      // refresh UI
      setTrashedNotes((prev) =>
        prev.filter((note) => note.id !== id)
      );
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  // ✅ Delete forever
  const handleDeleteForever = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

      setTrashedNotes((prev) =>
        prev.filter((note) => note.id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ EMPTY STATE
  if (trashedNotes.length === 0) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#5f6368",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>
          No notes in Trash
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Trash
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {trashedNotes.map((note) => (
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
              <Tooltip title="Restore">
                <IconButton
                  size="small"
                  onClick={() => handleRestore(note.id)}
                >
                  <RestoreFromTrashOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete forever">
                <IconButton
                  size="small"
                  onClick={() =>
                    handleDeleteForever(note.id)
                  }
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Trash;
