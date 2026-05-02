from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def test(pw):
    try:
        res = pwd_context.hash(pw)
        print(f"Success for len {len(pw)}")
    except Exception as e:
        print(f"Error for len {len(pw)}: {e}")

test("a" * 32)
test("a" * 64)
test("a" * 71)
test("a" * 72)
test("a" * 73)
