import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Box,
  IconButton,
  Button,
  Popover,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import "./notes.css";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const COLORS = [
  "#ffffff",
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
  "#fdcfe8",
  "#e2f6d3",
  "#E9967A",
];

const COLOR_NAMES = {
  "#ffffff": "Default",
  "#f28b82": "Coral",
  "#fbbc04": "Peach",
  "#fff475": "Sand",
  "#ccff90": "Mint",
  "#a7ffeb": "Teal",
  "#cbf0f8": "Blue",
  "#aecbfa": "Dark Blue",
  "#d7aefb": "Purple",
  "#fdcfe8": "Pink",
  "#e2f6d3": "Green",
  "#E9967A": "Dark Salmon",
};

const CreateNote = ({ onAdd }) => {
  const [expanded, setExpanded] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [anchorEl, setAnchorEl] = useState(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const addNoteAndClose = () => {
    const title = titleRef.current?.value.trim() || "";
    const description = descRef.current?.value.trim() || "";

    if (title || description) {
      onAdd?.({
        // id: Date.now(),
        use:localStorage.getItem('userId'),
        title,
        description,
        color: bgColor,
        isArchived: false,
        isTrashed: false,
        // reminder:null
      });
    }

    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";

    setBgColor("#ffffff");
    setExpanded(false);
  };

  return (
    <ClickAwayListener onClickAway={() => expanded && addNoteAndClose()}>
      <Card
        onClick={() => !expanded && setExpanded(true)}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mb: 4,
          borderRadius: 2,
          backgroundColor: bgColor,
          boxShadow: "0 1px 6px rgba(32,33,36,.28)",
          cursor: "text",
          position: "relative",
        }}
      >
        {/* ---------- COLLAPSED ICONS ---------- */}
        {!expanded && (
          <Box
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              display: "flex",
              gap: 1,
              color: "#5f6368",
            }}
          >
            <Tooltip title="Formatting Options" arrow>
              <IconButton size="small">
                <CheckBoxOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="New note with drawing" arrow>
              <IconButton size="small">
                <BrushOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="New note with image" arrow>
              <IconButton size="small">
                <ImageOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <CardContent sx={{ pb: "8px !important" }}>
          {/* ---------- TITLE ---------- */}
          {expanded && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Title"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                inputRef={titleRef}
              />

              <Tooltip title="Pin note" arrow>
                <IconButton size="small">
                  <PushPinOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* ---------- DESCRIPTION ---------- */}
          <TextField
            placeholder="Take a note..."
            variant="standard"
            fullWidth
            multiline
            InputProps={{ disableUnderline: true }}
            inputRef={descRef}
            sx={{
              mt: expanded ? 1 : 0,
              pr: expanded ? 0 : 10,
            }}
          />

          {/* ---------- EXPANDED ACTIONS ---------- */}
          {expanded && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                mt: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3, // 🔥 perfect spacing
                }}
              >
                <Tooltip title="New list" arrow>
                  <IconButton size="small">
                    <FormatColorTextIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Background options" arrow>
                  <IconButton
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <ColorLensOutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reminders" arrow>
                  <IconButton size="small">
                    <AddAlertIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Collaborators" arrow>
                  <IconButton size="small">
                    <PersonAddAlt1OutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Add image" arrow>
                  <IconButton size="small">
                    <ImageOutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Archive">
                <IconButton size="small" >
                  <ArchiveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

                <Tooltip title="More" arrow>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Button
                size="small"
                onClick={addNoteAndClose}
                sx={{ textTransform: "none" }}
              >
                Close
              </Button>
            </Box>
          )}
        </CardContent>

        {/* ---------- COLOR PICKER ---------- */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ display: "flex", top: 38 }}
        >
          <Box
            sx={{
              display: "flex",
              p: 1,
              gap: 1,
              flexWrap: "wrap",
              width: 560,
            }}
          >
            {COLORS.map((color) => (
              <Tooltip
                key={color}
                title={COLOR_NAMES[color]}
                arrow
                placement="top"
              >
                <Box
                  onClick={() => {
                    setBgColor(color);
                    setAnchorEl(null);
                  }}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border:
                      bgColor === color
                        ? "2px solid #1a73e8"
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Popover>
      </Card>
    </ClickAwayListener>
  );
};

export default CreateNote;
