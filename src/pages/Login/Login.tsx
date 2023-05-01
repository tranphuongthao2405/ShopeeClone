import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { schema, Schema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import Input from 'src/components/Input';
import { login } from 'src/api/auth.api';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ResponseApi } from 'src/types/utils.type';

type FormData = Omit<Schema, 'confirm_password'>;
const loginSchema = schema.omit(['confirm_password']);

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body),
  });

  const handleFormSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server',
              });
            });
          }
        }
      },
    });
  });

  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleFormSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
