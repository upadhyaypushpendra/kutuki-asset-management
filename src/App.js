import { LinearProgress, makeStyles, Grid } from "@material-ui/core";
import AssetCard from "./components/assetCard";

import React, { useEffect, useState } from "react";
import "./styles.css";
import DeleteAssetPopup from "./components/deleteAssetPopup";
import EditAssetForm from "./components/editAssetForm";

const DELETE = "DELETE";
const EDIT = "EDIT";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto"
  }
}));
export default function App() {
  const classes = useStyles();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteAsset, setDeleteAsset] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editAsset, setEditAsset] = useState(null);

  useEffect(() => {
    fetch("https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/assets")
      .then((res) => res.json())
      .then((data) => {
        setAssets(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDrop = (fromIndex, toIndex) => {
    let assetToDrop = assets[fromIndex];
    let newAssets = [...assets];
    newAssets.splice(fromIndex, 1);
    newAssets.splice(toIndex, 0, assetToDrop);
    setAssets(newAssets);
  };

  const handleClose = (name) => {
    switch (name) {
      case DELETE:
        setOpenDeleteModal(false);
        break;
      case EDIT:
        setOpenEditForm(false);
        break;
      default:
    }
  };
  const handleOpen = (name, openAsset) => {
    switch (name) {
      case DELETE:
        setDeleteAsset(assets.find((asset) => asset.id === openAsset.id));
        setOpenDeleteModal(true);
        break;
      case EDIT:
        setEditAsset(assets.find((asset) => asset.id === openAsset.id));
        setOpenEditForm(true);
        break;
      default:
    }
  };

  const handleDelete = (deleteAsset) => {
    setAssets(assets.filter((asset) => asset.id !== deleteAsset.id));
    setOpenDeleteModal(false);
  };
  const handleEdit = (newAsset) => {
    let newAssets = [...assets];
    let assetIndex = newAssets.findIndex((asset) => asset.id === newAsset.id);
    if (assetIndex !== -1) newAssets[assetIndex] = newAsset;
    setAssets(newAssets);
    setOpenEditForm(false);
  };
  return (
    <div className="App">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid className={classes.root} container>
            {assets.map((asset, index) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                index={index}
                handleDrop={handleDrop}
                handleDelete={(asset) => handleOpen(DELETE, asset)}
                handleEdit={(asset) => handleOpen(EDIT, asset)}
              />
            ))}
          </Grid>
          {openDeleteModal && (
            <DeleteAssetPopup
              open={(asset) => handleOpen(DELETE, asset)}
              handleClose={() => handleClose(DELETE)}
              onConfirm={handleDelete}
              asset={deleteAsset}
            />
          )}
          {openEditForm && (
            <EditAssetForm
              open={(asset) => handleOpen(EDIT, asset)}
              handleClose={() => handleClose(EDIT)}
              onConfirm={handleEdit}
              asset={editAsset}
            />
          )}
        </>
      )}
    </div>
  );
}
