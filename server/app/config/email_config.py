from fastapi_mail import ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="agrawal07ayushbansal@gmail.com",
    MAIL_PASSWORD="nquf pohi xgby zsqz",  # 🔥 use app password
    MAIL_FROM="agrawal07ayushbansal@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)