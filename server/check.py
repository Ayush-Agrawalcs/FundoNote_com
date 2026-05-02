import traceback
import sys

try:
    import app.main
except Exception as e:
    with open('err.txt', 'w', encoding='utf-8') as f:
        traceback.print_exc(file=f)
