"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { downloadFile, fetchFileList } from "@/apis";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * Fetching the list of files
     */
    fetchFileListRes()

  }, [])

  const fetchFileListRes = async () => {
    const res = await fetchFileList()
    console.log(res)
    setFileList(res)
    setLoading(false)
  }

  const handleDownload = async (fileName) => {
    await downloadFile(fileName)
  }

  const handleBasicFileUpload = async(e) => {
    console.log("Calling this")
    const {files} = e.target
    if(files.length){
      const res = await uploadedFile(files[0])
    }
  }

  if (loading) {
    return <div className={styles.wrapper}>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fileListWrapper}>
        {fileList.map((fileName) => {
          return <div className={styles.fileNameWrapper} onClick={() => handleDownload(fileName)}>
            {fileName}
          </div>
        })}
      </div>
      <label htmlFor="fileUpload" className={styles.uploadFileButton}>
        <input type="file" name="fileUpload" id="fileUplaod" onChange={handleBasicFileUpload} hidden />
          Upload
      </label>
    </div>
  );
}
