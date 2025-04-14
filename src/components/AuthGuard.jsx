import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'


export default function AuthGuard({ children, requireAuth = true }) {
    const {user} = useAuthStore()

        if(requireAuth && !user){
            return(<Navigate to='login' replace/>)
        }   
        if(!requireAuth && user){
            return(<Navigate to='/' replace/>)
        }   
    return children
}

