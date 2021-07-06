app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(welcomeMessage);
});

app.action("care_coordinator", async ({ ack, say }) => {
  await ack();
  await say(onboarding);
});

app.action("practice_with_patient", async ({ ack, say }) => {
  await ack();
  // when the text is small it's worth it to just put it in the say function
  await say(
    `OK! Let’s get started.\n Type *"/sf-health patients"* to see a list of your patients. Test it out in the message box below 👇`
  );
});