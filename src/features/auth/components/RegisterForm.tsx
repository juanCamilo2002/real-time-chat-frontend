import { registerSchema, type RegisterInput } from "@/validation/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });
  const { mutate: register, isPending } = useRegister();
  const onSubmit = (data: RegisterInput) => register(data);
  return (
    <Card className="p-8 shadow-lg border-0">
      <div className="m-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Crear cuenta</h1>
        <p className="text-muted-foreground">Únete a nuestra comunidad</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
            Nombre completo
          </Label>
          <Input
            id='username'
            placeholder="Tu nombre"
            {...form.register('username')}
            className="w-full"
          />
          {form.formState.errors.username && (
            <p className='text-red-500 text-xs'>{form.formState.errors.username.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Correo electrónico
          </Label>
          <Input
            id='email'
            placeholder="tu@email.com"
            {...form.register('email')}
            className="w-full"
          />
          {form.formState.errors.email && (
            <p className='text-red-500 text-xs'>{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="pasword" className="block text-sm font-medium text-foreground mb-2">
            Contraseña
          </Label>
          <Input
            id='pasword'
            type='password'
            placeholder="••••••••"
            {...form.register('password')}
            className="w-full"
          />
          {form.formState.errors.password && (
            <p className='text-red-500 text-xs'>{form.formState.errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPasswor" className="block text-sm font-medium text-foreground mb-2">
            Confirmar contraseña
          </Label>
          <Input
            id='confirmPasswor'
            type='password'
            placeholder="••••••••"
            {...form.register('password')}
            className="w-full"
          />
          {form.formState.errors.password && (
            <p className='text-red-500 text-xs'>{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button
          type='submit'
          disabled={isPending}
          className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2'
        >
          {isPending ? 'Creando cuenta' : 'Registrate'}
        </Button>
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;