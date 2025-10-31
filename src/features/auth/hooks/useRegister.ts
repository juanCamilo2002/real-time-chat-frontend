import { api } from "@/api/axios";
import type { RegisterInput } from "@/validation/register.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await api.post('auth/register', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('¡Te has registrado con exito!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al registrar usuario')
    }
  });
}