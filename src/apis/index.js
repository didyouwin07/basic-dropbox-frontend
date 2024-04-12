import axios from "axios"

const endpoint = 'http://localhost:5000/'

export const fetchFileList = async () => {
    try {
        const url = endpoint + 'list'
        const listFileRes = await axios.get(url)
        return listFileRes?.data || []
    } catch (error) {
        console.error('Error fetching file list:', error);
    }

}

export const downloadFile = async (fileName) => {
    try {
        const url = endpoint + 'download/' + fileName
        const response = await axios.get(url, {
            responseType: 'blob',
        });

        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

export const uploadFile = async (file) => {
    try {
        const url = endpoint + 'upload'
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth': 'true',
                'username': 'admin',
                'pass': 'password'
            }
        })
        console.log(res)
        return true
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}