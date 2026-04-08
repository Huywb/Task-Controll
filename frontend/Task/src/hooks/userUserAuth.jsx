import { useNavigate } from "react-router-dom"
import { useUserStore } from "../context/user-store"


export const userUserAuth = ()=>{
    const user = useUserStore((state)=>state.user)

    const navigate = useNavigate()
    if(!user){
        navigate('/login')
    }
}