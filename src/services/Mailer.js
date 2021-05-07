const sendgrid = require('sendgrid');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor(recipients, content) {
    console.log(process.env.SENDGRID_KEY);
    console.log(recipients);
    super();
    this.sgApi = sendgrid(process.env.SENDGRID_KEY);
    this.from_email = new helper.Email('admin@hourhub.se');
    this.subject = 'Information från Hourhub';
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addClickTracking();
    this.addContent(this.body);
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      console.log(email);
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const req = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });
    console.log(req);
    try {
      const res = this.sgApi.API(req);
      console.log(res, 'res');
      return res;
    } catch (e) {
      console.error(e);
      if (e.response) {
        console.error(e.response.body);
      }
    }
  }
}

module.exports = Mailer;
