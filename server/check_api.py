import urllib.request, json
req = urllib.request.Request('http://localhost:8000/auth/signup', data=json.dumps({'firstName':'a','lastName':'b','email':'test1234@test.com','password':'test'*100,'service':'advance'}).encode(), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as resp:
        print('SUCCESS:', resp.read().decode())
except Exception as e:
    if hasattr(e, 'read'):
        print('ERROR:', e.code, e.read().decode())
    else:
        print('ERROR:', str(e))
