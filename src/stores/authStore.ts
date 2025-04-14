import { create } from 'zustand'

interface User {
    email: string;
    password: string;
  }

  interface AuthState {
    user: User | null;
    login: (email: string, password: string) => boolean;
    register: (email: string, password: string) => boolean;
    logout: () => void;
  }
  
  const AuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  
    login: (email, password) => {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
        return true;
      }
  
      return false;
    },
  
    register: (email, password) => {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) {
        return false;
      }
  
      const newUser: User = { email, password };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('user', JSON.stringify(newUser));
      set({ user: newUser });
      return true;
    },
  
    logout: () => {
      localStorage.removeItem('user');
      set({ user: null });
    }
  }));
  
  export default AuthStore;




//----------------js code------------------------

// const AuthStore = create((set) => ({
//     user: JSON.parse(localStorage.getItem('user')) || null,

//     login: (email, password)=>{
//     const users =JSON.parse(localStorage.getItem('users')) || []
//     const user =users.find(u=>u.email===email && u.password===password)
//     if(user){
//         localStorage.setItem('user', JSON.stringify(user))
//         set({user})
//         return true
//     }
//     return false
//     },

//     register: (email, password)=>{
//     const users =JSON.parse(localStorage.getItem('users')) || []
//     if(users.some(u=>u.email===email)){  return false}

//     const newUser = {email, password}
//     localStorage.setItem('users', JSON.stringify([...users, newUser]))
//     localStorage.setItem('user', JSON.stringify(newUser))
//    set({user: newUser})
//     return true
//     },

//     logout:()=>{
//         localStorage.removeItem('user')
//         set({user:null})
//     }
// }))

// export default AuthStore; 
