import React, { useState } from "react";

function ImageUpload() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img style={{ height: 250, width: 250 }} src={file} />
    </div>
  );
}

export default ImageUpload;
