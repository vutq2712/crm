# A. Tạo page

## 1. Giới thiệu
Như đã đề cập tại `I. Getting started/B. Folder structure.md`, `pages` và `modules` là một cặp. Trong project thông thường thì sẽ chỉ cần 1 trong 2 folder này nhưng với next.js thì sẽ cần cả 2. `pages` chứa những file khá nhỏ, chúng có nhiệm vụ routing request, khởi tạo server data và trỏ đến code trong `modules` tương ứng. `modules` là nơi chứa nhiều react component và logic chính của page.

Lí do của việc phân chia này là do Next.js sẽ coi tất cả components đặt trong folder `pages` là một page, đọc thêm https://stackoverflow.com/a/59924145.

## 2. Tạo page
```
📦src
 ┣ 📂modules
 ┃ ┣ 📂landing-page
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂landing-page-tab
 ┃ ┃ ┃ ┣ 📂landing-page-form
 ┃ ┃ ┃ ┣ 📂landing-page-preview-tab
 ┃ ┃ ┃ ┣ 📂landing-page-tab
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ 
 ┣ 📂pages
 ┃ ┣ 📂landing-page
 ┃ ┃ ┗ 📜[landingPageId].ts
```

*Routing*:  
Để tạo một tournament setting page với path là `http://localhost:3000/landing-page/:id` thì sẽ cần tạo file `📂pages/📂landing-page/📜[landingPageId].ts`.

*Module*:  
Tương ứng với file tournament setting trên sẽ có một folder tương ứng trong module:
```
 ┣ 📂landing-page
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂landing-page-tab
 ┃ ┃ ┣ 📂landing-page-form
 ┃ ┃ ┣ 📂landing-page-preview-tab
 ┃ ┃ ┣ 📂landing-page-seeding-tab
 ┃ ┣ 📂services
 ┃ ┣ 📜index.tsx
 ```

 Một page thường sẽ có cấu trúc như trên, gồm nhiều components tạo nên page và các service helper đi kèm. Những components/services này chỉ dùng cho page này nên chúng sẽ được đặt tại đây.

 ```
 Trong trường hợp muốn tạo một module có nhiều page thì hãy mở folder `pages/auth` và `modules/auth` để xem ví dụ.
 ```

 ## 3. Server side rendering
SSR được sử dụng tại đây có 2 mục đích chính:
- hỗ trợ SEO
- cải thiện tốc độ render ban đầu.

Dựa theo mục đích trên thì những page public(có thể vào mà không cần login, vd: home page,...) cần được render toàn bộ nội dung thiết yếu tại backend(nextjs), những page private(vd: user setting, ...) thì không cần thiết render toàn bộ thông tin trên server(nextjs).