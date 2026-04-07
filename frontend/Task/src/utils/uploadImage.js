import { API_PATHS } from "./apiPath"
import { axiosIntance } from "./AxiosInstance"

export const uploadImage = async(imageUrl)=>{
    const formData = new FormData()

    formData.append('image',imageUrl)

    try {
        const response = await axiosIntance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}