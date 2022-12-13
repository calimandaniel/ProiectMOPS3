import React from "react";
import { FiDownload } from "react-icons/fi";
import { GrDropbox } from "react-icons/gr";
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, maxFiles }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div className="dropzone-div" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center dropzone">
        {acceptedFiles.length > 0 ? (
          <p>File-ul {acceptedFiles[0].name} acceptat</p>
        ) : fileRejections.length > 0 ? (
          <p>Nu sunt bune tipurile sau ati adaugat mai multe</p>
        ) : isDragActive ? (
          <div>
            <div className="drop-icon">
              <GrDropbox />
            </div>
            <p className="dropzone-content">
              <b>Release</b> to drop the files here
            </p>
          </div>
        ) : (
          <div>
            <div className="fi-download">
              <FiDownload />
            </div>
            <p className="dropzone-content">
              <b>Choose a file</b> or drag it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;