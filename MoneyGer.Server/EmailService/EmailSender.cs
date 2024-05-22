using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;

public class EmailSender : IEmailSender
{
    private readonly EmailConfiguration _emailConfiguration;

    public EmailSender(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage, string header)
    {
        var mimeMessage = new MimeMessage();
        mimeMessage.From.Add(new MailboxAddress(_emailConfiguration.FromName, _emailConfiguration.FromAddress));
        mimeMessage.To.Add(new MailboxAddress("",email));
        mimeMessage.Subject = subject;

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = "<html>" +
                           "<head>" +
                           "<style>" +
                           "body {" +
                           "    font-family: Arial, sans-serif;" +
                           "    background-color: #f5f5f5;" +
                           "    color: #333;" +
                           "}" +
                           ".container {" +
                           "    width: 80%;" +
                           "    margin: 0 auto;" +
                           "    padding: 20px;" +
                           "    background-color: #fff;" +
                           "    border-radius: 5px;" +
                           "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" +
                           "}" +
                           "h1 {" +
                           "    color: #007bff;" +
                           "}" +
                           "p {" +
                           "    line-height: 1.6;" +
                           "}" +
                           "</style>" +
                           "</head>" +
                           "<body>" +
                           "<div class='container'>" +
                           "<h1>"+header+ "</h1>" +
                           "<p>Please click the link below to proceed with your request:</p>" +
                           htmlMessage +
                           "<p>If you didn't request this, you can safely ignore this email.</p>" +
                           "<p>Best regards,</p>" +
                           "<p><strong>MoneyGer</strong></p>" +
                           "</div>" +
                           "</body>" +
                           "</html>";;
        mimeMessage.Body = bodyBuilder.ToMessageBody();
        
        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, _emailConfiguration.UseSsl);
            await client.AuthenticateAsync(_emailConfiguration.Username, _emailConfiguration.Password);
            await client.SendAsync(mimeMessage);
            await client.DisconnectAsync(true);
        }
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        throw new NotImplementedException();
    }
}