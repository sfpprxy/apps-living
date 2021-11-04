import requests


def send(toaddr, name, code):
    try:
        # test_pass_on = ['@gmail.com', '@qq.com']

        # indent due to python multi-line string
        body = """
Dear Student,


Your parcel has been delivered to our main office (APPS LIVING HQ). To collect your parcel please do the following:

-       Bring your student ID 
-       Show reception your verification code

Verification Code : {code}


Please see below for parcel collection times;

Monday - Friday
10:00am - 16:00pm

If you cannot collect your parcel at this time, please contact our Student Services team to re-arrange. 

There may be other students collecting their parcels at the same time.
Please form a queue outside the APPS LIVING office and take in to consideration the social distancing guidelines set out by the UK government.

We will look forward to seeing you.

King Regards,

Reception
APPS LIVING
        """.format(name=name, code=code)
        print(body)
        payload = {'appid': 'appid',
                   'signature': 'appkey',
                   'to': toaddr,
                   'from': 'appsliving-reception@asdk.io',
                   'subject': 'Your parcel has arrived at APPS LIVING.',
                   'text': body}

        r = requests.post('https://api.mysubmail.com/mail/send.json', payload)
        if r.json().get('status') == 'success':
            return True
        else:
            print(r.text)
            return False
    except Exception:
        return False


# send('diu', 'diu', 1233)
