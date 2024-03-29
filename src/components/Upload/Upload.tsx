

import { baseUrl } from "@/app/api/api";

export const uploadImage = async (file:any) => {
  const token =	typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch(baseUrl + "/upload/image", {
      headers:{
        "Authorization" :`${token}`
      },
      method: "POST",
      body: formData,

    });

    const uploadedFile = await uploadResponse.json();
    console.log(uploadedFile ,"file");
    
    return uploadedFile.image;
  }

  return null;
};

export const uploadFile = async (file:any) => {
  const token =	typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(baseUrl + "/upload/file", {
      headers:{
        "Authorization" :`${token}`
      },
      method: "POST",
      body: formData,

    });

    const uploadedFile = await uploadResponse.json();
    console.log(uploadedFile ,"file");
    
    return uploadedFile.file;
  }

  return null;
};
export const uploadAudio = async (file:any) => {
  const token =	typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (file) {
    const formData = new FormData();
    formData.append("audio", file);

    const uploadResponse = await fetch(baseUrl + "/upload/audio", {
      headers:{
        "Authorization" :`${token}`
      },
      method: "POST",
      body: formData,

    });

    const uploadedFile = await uploadResponse.json();
    console.log(uploadedFile ,"file");
    
    return uploadedFile.audio;
  }

  return null;
};
