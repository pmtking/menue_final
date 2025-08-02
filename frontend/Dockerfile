# مرحله اول: نصب وابستگی‌ها و بیلد پروژه
FROM node:18-alpine AS builder

WORKDIR /app

# فقط package.json و lock رو کپی کن برای کش بهتر
COPY package*.json ./

RUN npm ci --legacy-peer-deps

# کپی کل پروژه
COPY . .

# بیلد پروژه (ایجاد نسخه production)
RUN npm run build

# مرحله دوم: ساخت ایمیج نهایی برای اجرا
FROM node:18-alpine

WORKDIR /app

# فقط فایل‌های ضروری از مرحله builder کپی میشن
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# اجرای سرور production
CMD ["npm", "start"]
