# B. Folder structure

## 1. Src folder structure
```
📦src
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜get-access-token.ts
 ┃ ┃ ┗ 📜...
 ┃ ┗ 📂...
 ┣ 📂const
 ┣ 📂crmkit
 ┣ 📂hooks
 ┣ 📂modules
 ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜login.tsx
 ┃ ┃ ┣ 📂...
 ┃ ┗ 📂...
 ┣ 📂pages
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃  ┗ 📜index.tsx  
 ┃ ┃ ┗ 📜...
 ┃ ┗ 📜...
 ┣ 📂services
 ┣ 📂styles
 ┣ 📂types
```
*Chú thích:*
- `📂api`: đây là nơi cài đặt code để call API, xem chi tiết tại mục `III. How-to wiki/D. Send request.md`
- `📂const`: là nơi chứa constant được dùng chung của project. 
- `📂crmkit`: folder này chứa những components được dùng chung **trong phạm vi project này** như `Input`, `Radio`, `Button`, ... , 
- `📂pages` và `📂modules`: thông thường thì sẽ chỉ cần 1 trong 2 folder này nhưng với next.js thì sẽ cần cả 2. `pages` chứa những file khá nhỏ, chúng có nhiệm vụ routing request, khởi tạo server data và trỏ đến code trong `modules` tương ứng.  
_(Lưu ý: mỗi file trong `pages` sẽ tương ứng với một folder trong `modules` - như ở sơ đồ bên trên, nếu `pages` có file `auth/login/index.tsx` thì `modules` sẽ có folder `auth/login.tsx`)_
- `📂services`: nếu một service có nhiệm vụ hỗ trợ component thì nó sẽ được đặt trong chính component đấy, những services còn lại - không liên quan đến component nào thì sẽ được đặt tại folder này(_ví dụ: http service_).
- `📂styles`: nơi chứa các thành phần liên quan đến UI(css, font, ...) được dùng chung cho toàn bộ project.
- `📂types`: chứa type được dùng chung, *không liên quan duy nhất* với một thành phần nào.

*Lưu ý:* tất cả components, services cần đặt trong một folder và export những thành phần cần thiết qua file `index.ts`. Encapsulation + abstraction, restrict access đến file là rất cần thiết nhưng JS lại rất yếu trong việc này, vì vậy cần có convention là chỉ được truy cập các thành phần của components/services thông qua barrel file(`index.ts`) mà không được import file khác trực tiếp.
