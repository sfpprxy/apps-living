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
        body = ('Dear ' + name + ',\n\n'
                'You have a parcel arrived at our office, please bring your ID or verification code to collect.' '\n\n'
                'Verification Code: ' + code + '\n\n'
                'Kind Regards,\n\n'
                'APPS Living Service Team')
        new_body = """
        Dear {name},
        
        Your parcel has been delivered to our main office. To collect your parcel please do the
        following:
        - Bring your Student ID
        - Show reception your verification code
        
        Verification Code : {code}
        
        Please note : If you would like someone else to collect your parcel, please send a verification
        message to a member of staff.
        
        Kind Regards,
        
        Student Service Team
        APPS LIVING
        """.format(name=name, code=code)

        msg.attach(MIMEText(new_body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(fromaddr, 'receptionappsliving')
        text = msg.as_string()
        server.sendmail(fromaddr, toaddr, text)
        server.quit()
        return True
    except smtplib.SMTPRecipientsRefused:
        return False

