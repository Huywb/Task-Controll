# 🚀 Task-Controll - Hệ thống Quản lý Công việc Thông minh

**Task-Controll** là một ứng dụng quản lý công việc (Task Management) toàn diện, giúp người dùng và quản trị viên theo dõi, phân phối và báo cáo tiến độ công việc một cách trực quan thông qua các biểu đồ và giao diện hiện đại.

---

## 🛠 Tech Stack

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

## 📁 Cấu trúc Dự án

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
