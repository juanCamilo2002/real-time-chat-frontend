import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/axios';
import type { LoginInput } from '@/validation/login.schema';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

export function useLogin() {
  const { setUser, setToken } = useAuthStore()

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await api.post('/auth/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
      setUser(data.user)
      toast.success('¡Bienvenido!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión')
    }
  })
}