import React, { useContext, useEffect, useState } from "react";
import Controls from "../../components/controls/Controls";
import { DataContext } from "./ContextData";

const EditData = React.memo(({ dataForEdit, onSimpanEdit }) => {
  const onSimpan = () => {
    onSimpanEdit("ValueFromEdit");
  };
console.log("RENDER EDIT");
  return (
    <div>
      <h3>Halaman Edit Data</h3>
      {JSON.stringify(dataForEdit)}
      <Controls.Button onClick={onSimpan} text="SIMPAN" />
    </div>
  );
});

export default EditData;
