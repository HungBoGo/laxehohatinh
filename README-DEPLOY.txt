========================================
  HƯỚNG DẪN DEPLOY LAIXEHOHATINH.COM
========================================

Files trong thư mục này đã SẴN SÀNG để deploy lên Vercel!

📁 Thư mục: d:\Lai Xe Ho\deploy
   - index.html (website chính)
   - vercel.json (config)

========================================
CÁCH 1: DEPLOY BẰNG WEB (ĐƠN GIẢN NHẤT)
========================================

Bước 1: Mở trình duyệt
   → Vào: https://vercel.com/new

Bước 2: Login
   - Click "Continue with Email" hoặc "Continue with GitHub"
   - Nhập email: [email của bạn]
   - Check email → Click link xác nhận

Bước 3: Deploy
   - Sau khi login, bạn sẽ thấy trang "Let's build something new"
   - Kéo xuống phần "Deploy with Vercel CLI" HOẶC
   - Tìm nút "Browse" / "Upload"
   - Chọn thư mục: d:\Lai Xe Ho\deploy
   - Hoặc kéo thả (drag & drop) thư mục vào trang web

Bước 4: Config (nếu hỏi)
   - Project Name: laixehohatinh
   - Framework Preset: Other
   - Build Command: (để trống)
   - Output Directory: (để trống)
   - Install Command: (để trống)

Bước 5: Click "Deploy"
   - Đợi 30 giây
   - Xong! Bạn sẽ thấy link:
     https://laixehohatinh-xxxx.vercel.app

========================================
CÁCH 2: DEPLOY BẰNG COMMAND LINE
========================================

Bước 1: Login Vercel
   1. Mở Command Prompt (cmd)
   2. Chạy: vercel login
   3. Nhập email của bạn
   4. Check email → Click link xác nhận
   5. Quay lại cmd

Bước 2: Deploy
   cd "d:\Lai Xe Ho\deploy"
   vercel

   Trả lời:
   - Set up and deploy? → YES (Y)
   - Which scope? → Chọn account của bạn
   - Link to existing project? → NO (N)
   - What's your project's name? → laixehohatinh
   - In which directory is your code located? → ./ (Enter)
   - Want to override the settings? → NO (N)

Bước 3: Lấy link
   Sau khi deploy xong, copy link Production

========================================
KẾT NỐI DOMAIN LAIXEHOHATINH.COM
========================================

Sau khi có link Vercel (VD: https://laixehohatinh-xxx.vercel.app):

1. Vào Vercel Dashboard
   https://vercel.com/dashboard

2. Click vào project "laixehohatinh"

3. Vào tab Settings → Domains

4. Thêm domain: laixehohatinh.com

5. Vercel sẽ cho bạn 2 DNS records:

   A Record:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

   CNAME Record:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

6. Vào nhà cung cấp domain (nơi bạn mua domain)
   - Tìm DNS Management / Quản lý DNS
   - Thêm 2 records trên
   - Lưu lại

7. Đợi 15-30 phút

8. Test:
   - https://laixehohatinh.com → OK!
   - https://www.laixehohatinh.com → OK!

========================================
KIỂM TRA
========================================

✅ Website có hiển thị?
✅ Hotline: 0777.13.13.55 đúng chưa?
✅ Domain: LaiXeHoHaTinh.com hiển thị đúng?
✅ Click chọn điểm trên map có hoạt động?
✅ Đặt xe thử → Có báo thành công?

========================================
HỖ TRỢ
========================================

Nếu gặp lỗi:
1. Check file README-DEPLOY.txt này
2. Xem logs trên Vercel Dashboard
3. Hỏi lại tôi với thông tin lỗi cụ thể

Vercel Docs: https://vercel.com/docs
