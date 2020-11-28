import React, { createRef } from "react";
import { makeStyles } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  draggable: {
    width: 300
  },
  dropable: {
    width: 300,
    minHeight: 350
  },
  card: {
    minHeight: 350,
    position: "relative",
    margin: theme.spacing(2)
  },
  media: {
    width: "100%",
    height: 180
  },
  buttonContainer: {
    display: "none",
    position: "absolute",
    bottom: 10
  }
}));

export default function AssetCard(props) {
  const classes = useStyles();
  const editButton = createRef();
  const deleteButton = createRef();
  const handleOnDrop = (ev) => {
    let fromIndex = parseInt(ev.dataTransfer.getData("index"), 10);
    props.handleDrop(fromIndex, props.index);
  };
  const handleOnDragStart = (ev) => {
    ev.dataTransfer.setData("index", props.index);
  };
  const handleOnMouseOver = (ev) => {
    editButton.current.style.display = "block";
    deleteButton.current.style.display = "block";
  };
  const handleOnMouseOut = (ev) => {
    editButton.current.style.display = "none";
    deleteButton.current.style.display = "none";
  };

  return (
    <div
      className={classes.dropable}
      onDrop={handleOnDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={classes.draggable}
        onDragStart={handleOnDragStart}
        draggable
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
      >
        <Card className={classes.card}>
          <Typography noWrap variant="h6" component="h6">
            {props.asset.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={props.asset.imageURL}
            title={props.asset.title}
          />
          <CardContent>{ReactHtmlParser(props.asset.description)}</CardContent>
          <CardActions disableSpacing>
            <div
              className={classes.buttonContainer}
              ref={editButton}
              style={{ left: 10 }}
            >
              <IconButton
                aria-label="like"
                onClick={() => props.handleEdit(props.asset)}
              >
                <Edit />
              </IconButton>
            </div>
            <div
              className={classes.buttonContainer}
              ref={deleteButton}
              style={{ left: 60 }}
            >
              <IconButton
                aria-label="comment"
                onClick={() => props.handleDelete(props.asset)}
              >
                <DeleteOutline />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
