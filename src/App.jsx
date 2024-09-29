import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from "./ui/AppLayout"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 10000,
      staleTime: 0,
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='cabins' element={<Cabins />} />
          <Route path='users' element={<Users />} />
          <Route path='settings' element={<Settings />} />
          <Route path='account' element={<Account />} />
          <Route path='bookings' element={<Bookings />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
