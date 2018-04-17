import logging
import logging.handlers

LOG_FILE = './log.log'

handler = logging.handlers.RotatingFileHandler(LOG_FILE, maxBytes=1024 * 1024, backupCount=5)
fmt = '[%(asctime)s] %(levelname)-8s - %(message)s (%(filename)s:%(lineno)s)'

formatter = logging.Formatter(fmt)
handler.setFormatter(formatter)

logger = logging.getLogger('log.log')
logger.addHandler(handler)
logger.setLevel(logging.INFO)
