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
Dear {name},

Your parcel has been received by APPS LIVING. To collect your parcel please do the following:

- Bring your Student ID
- Show your verification code to the member of staff

Verification Code : {code}

For students staying at Manor Park, Acacia House, Park Road or Falcon House, please collect* from the Manor Park Office which is open Monday-Friday 2pm-4pm.

*If you receive this email before 2pm, your parcel will be delivered to the Manor Park Office on the same working day.
*If you receive this email after 2pm, your parcel will be delivered to the Manor Park Office on the next working day.

For students staying at the rest of properties of APPS LIVING please collect* from the Main Office. 

Please note: If you would like someone else to collect your parcel, please send a verification message to a member of staff via WeChat: APPSLIVINGHELP

Kind Regards,

APPS LIVING
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
