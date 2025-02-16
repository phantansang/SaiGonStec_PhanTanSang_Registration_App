# SaiGonStec_PhanTanSang_Registration_App
# Next.js & NestJS Registration App

## Mô tả
Đây là hệ thống đăng ký tài khoản với xác thực email, bao gồm:
- **Backend:** NestJS + MongoDB (Mongoose)
- **Frontend:** Next.js (Pages Router) + React Hook Form + TailwindCSS
- **Xác thực:** Gửi mã xác thực qua email

## Yêu cầu hệ thống
- Node.js >= 16
- MongoDB (có thể dùng MongoDB Atlas hoặc cài đặt cục bộ)
- Gmail để gửi email xác thực

## Hướng dẫn cài đặt

### Clone dự án
```sh
git clone https://github.com/phantansang/SaiGonStec_PhanTanSang_Registration_App.git
cd SaiGonStec_PhanTanSang_Registration_App
```

### Cài đặt Backend (NestJS)
```sh
cd registration-api
npm install
```

#### Cấu hình môi trường (`registration-api/.env`)
Tạo file `.env` và điền thông tin:
```env
PORT='5000'
MONGO_URI='mongodb+srv://phantansangit:1GJmfkGujnwnXj3A@cluster0.msgzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
EMAIL_USER='your-email'
EMAIL_PASS='mật khẩu ứng dụng'
```
Replace email và mật khẩu ứng dụng

#### Chạy Backend
```sh
npm run start:dev
```
Mặc định backend sẽ chạy tại `http://localhost:5000`

### Cài đặt Frontend (Next.js)
```sh
cd ../registration-app
npm install
```

#### Cấu hình môi trường (`registration-app/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Chạy Frontend
```sh
npm run dev
```
Mặc định frontend sẽ chạy tại `http://localhost:3000`

## 🧪 Kiểm thử
1. **Truy cập trang đăng ký:** `http://localhost:3000/register`
2. **Nhập thông tin đăng ký** và nhấn **Đăng ký**, sau khi đăng ký thành công, hệ thống sẽ gửi email xác thức và chuyển đến trang nhập mã xác thực.
3. **Kiểm tra email** để nhận mã xác thực
5. **Nhập mã xác minh** để hoàn tất đăng ký

