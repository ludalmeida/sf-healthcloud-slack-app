# Health Cloud Slack App

## Overview

This is an interactive Slack App prototype built using Slack's <a href="https://api.slack.com/block-kit" target="_blank">Block Kit UI</a> and with <a href="https://slack.dev/bolt-js/tutorial/getting-started" target="_blank">Slack's Bolt API</a> for Node.js.

Slack has excellent documentation about [planning an app](https://api.slack.com/start/planning) and [plotting out interactive flows](https://api.slack.com/start/planning/triggers). Combine that with the information from your Product Owner and UX designer, and you should be ready to code. :ship:

Before you code, we recommend clonning this repository and running the prototype on Slack so you can understand the app functionalities.

###  Get Started

:blue_book: [Find out what Slack’s platform can do](https://api.slack.com/start/overview) and read the [Block Kit](https://api.slack.com/block-kit) overview.

1. Remix this project on <a href="https://glitch.com/edit/#!/remix/sf-health?path=index.js%3A1%3A0" target="_blank">Glitch</a>
2. Create a <a href="https://slack.dev/bolt-js/tutorial/getting-started" target="_blank">Slack application</a> and configure it (I recommend creating your own workspace to run app demos)
3. Go to Slack and add your app
4. Run the slack command "/sf-health patient appointments" on the messages tab to get started.
5. Change the code to include your own <a href="https://app.slack.com/block-kit-builder/T01GST6QY0G#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22You%20have%20a%20new%20request:%5Cn*%3CfakeLink.toEmployeeProfile.com%7CFred%20Enriquez%20-%20New%20device%20request%3E*%22%7D%7D,%7B%22type%22:%22section%22,%22fields%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Type:*%5CnComputer%20(laptop)%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*When:*%5CnSubmitted%20Aut%2010%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Last%20Update:*%5CnMar%2010,%202015%20(3%20years,%205%20months)%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Reason:*%5CnAll%20vowel%20keys%20aren't%20working.%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Specs:*%5Cn%5C%22Cheetah%20Pro%2015%5C%22%20-%20Fast,%20really%20fast%5C%22%22%7D%5D%7D,%7B%22type%22:%22actions%22,%22elements%22:%5B%7B%22type%22:%22button%22,%22text%22:%7B%22type%22:%22plain_text%22,%22emoji%22:true,%22text%22:%22Approve%22%7D,%22style%22:%22primary%22,%22value%22:%22click_me_123%22%7D,%7B%22type%22:%22button%22,%22text%22:%7B%22type%22:%22plain_text%22,%22emoji%22:true,%22text%22:%22Deny%22%7D,%22style%22:%22danger%22,%22value%22:%22click_me_123%22%7D%5D%7D%5D%7D" target="_blank">Block Kit UI</a> and add your own features.

### Slack API & features used in the app

* The [`app_home_opened`](https://api.slack.com/events/app_home_opened) event gets triggered when a user opens the bot's "app home" for the first time
* The app uses the Bolt's `say` method to send a welcome message to the user

## Create a Slack App on Slack.com

To build a Slack app, create and configure a Slack app on [api.slack.com/apps](https://api.slack.com/apps) and use the settings in your code.

The **Your Apps** page is where you define the app’s capabilities (slash commands, shortcuts, interactivity, and subscribed events) and its requirements (for example, OAuth scopes).

Slack sends requests over the internet to the app to notify it when something happens to which it may respond. Since local development environments are behind the corporate firewall, Slack can't send requests to your local application server at a static URL. Therefore, you must **enable Socket Mode** for your Slack app during development.

On the Interactivity & Shortcuts page, **enable interactivity** to handle user interactions with your app's UI elements, such as buttons, menus, pickers, and modal forms. **Define shortcuts** that let people get work done—like filing a bug or adding a sales lead—while using your app in Slack.

On the Slash Commands page, **define slash commands** that enable users to interact with your app from within Slack.

Your Slack app has its own bot user that sends messages and posts content to Slack on behalf of your app. Users see these messages posted as your bot user. For your application to perform these tasks, **add OAuth scopes** that give your bot user these rights when users install your app into their workspace. On the OAuth & Permissions page, add all of the OAuth Scopes that your app needs.

:warning:**_Add all the OAuth scopes that your app needs or the app won't function._**

Your Slack app can also **subscribe to events** that occur in a workspace in which it’s installed. On the Event Subscriptions page, add each event that your application handles.

### Requirements

* A Bot User must be added to your App
* Your App must be subscribed to [Events API](https://api.slack.com/events-api)
* Your app needs to be subscribed to the events mentioned in the *Events* section

#### Scopes

* [`chat:write`](https://api.slack.com/scopes/chat:write)
* [`commands`](https://api.slack.com/scopes/commands)
* [`app_mentions:read`](https://api.slack.com/scopes/app_mentions:read)

#### Bot Events

* [`app_mention`](https://api.slack.com/events/app_mention)
* [`app_home_opened`](https://api.slack.com/events/app_home_opened)
* [`message.channels`](https://api.slack.com/events/message.channels)
* [`message.im`](https://api.slack.com/events/message.im)

More events may need to be added depending on the functionality that is implemented.

#### User Events

* [`message.app_home`](https://api.slack.com/events/message.app_home)

## Write Code to Add an Interactive Flow

You can add funcitonality to your slack app by javascript code on Glitch. Find good examples on <a href="https://slack.dev/bolt-js/concepts#message-sending" target="_blank">Bolt's concept list</a>

### Common Mistakes

1. The Home Tab and Messages Tab needs to be turned on. ![Screen Shot 2021-07-19 at 3 14 08 PM](https://user-images.githubusercontent.com/85207298/126214380-48da7d8f-aebc-4050-92cc-eac0baf831a0.png)

2. The Bot User OAuth Token needs to match your enviroment variables in Glitch ![Screen Shot 2021-07-19 at 3 17 26 PM](https://user-images.githubusercontent.com/85207298/126214941-117b4cd9-daec-4937-a49a-edde985d4884.png)



