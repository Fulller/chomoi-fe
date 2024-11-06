import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const UploadsService = {
  async uploads(formData2) {
    const response = await service(
      axios.post(getApiUrl("/uploads/image"), formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      true
    );
    console.log("Upload response:", response);
    return response;
  },

  async deleteUploads(deleteFormData) {
    const response = await service(
      axios.delete(getApiUrl("/uploads"), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: deleteFormData,
      }),
      true
    );
    console.log("Delete response:", response);
    return response;
  },
  async uploads(formData2) {
    const response = await service(
      axios.post(getApiUrl("/uploads/image"), formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      true
    );
    console.log("Upload response:", response);
    return response;
  },

  async image(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile, "image.jpg");
    return service(
      axios.post(getApiUrl("/uploads/image"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async images(imageFiles) {
    const formData = new FormData();
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }
    return service(
      axios.post(getApiUrl("/uploads/images"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async video(videoFile) {
    const formData = new FormData();
    formData.append("video", videoFile);
    return service(
      axios.post(getApiUrl("/uploads/video"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async delete(fileUrl) {
    return service(axios.delete(getApiUrl("/uploads"), { fileUrl }));
  },
  async blobUrlToFile(blobUrl, fileName) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  },
};

export default UploadsService;
