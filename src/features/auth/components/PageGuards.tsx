import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const { user } = useAuthStore();

  if (!user) return <Navigate to='/auth' />

  return <Outlet />

}

export function GuestRoute() {
  const { user } = useAuthStore();

  return !user ? <Outlet /> : <Navigate to='/' />
}