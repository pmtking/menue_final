# مرحله اول: Build کردن پروژه
FROM node:18-alpine AS builder

WORKDIR /app

# کپی package.json و package-lock.json
COPY package*.json ./

# نصب پکیج‌ها
RUN npm install --legacy-peer-deps

# کپی کل پروژه
COPY . .

# ساخت پروژه برای production
RUN npm run build

# مرحله دوم: اجرای فقط خروجی Build شده
FROM node:18-alpine

WORKDIR /app

# فقط فایل‌های لازم برای اجرای production را کپی کن
COPY --from=builder /app ./

# حذف devDependencies
RUN npm install --omit=dev --legacy-peer-deps

# اکسپوز پورت برای اجرا
EXPOSE 3000

# اجرای سرور Next.js
CMD ["npm", "start"]
