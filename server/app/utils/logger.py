from loguru import logger
import sys
import os


class Logger:
    def __init__(self):
        log_dir = "app/logs"
        log_file = f"{log_dir}/app.log"

        # folder ensure
        os.makedirs(log_dir, exist_ok=True)

        # default logger remove
        logger.remove()

        # console logging
        logger.add(
            sys.stdout,
            level="INFO",
            format="{time} | {level} | {message}"
        )

        # file logging
        logger.add(
            log_file,
            rotation="1 MB",
            retention="7 days",
            level="INFO",
            format="{time} | {level} | {message}"
        )

    def info(self, msg):
        logger.info(msg)

    def error(self, msg):
        logger.error(msg)

    def warning(self, msg):
        logger.warning(msg)

    def debug(self, msg):
        logger.debug(msg)


## singleton instance
logger_instance = Logger()