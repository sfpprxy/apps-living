import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send(toaddr, name, code):
    try:
        fromaddr = 'appslivingreception@outlook.com'
        # test_pass_on = ['@gmail.com', '@gmail.com', '@uni.coventry.ac.uk',
        #                 '@qq.com', '@163.com']

        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = 'Your parcel has arrived at APPS LIVING.'
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

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.office365.com', 587)
        server.starttls()
        server.login(fromaddr, '2834corporationstreet')
        text = msg.as_string()
        server.sendmail(fromaddr, toaddr, text)
        server.quit()
        return True
    except smtplib.SMTPRecipientsRefused:
        return False

# send('mandy.chen@apps-living.co.uk', 'Cui', 1234)
