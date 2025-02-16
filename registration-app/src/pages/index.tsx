import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../types/auth';
import { registerUser } from '../services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  fullName: yup.string().required('Tên không được để trống'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  phoneNumber: yup.string().required('Số điện thoại là bắt buộc').matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  password: yup.string()
    .min(8, 'Mật khẩu ít nhất 8 ký tự')
    .matches(/[a-zA-Z]/, 'Mật khẩu phải chứa chữ')
    .matches(/[0-9]/, 'Mật khẩu phải chứa số')
    .matches(/[!@#$%^&*]/, 'Mật khẩu phải chứa ký tự đặc biệt')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      alert('Đăng ký thành công! Kiểm tra email để xác nhận.');
      router.push(`/verify?email=${data.email}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Tên đầy đủ" {...register('fullName')} />
      <p>{errors.fullName?.message}</p>

      <input type="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <input type="text" placeholder="Số điện thoại" {...register('phoneNumber')} />
      <p>{errors.phoneNumber?.message}</p>

      <input type="password" placeholder="Mật khẩu" {...register('password')} />
      <p>{errors.password?.message}</p>

      <input type="password" placeholder="Xác nhận mật khẩu" {...register('confirmPassword')} />
      <p>{errors.confirmPassword?.message}</p>

      <button type="submit">Đăng ký</button>
    </form>
  );
}
