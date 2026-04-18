import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout.jsx'
import { Home } from './components/Home/Home.jsx'
import { Profile } from './components/Profile/Profile.jsx'
import { Login } from './components/Login/Login.jsx'
import { Register } from './components/Register/Register.jsx'
import { Notfound } from './components/Notfound/Notfound.jsx'
import UserContextProvider from './Contexts/UserContext.jsx'
import { UserRoutes } from './components/UserRoutes/UserRoutes.jsx'



let routes =createBrowserRouter([
  {path:"/",element:<Login/>},
  {path:"/register",element:<Register/>},
  {path:"/",element:<Layout/>,children:[
      {path:"/home",element:<UserRoutes><Home/></UserRoutes>},
      {path:"/profile",element:<UserRoutes><Profile/></UserRoutes>}
  ]},
  {path:"*",element:<Notfound/>}
])

function App() {
 

  return (
    <>
    <UserContextProvider>
    <RouterProvider router={routes}>
    </RouterProvider>
    </UserContextProvider>
    </>
  )
}

export default App
