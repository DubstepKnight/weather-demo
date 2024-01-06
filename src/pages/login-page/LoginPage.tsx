import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './styles.module.scss';
import User from '@/types/user';

function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  const navigate = useNavigate();

  const loginFormSubmitHandler: SubmitHandler<User> = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/');
    toast('Event has been created.');
  }

  return (
    <section className={styles.loginPage} >
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className={styles.cardContent} onSubmit={handleSubmit(loginFormSubmitHandler)} >
            <div className={styles.inputBlock} >
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="Username" {...register('email')} required={true} />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className={styles.inputBlock} >
              <Label htmlFor="password">Password *</Label>
              <Input id="password" type="password" placeholder="e.g $ecurePassw0rd" {...register('password', {
                minLength: {
                  value: 8,
                  message: 'Password should be at least 8 characters long'
                }
              })} required={true} />
              {errors.password?.type === 'minLength' && <span className='input-validate-error' > {errors.password.message} </span>}
            </div>
            <Button type="submit" > Login </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default LoginPage