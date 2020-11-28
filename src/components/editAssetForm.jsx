import React, { useState } from "react";
import {
  Button,
  Dialog,
  makeStyles,
  Paper,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import RTEditor from "./RTEditor";
import ImageUploader from "react-images-upload";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "10%",
    left: "calc((100% - 400px)/2)",
    width: "500px",
    display: "flex",
    height: "800px",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  formElements: {
    margin: 10
  }
}));

export default function EditAssetForm(props) {
  const [title, setTitle] = useState(props.asset.title);
  const [description, setDescription] = useState(props.asset.description);
  const [assetImage, setAssetImage] = useState(null);
  const [error, setError] = useState({});
  const classes = useStyles();

  const handleClick = (e) => {
    setError({});
    let errorObj = {};
    if (title.trim().length === 0) {
      errorObj.titleError = "Title Required";
    }
    if (description.trim().length === 0) {
      errorObj.descriptionError = "Description Required";
    }
    if (!assetImage) {
      errorObj.assetImageError = "Asset Image Required";
    }
    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
    } else {
      let asset = { ...props.asset };
      asset.description = description;
      asset.title = title;
      asset.dateModified = Date.now();
      setTitle("");
      setDescription("");
      setAssetImage(null);
      props.onConfirm(asset);
    }
  };
  const handleChange = (e) => {
    setTitle(e.target.value.toString().trimStart());
  };
  const onDescriptionChange = (rteDescription) => {
    setDescription(rteDescription);
  };
  const onImageDrop = (picture) => {
    setAssetImage(picture);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit Asset"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Paper elevation={2}>
            <TextField
              className={classes.formElements}
              id="comment-textfield"
              label="Add title ..."
              variant="outlined"
              value={title}
              onChange={handleChange}
              error={error.hasOwnProperty("titleError")}
              helperText={error.titleError}
            />
            <RTEditor
              onChange={onDescriptionChange}
              error={error.hasOwnProperty("descriptionError")}
              helperText={error.descriptionError}
              defaultValue={props.asset.description}
            />

            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={onImageDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            {error.hasOwnProperty("assetImageError") && (
              <label style={{ color: "red", fontSize: "12px" }}>
                {error.assetImageError}
              </label>
            )}
          </Paper>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" autoFocus>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
