# 🎮 PGame - Nền Tảng Web Game Remake Kinh Điển

> **Domain:** [https://PGame.dragon9468.com](https://PGame.dragon9468.com)  
> Hồi sinh thời kỳ hoàng kim của các cổng web game huyền thoại Việt Nam (**Zing Me, GameVui, 24h, Flash Classics**).

---

## 🌟 Tính Năng Nổi Bật

1. **Chơi ngay trên trình duyệt (Web & Mobile):**
   - Tích hợp sẵn engine giả lập Flash WebAssembly (**Ruffle**), không cần cài Flash Player hay trình duyệt cũ.
   - Hỗ trợ khóa tỷ lệ chuẩn 16:9, toàn màn hình và hỗ trợ điều khiển trên điện thoại lẫn máy tính.
2. **Tải về máy tiện lợi:**
   - Hỗ trợ tải trực tiếp file APK Android và bản Standalone cho PC Windows.
   - Tích hợp mã QR quét trực tiếp từ điện thoại để mở game ngay lập tức.
3. **PWA (Progressive Web App):**
   - Người dùng có thể nhấn **"Cài App (PWA)"** hoặc **"Thêm vào màn hình chính"** trên điện thoại để mở game như một ứng dụng gốc mà không cần duyệt app store hay xác thực chữ ký bên thứ 3.
4. **Hệ thống mở rộng đa tựa game (Multi-game Portal):**
   - Game mở màn: **Đế Chế GameVui (The Imperium Remake v2.0)** - Việt hóa 100%, nâng cấp cơ chế AI 4 độ khó, viện trợ nhân lực.
   - Sẵn sàng tích hợp các huyền thoại tiếp theo: *Nông Trại Vui Vẻ, Hàng Rong Online, Khu Vườn Trên Mây, v.v.*

---

## 🚀 Hướng Dẫn Kết Nối Cloudflare Pages (Miễn Phí 100%)

Trang web này được xây dựng hoàn toàn bằng static assets, tương thích 100% với **Cloudflare Pages** (Băng thông không giới hạn, SSL miễn phí, CDN toàn cầu):

1. Đăng nhập vào trang quản trị [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Vào mục **Workers & Pages** -> Chọn **Create application** -> Tab **Pages** -> **Connect to Git**.
3. Chọn tài khoản GitHub `Dragon9468` và cấp quyền cho repo **`Dragon9468/PGame`**.
4. Cấu hình triển khai:
   - **Project name:** `pgame`
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(Để trống)*
   - **Build output directory:** `/` *(hoặc để trống)*
5. Nhấn **Save and Deploy**. Cloudflare sẽ tự động build trang web trong ~10 giây.
6. **Gắn tên miền con `PGame.dragon9468.com`:**
   - Sau khi deploy xong, vào mục **Custom domains** của project Pages.
   - Nhấn **Set up a custom domain** -> Nhập: `PGame.dragon9468.com`.
   - Vì tên miền `dragon9468.com` đã nằm trên tài khoản Cloudflare của bạn, hệ thống sẽ tự động thêm bản ghi DNS CNAME và cấp chứng chỉ SSL HTTPS hoàn toàn tự động chỉ trong 1 cú click!
