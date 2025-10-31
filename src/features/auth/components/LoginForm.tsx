import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/validation/login.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useLogin();
  const onSubmit = (data: LoginInput) => login(data);

  return (
    <Card className='p-8 shadow-lg border-0'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground mb-2'>Bienvenido</h1>
        <p className='text-muted-foreground'>Inicia sesión en tu cuenta</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div >
          <Label className="mb-2" htmlFor='email'>Correo electrónico</Label>
          <Input
            {...form.register('email')}
            type='email'
            id='email'
            placeholder="tu@email.com"
            className="w-full"
          />
          {form.formState.errors.email && (
            <p className='text-red-500 text-xs'>{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div >
          <Label className="mb-2" htmlFor='password'>Contraseña</Label>
          <Input
            type='password'
            placeholder='••••••••'
            {...form.register('password')}
            className='w-full'
          />
          {form.formState.errors.password && (
            <p className='text-red-500 text-xs'>{form.formState.errors.password.message}</p>
          )}
        </div>
        {/* Login Button */}
        <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2'>
          {isPending ? 'Iniciando...' : 'Iniciar sesión'}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          ¿No tienes cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Regístrate
          </button>
        </p>
      </div>
    </Card>

  );
}

export default LoginForm;