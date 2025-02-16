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
      //router.push('/login'); // Điều hướng đến trang đăng nhập (nếu có)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || 'Xác minh thất bại');
    }
  };

  return (
    <div>
      <h2>Xác minh Email</h2>
      <p>Nhập mã xác minh đã gửi đến: {email}</p>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Nhập mã xác minh" />
      <button onClick={handleVerify}>Xác minh</button>
    </div>
  );
}
