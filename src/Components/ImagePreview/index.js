import React, { useState, useRef, useMemo } from "react";
import "./imagePreview.scss";

const ImagePreviewAndBase64 = ({ handleImage, isImage }) => {
  const [preview, setPreview] = useState(isImage);
  // eslint-disable-next-line no-unused-vars
  const [base64, setBase64] = useState();
  const fileInput = useRef(); // Create a ref

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setBase64(reader.result);
        handleImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview("");
    fileInput.current.value = ""; // Reset the input field
  };

  useMemo(() => setPreview(isImage), [isImage]);
  return (
    <div className="image-component">
      <div>
        {" "}
        {preview && (
          <img src={preview} alt="preview" height="250px" width="250px" />
        )}
      </div>
      <input
        type="file"
        accept="jpeg"
        className="img-input"
        onChange={handleImageChange}
        ref={fileInput} // Attach the ref to the input field
      />
      <button type="button" onClick={clearImage} className="clear-action">
        Clear
      </button>
    </div>
  );
};

export default ImagePreviewAndBase64;
