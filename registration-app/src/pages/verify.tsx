import { useState } from 'react';
import { useRouter } from 'next/router';
import { verifyEmail } from '../services/auth';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleVerify = async () => {
    try {
      await verifyEmail({ email: email as string, code });
      alert('Xác minh thành công! Bạn có thể đăng nhập.');
      // router.push('/login'); // Điều hướng đến trang đăng nhập (nếu có)
    } catch (error: any) {
      alert(error.response?.data?.message || 'Xác minh thất bại');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Xác minh Email</h2>
        <p className="text-gray-600 mb-4">
          Nhập mã xác minh đã gửi đến: <span className="font-semibold text-blue-600">{email}</span>
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã xác minh"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Xác minh
        </button>
      </div>
    </div>
  );
}
