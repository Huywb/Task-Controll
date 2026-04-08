#  Task-Controll - Hệ thống Quản lý Công việc Thông minh

**Task-Controll** là một ứng dụng quản lý công việc (Task Management) toàn diện, giúp người dùng và quản trị viên theo dõi, phân phối và báo cáo tiến độ công việc một cách trực quan thông qua các biểu đồ và giao diện hiện đại.

---

##  Tech Stack

### **Frontend**
* **Framework:** React.js
* **Styling:** TailwindCSS
* **Charts:** Recharts (Trực quan hóa dữ liệu Dashboard)
* **State Management:** Zustand
* **Networking:** Axios
* **Routing:** React Router

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT (JSON Web Token) Authentication
* **Report:** ExcelJS (Xuất báo cáo định dạng Excel)

---

##  Cấu trúc Dự án

```text
Task-Controll
│
├── client (Frontend)
│   ├── src
│   │   ├── assets       # Hình ảnh, icons
│   │   ├── components   # Các component dùng chung (input, layouts...)
│   │   ├── context      # Quản lý context API
│   │   ├── hooks        # Custom hooks
│   │   ├── pages        # Trang Admin, Auth, User
│   │   ├── routes       # Cấu hình định tuyến
│   │   ├── utils        # Hàm tiện ích
│   │   └── App.jsx      # Component chính
│
├── server (Backend)
│   ├── configs          # Cấu hình Database, biến môi trường
│   ├── controller       # Xử lý logic nghiệp vụ
│   ├── middleware       # Kiểm tra quyền, xác thực người dùng
│   ├── mode             # Định nghĩa Schema MongoDB
│   ├── routes           # Định nghĩa các API Endpoints
│   ├── uploads          # Lưu trữ tệp tin đính kèm
│   └── server.js        # File chạy server chính


```
## Screenshots
Dashboard
Hiển thị tổng quan phân bổ công việc và mức độ ưu tiên thông qua biểu đồ.
![Dashboard](https://github.com/user-attachments/assets/bc27564c-22bc-401b-9445-f248c3c17a97)

## Hướng dẫn Cài đặt

  git clone [https://github.com/Huywb/Task-Controll.git](https://github.com/Huywb/Task-Controll.git)
  
## Client:
  cd client
  npm install
  
## Server:
  cd ../server
  npm install
## Thiết lập biến môi trường (.env)

 - PORT=8000
 - MONGO_URL=your_mongodb_url
 - JWT_SECRET=your_secret_key
 - ADMIN_INVITE_TOKEN=4588944  # Key để chuyển đổi vai trò thành Admin
 - CLIENT_URL=http://localhost:5173

## Kết quả đạt được (Key Learning Outcomes)
- Thiết kế hệ thống RESTful API chuẩn.
- Bảo mật và xác thực người dùng với JWT Authentication.
- Thiết kế cấu trúc dữ liệu với MongoDB.
- Trực quan hóa dữ liệu Dashboard với Recharts.
- Xử lý tải lên tệp tin và xuất báo cáo công việc ra Excel.
- Quản lý state hiệu quả bằng Zustand.
- Xây dựng UI hiện đại, responsive với TailwindCSS.
- Kiểm soát quyền truy cập dựa trên vai trò (Role-based access control).
