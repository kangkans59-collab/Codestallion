import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import styles from './UploadButton.module.css'; 
import { useNavigate } from "react-router-dom";

const UploadButton = () => {

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [fileId, setFileId] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      setSelectedFile(file);

      // 🔥 Upload immediately
      uploadFile(file);
    }
  };
  const uploadFile = async (file) => {
  setStatus("Uploading...");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setFileId(data.file_id);
      navigate(`/result/${data.file_id}`);
      setStatus("Upload successful!");
      analyzeFile(data.file_id);
    } else {
      setStatus("Upload failed");
      console.error(data);
    }

  } catch (err) {
    console.error(err);
    setStatus("Server error");
  }
};

  const analyzeFile = async (id) => {
  setStatus("Analyzing report...");

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/analyze/${id}`
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Analysis Result:", data);

      setAnalysis(data); // Save JSON
      setStatus("Analysis complete!");
    } else {
      console.error(data);
      setStatus("Analysis failed");
    }

  } catch (err) {
    console.error(err);
    setStatus("Server error during analysis");
  }
};

  return (
    <div className={styles.heroContainer}>
      
      
      <div className={styles.leftColumn}>
        
        <h1 className={styles.mainHeading}>
          Understand Your Health, <br/>
          <span className={styles.highlightText}>In Your Own Words.</span>
        </h1>
        
        <p className={styles.subText}>
          We translate complex lab reports and discharge summaries into plain, easy-to-understand language. Empowering you to have better conversations with your doctor.
        </p>
        
        <div className={styles.uploadCard}>
          <div className={styles.dropzone}>
            {!selectedFile ? (
              <>
                <div className={styles.iconWrapper}>
                  <CloudUploadIcon style={{ fontSize: 36, color: '#6366f1' }} />
                </div>
                <span className={styles.uploadText}>
                  Upload your medical document
                </span>
                <span className={styles.fileHint}>PDF, JPG, or PNG (Max: 5MB)</span>
                
                <Button 
                  variant="contained" 
                  disableElevation
                  sx={{ 
                    mt: 2, 
                    textTransform: 'none', 
                    borderRadius: '8px', 
                    px: 4, 
                    py: 1,
                    backgroundColor: '#6366f1',
                    '&:hover': { backgroundColor: '#4f46e5' }
                  }}
                  component="label" 
                >
                  Select File
                  <input type="file" hidden onChange={handleFileChange} /> 
                </Button>
              </>
            ) : (
              <div className={styles.fileSelected}>
                <InsertDriveFileIcon style={{ fontSize: 44, color: '#10b981' }} />
                <span className={styles.fileName}>{selectedFile.name}</span>
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small"
                  sx={{ mt: 2, textTransform: 'none', borderRadius: '8px' }}
                  onClick={() => setSelectedFile(null)} 
                >
                  Remove File
                </Button>
              </div>
            )}
          </div>
          
          {/* Upload Status */}
          {status && (
            <p style={{ marginTop: "10px", color: "#555" }}>
              {status}
            </p>
          )}

          {/* File ID */}
          {fileId && (
            <p style={{ fontSize: "12px", color: "#888" }}>
              File ID: {fileId}
            </p>
          )}

          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> This tool is for educational purposes only and does not diagnose conditions or recommend treatments. Always consult your doctor for clinical decisions. Please use anonymized data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;