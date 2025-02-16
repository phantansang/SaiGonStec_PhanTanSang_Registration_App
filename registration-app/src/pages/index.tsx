import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../types/auth';
import { registerUser } from '../services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  fullName: yup.string().required('Tên không được để trống'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  phoneNumber: yup.string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
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
    } catch (error: any) {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đầy đủ</label>
            <input type="text" {...register('fullName')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tên đầy đủ"
            />
            <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register('email')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập email"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="text" {...register('phoneNumber')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập số điện thoại"
            />
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input type="password" {...register('password')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mật khẩu"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <input type="password" {...register('confirmPassword')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập lại mật khẩu"
            />
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition duration-200">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
