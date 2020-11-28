import React, { useState } from "react";
import RichTextEditor from "react-rte";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    maxHeight: 200,
    minHeight: 200,
    overflowY: "auto"
  }
}));
export default function RTEditor(props) {
  const classes = useStyles();
  const [value, setValue] = useState(
    RichTextEditor.createValueFromString(props.defaultValue, "html")
  );
  const onChange = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString("html"));
    }
  };

  return (
    <>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder="Write your content here ..."
        className={classes.root}
      />
      {props.error && (
        <label style={{ color: "red", fontSize: "12px" }}>
          {props.helperText}
        </label>
      )}
    </>
  );
}
