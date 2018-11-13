import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send(toaddr, name, code):
    try:
        fromaddr = 'appslivingreception@gmail.com'
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

Alternatively, if you live in the following buildings:
-       Manor Park
-       Falcon House
-       Acacia House  
then you are able to collect your parcel between 2pm-4pm every Wednesdays and Thursdays from the Manor Park Office. If you would like to receive before this day or at any other time, then you are able to collect from our main office at APPS LIVING HQ during opening hours. 


Verification Code : {code}


Please note: If you would like someone else to collect your parcel, please send a verification message to a member of staff. 


Kind Regards,

Student Service Team
        """.format(name=name, code=code)
        print(body)

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(fromaddr, 'receptionappsliving')
        text = msg.as_string()
        server.sendmail(fromaddr, toaddr, text)
        server.quit()
        return True
    except smtplib.SMTPRecipientsRefused:
        return False

# send('mandy.chen@apps-living.co.uk', 'Cui', 1234)
