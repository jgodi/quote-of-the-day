const fetch = require('node-fetch');
const args = require('optimist').argv;

const SLACK_ICON = 'https://ethicsalarms.files.wordpress.com/2017/12/sunrise.jpg';
const QUOTE_API_URL = 'http://quotes.rest/qod.json?category=inspire';
const SLACK_URL = 'https://hooks.slack.com/services/';

// Get Quote
fetch(QUOTE_API_URL)
    .then(res => res.json())
    .then(result => {
        const quote = result.contents.quotes[0];
        console.log('Quote: ', quote);
        if (args.slackHook && args.slackChannel) {
            console.log('Posting to Slack!');
            const message = {
                text: quote.quote,
                channel: args.slackChannel,
                username: `Today's Inspirational Quote -- ${quote.author}`,
                icon_url: SLACK_ICON
            };
            request.post(`${SLACK_URL}${args.slackHook}`, {
                json: message
            });
        }
    });