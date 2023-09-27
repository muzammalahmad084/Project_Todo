import "./App.css";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Switch from "react-switch";
import { v4 as uuidv4 } from "uuid";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [status, setStatus] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      setMainTask([
        ...mainTask,
        { id: uuidv4(), title, desc, completed: false },
      ]);
    }
    setTitle("");
    setDesc("");
    setStatus("");
  };

  const deleteHandler = (id) => {
    const newMainTask = mainTask.filter((task) => task.id !== id);
    setMainTask(newMainTask);
  };

  const toggle = (id) => {
    const updatedTasks = mainTask.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setMainTask(updatedTasks);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          background: "#328da8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={submitHandler}
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
          >
            <TextField
              label="Enter Title here"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "500px", marginBottom: "40px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              style={{
                marginBottom: "40px",
                background: "#3F51B5",
                color: "#fff",
                display: "center",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
                padding: "10px",
              }}
            >
              Add task
            </Button>
          </form>
        </div>

        <Paper elevation={3} style={{ background: "#f0f0f0", padding: "20px" }}>
          {mainTask.length > 0 ? (
            <List>
              {mainTask.map((t) => (
                <ListItem
                  key={t.id}
                  disablePadding
                  style={{
                    background: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px", // Adjust the marginBottom as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={t.completed}
                      onChange={() => toggle(t.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={t.title} secondary={t.desc} />
                  <ListItemSecondaryAction>
                    <Switch
                      className="toggle"
                      checked={t.completed}
                      onChange={() => toggle(t.id)}
                      onColor="#3F51B5"
                      offColor="#BDBDBD"
                      checkedIcon={
                        <span
                          style={{
                            padding: "5px",
                            color: "#32a89b",
                            display: "flex",
                          }}
                        >
                          <FaCheck />
                        </span>
                      }
                      uncheckedIcon={
                        <span style={{ padding: "5px", color: "#32a89b" }}>
                          <FaTimes
                            display={"center"}
                            justifyContent="center"
                            alignItems="center"
                          />
                        </span>
                      }
                    />
                    <span
                      className="ml-2 status-label"
                      style={{
                        width: "70px",
                        textAlign: "center",
                        background: t.completed ? "#327ba8" : "#a832a2",
                        color: "#fff",
                        padding: "10px 10px",
                        borderRadius: "5px",
                        marginLeft: "40px",
                      }}
                    >
                      {t.completed ? "Complete" : "Pending"}
                    </span>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteHandler(t.id)}
                      style={{
                        background: "#F44336",
                        color: "black",
                        borderRadius: "10px",
                        padding: "10px",
                        marginLeft: "430px",
                        justifyContent: "space-between",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="h4"
              color="textSecondary"
              align="center"
              style={{ marginTop: "20px" }}
            >
              No Task Available
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Page;
