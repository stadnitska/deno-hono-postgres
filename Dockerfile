# Используем официальный образ Deno
FROM denoland/deno:alpine

# Указываем рабочую директорию
WORKDIR /app

# Копируем все файлы проекта внутрь контейнера
COPY . .

# Открываем порт (Render сам подставит переменную PORT)
EXPOSE 8080

# Команда запуска приложения
CMD ["run", "--allow-net", "--allow-env", "app.js"]

