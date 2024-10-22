import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const UploadsService = {
    async uploads(formData2) {
            const response = await service(
                axios.post(getApiUrl("/uploads/image"), formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
                    'Content-Type': 'multipart/form-data',
                },
                data: deleteFormData,  // Send form data in 'data' key
            }),
            true
        );
        console.log("Delete response:", response);
        return response;
    }
}
export default UploadsService;
