const { App } = require("@slack/bolt");
const apiUrl = "https://slack.com/api";
const homeTab = require("./views/homeTab/homeTab");
const homeTabConnected = require("./views/homeTab/homeTabConnected");
const connectToSalesforce = require("./views/homeTab/connectToSalesforce");
const disconnectAccount = require("./views/homeTab/disconnectAccount");
const editMedication = require("./views/patientMedications/editMedications");
const onboarding = require("./views/onboarding/onboarding");
const helpCommand = require("./views/runCommandFiles/helpCommand");
const patientSummaryCommand = require("./views/runCommandFiles/patientSummary");
const todaysTasks = require("./views/patientTasks/todaysTasks");
const viewTask = require("./views/patientTasks/viewTask");
const createTask = require("./views/patientTasks/createTask");
const taskCreated = require("./views/patientTasks/taskCreated");
const editTask = require("./views/patientTasks/editTask");
const deleteTask = require("./views/patientTasks/deleteTask");
const allergiesList = require("./views/patientAllergies/allergiesList");
const selectPatientAllergies = require("./views/patientAllergies/patientSelectAllergies");
const immunizationsList = require("./views/patientImmunizations/immunizationsList");
const selectPatientImmunizations = require("./views/patientImmunizations/selectPatientImmunizations");
const sdohList = require("./views/patientSDOH/sdohList");
const selectPatientSdoh = require("./views/patientSDOH/selectPatientSdoh");
const referPatient = require("./views/patientReferrals/referralsList");
const selectPatientConditions = require("./views/patientConditions/selectPatientConditions");
const conditionsList = require("./views/patientConditions/conditionsList");
const diagnosisList = require("./views/patientDiagnosis/diagnosisList");
const selectPatientDiagnosis = require("./views/patientDiagnosis/selectPatientDiagnosis");
const patientSummary = require("./views/patientSummary/patientSummary");
const singlePatient = require("./views/patientSummary/singlePatient");
const singlePatientOpt2 = require("./views/patientSummary/singlePatient-opt2");
const editPatientDetails = require("./views/patientSummary/editPatientDetails");
const editPatientContactInfo = require("./views/patientSummary/editPatientContactInfo");
const todaysAppointments = require("./views/patientAppointments/todaysAppointments");
const createAppointment = require("./views/patientAppointments/createAppointment");
const editAppointment = require("./views/patientAppointments/editAppointment");
const medicationList = require("./views/patientMedications/medicationList");
const selectPatientMedications = require("./views/patientMedications/selectPatientMedications");
const providerList = require("./views/patientProvider/providerList");
const selectPatientProvider = require("./views/patientProvider/selectPatientProvider");
const selectPatientCareplans = require("./views/patientCareplans/selectPatientCareplans");
const careplansList = require("./views/patientCareplans/careplansList");
const selectPatientCarerequests = require("./views/patientCareRequests/selectPatientCarerequests");
const carerequestsList = require("./views/patientCareRequests/carerequestsList");
const selectPatientReferrals = require("./views/patientReferrals/selectPatientReferrals");
const referralsList = require("./views/patientReferrals/referralsList");
const acceptReferral = require("./views/patientReferrals/acceptReferral");
const rejectReferral = require("./views/patientReferrals/rejectReferral");
const deleteReferral = require("./views/patientReferrals/deleteReferral");
const encountersList = require("./views/patientEncounters/encountersList");
const deleteEncounter = require("./views/patientEncounters/deleteEncounter");
const createEncounter = require("./views/patientEncounters/createEncounter");
const editEncounter = require("./views/patientEncounters/editEncounter");
const todaysTasksHomeTab = require("./views/runCommandFiles/todaysTasks");
const selectPatientSummary = require("./views/patientSummary/selectPatientSummary");
const selectPatientEncounters = require("./views/patientEncounters/selectPatientEncounters");
const createNewReferral = require("./views/patientReferrals/createNewReferral");
const patientAppointments = require("./views/runCommandFiles/patientAppointments");
const deleteMedication = require("./views/patientMedications/deleteMedication");
const assignMedication = require("./views/patientMedications/assignMedication");
const assignProvider = require("./views/patientProvider/assignProvider");
const assignAllergy = require("./views/patientAllergies/assignAllergy");
const createDiagnosis = require("./views/patientDiagnosis/createDiagnosis");
const editReferral = require("./views/patientReferrals/editReferral");
const editProvider = require("./views/patientProvider/editProvider");
const deleteProvider = require("./views/patientProvider/deleteProvider");
const viewAppointment = require("./views/patientAppointments/viewAppointment");

const helpList = require("./views/help");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

/* TODO: Create new files with the different interactions to avoid confusion. */

// This array is to store users that click to connect to Salesforce
let connectedUsers = [];

app.event("app_home_opened", async ({ event, say, user, context, body }) => {
  // check if user is connected

  if (connectedUsers.includes(event.user)) {
    try {
      const result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: homeTabConnected
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: homeTab
      });
    } catch (e) {
      console.error(e);
    }
  }
});

app.action("view_patient_summary", async ({ ack, client, body }) => {
  await ack();
  try {
    // whole lot of logic right here
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: singlePatient
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("view_patient_summary_2", async ({ ack, say }) => {
  await ack();
  try {
    await say(singlePatientOpt2);
  } catch (error) {
    console.error(error);
  }
});

app.action("edit_patient_details", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: editPatientDetails
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("assign_medication", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: assignMedication
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("create_diagnosis", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createDiagnosis
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("assign_allergy", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: assignAllergy
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("assign_provider", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: assignProvider
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("view_medications", async ({ ack, body, client }) => {
  await ack();
  try {
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: medicationList
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("create_encounter_button", async ({ ack, body, client }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createEncounter
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("view_encounters", async ({ ack, body, client }) => {
  await ack();
  try {
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: encountersList
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("refer_patient", async ({ ack, /*DOUGsay*/ body, client }) => {
  await ack();
  try {
    //DOUGawait say(referPatient);
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createNewReferral
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("referral_options", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "reject_referral":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: rejectReferral
        });
        break;
      case "accept_referral":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: acceptReferral
        });
        break;
      case "edit_referral":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editReferral
        });
        break;
      case "delete_referral":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: deleteReferral
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action("edit_delete_provider", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "edit_provider":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editProvider
        });
        break;
      case "delete_provider":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: deleteProvider
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action("edit_delete_encounter", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "edit_encounter":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editEncounter
        });
        break;
      case "delete_encounter":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: deleteEncounter
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action("edit_refer_patient", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "edit_patient_detail":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editPatientDetails
        });
        break;
      case "refer_patient":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: referralsList
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action("edit_delete_medication", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "edit_medication":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editMedication
        });
        break;
      case "delete_medication":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: deleteMedication
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action(
  "view_more_appointments_home_tab",
  async ({ ack, client, action, body, user }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: body.user.id,
        text: "Appointments for June 1, 2021",
        blocks: patientAppointments
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "view_more_tasks_home_tab",
  async ({ ack, client, action, body, user }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: body.user.id,
        text: "Tasks for June 1, 2021",
        blocks: todaysTasksHomeTab
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action("view_providers", async ({ ack, client, action, body, user }) => {
  await ack();
  try {
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: providerList
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("single_patient_options", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "view_provider":
        await client.chat.postMessage({
          channel: body.user.id,
          blocks: providerList
        });
        break;
      case "view_allergies":
        await client.chat.postMessage({
          channel: body.user.id,
          blocks: allergiesList
        });
        break;
      case "view_diagnoses":
        await client.chat.postMessage({
          channel: body.user.id,
          blocks: diagnosisList
        });
        break;
      case "view_immunizations":
        await client.chat.postMessage({
          channel: body.user.id,
          blocks: immunizationsList
        });
        break;
      case "view_social_determinants":
        await client.chat.postMessage({
          channel: body.user.id,
          blocks: sdohList
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action("select_demo_contact_insurance", async ({ ack, body, say }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "demographic_info":
        break;
      case "contact_info":
        console.log("you made it");
        break;
      case "insurance_info":
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.view(
  { callback_id: "connect_to_salesforce_modal" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();

    // add user to array of connected users
    connectedUsers.push(body.user.id);

    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: homeTabConnected
    });
  }
);

app.view(
  { callback_id: "edit_patient_demographic_info_modal" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: taskCreated
    });
  }
);

app.view(
  { callback_id: "select_patient_summary_modal" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: singlePatient
    });
  }
);

app.view(
  { callback_id: "create_new_appointment" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "Okay, appointment was created. \n\n *New Appointment* \n *Patient:*  Charles Green DOB: 06/23/1963 \n *Provider:* Dr. Amy Huffman \n *Appointment Date:* June 28th, 2021 \n *Appointment Time:* 1:37 PM "
          }
        }
      ]
    });
  }
);

app.view(
  { callback_id: "disconnect_account_modal" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();

    // remove user from array of connected users
    let index = connectedUsers.indexOf(body.user.id);
    connectedUsers.splice(index);

    console.log(connectedUsers);

    await client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: homeTab
    });
  }
);

app.view(
  { callback_id: "edit_patient_details_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    const selected_value = body.view.blocks[2].elements[0].options[0].value;

    console.log(body.view.state.values);

    await client.views.open({
      trigger_id: body.trigger_id,
      view: editPatientContactInfo
    });
  }
);

app.view(
  { callback_id: "create_task_modal" },
  async ({ ack, body, view, client, context, user }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: taskCreated
    });
  }
);

// this is temporary to help any button be submmited without an error and no action after the click
app.view("", async ({ ack, say }) => {
  await ack();
  console.log("button submitted");
});

app.view(
  { callback_id: "select_patient_provider_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: providerList
    });
  }
);

app.view(
  { callback_id: "select_patient_encounters_modal" },
  async ({ ack, body, say, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: encountersList
    });
  }
);

app.view(
  { callback_id: "select_patient_careplans_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: careplansList
    });
  }
);

app.view(
  { callback_id: "select_patient_sdoh_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: sdohList
    });
  }
);

app.view(
  { callback_id: "select_patient_conditions_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: conditionsList
    });
  }
);

app.view(
  { callback_id: "select_patient_referrals_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: referralsList
    });
  }
);

// app.view(
//   { callback_id: "reject_referral_modal" },
//   async ({ ack, body, view, client }) => {
//     await ack();
//     await client.views.open({
//       trigger_id: body.trigger_id,
//       view:
//     });
//   }
// );

app.view(
  { callback_id: "select_patient_immunizations_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: immunizationsList
    });
  }
);

app.view(
  { callback_id: "select_patient_carerequests_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: carerequestsList
    });
  }
);

app.view(
  { callback_id: "select_patient_medications_modal" },
  async ({ ack, body, view, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: medicationList
    });
  }
);

app.view(
  { callback_id: "select_patient_allergy" },
  async ({ ack, say, client, body, channel }) => {
    console.log(body);

    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: allergiesList
    });
  }
);

app.view(
  { callback_id: "select_patient_diagnosis_modal" },
  async ({ ack, say, client, body }) => {
    await ack();
    await client.chat.postMessage({
      channel: body.user.id,
      blocks: diagnosisList
    });
  }
);

app.action("create_task_button", async ({ ack, client, body, say }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createTask
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("create_task", async ({ ack, client, body, say }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createTask
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("create_new_appointment", async ({ ack, client, body, say }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createAppointment
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("view_edit_delete_task", async ({ ack, body, say, client }) => {
  const selected_value = body.actions[0].selected_option.value;
  await ack();
  try {
    switch (selected_value) {
      case "view_task":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: viewTask
        });
        break;
      case "edit_task":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: editTask
        });
        break;
      case "delete_task":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: deleteTask
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.action(
  "view_edit_delete_appointment",
  async ({ ack, body, say, client }) => {
    const selected_value = body.actions[0].selected_option.value;
    await ack();
    try {
      switch (selected_value) {
        case "view_appointment":
          await client.views.open({
            trigger_id: body.trigger_id,
            view: viewTask
          });
          break;
        case "edit_appointment":
          await client.views.open({
            trigger_id: body.trigger_id,
            view: editAppointment
          });
          break;
        case "delete_appointment":
          await client.views.open({
            trigger_id: body.trigger_id,
            view: deleteTask
          });
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "edit_patient_demographic_info_modal",
  async ({ ack, client, action, body, user }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: body.user.id,
        text: "/sf-health patients",
        blocks: patientSummaryCommand
      });
    } catch (error) {
      console.error(error);
    }
  }
);

/* TODO: Create functions to open modals instead of using try catch every time */
app.action("connect_to_salesforce", async ({ ack, client, action, body }) => {
  await ack();
  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: connectToSalesforce
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("disconnect_account", async ({ ack, client, action, body }) => {
  await ack();
  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: disconnectAccount
    });
  } catch (error) {
    console.error(error);
  }
});

// Start commands on Home Tab
app.action(
  "run_command_patients",
  async ({ ack, client, action, body, user }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: body.user.id,
        text: "/sf-health patients",
        blocks: patientSummaryCommand
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_tasks",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await say(todaysTasks);
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_appointments",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await say(todaysAppointments);
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_summary",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientSummary
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_allergies",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientAllergies
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_providers",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientProvider
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_medications",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientMedications
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_immunizations",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientImmunizations
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_diagnosis",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientDiagnosis
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_sdoh",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientSdoh
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_conditions",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientConditions
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_encounters",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientEncounters
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_careplans",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientCareplans
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_carerequests",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientCarerequests
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action(
  "run_command_patient_referrals",
  async ({ ack, client, action, body, say }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: selectPatientReferrals
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.action("run_command_help", async ({ ack, client, action, body, user }) => {
  await ack();
  try {
    const result = await client.chat.postMessage({
      channel: body.user.id,
      text: "/sf-health help",
      blocks: helpCommand
    });
  } catch (error) {
    console.error(error);
  }
});

// TODO: Make the body.text not case sensitive
app.command("/sf-health", async ({ client, ack, say, body }) => {
  // Acknowledge the command request
  await ack();

  try {
    switch (body.text) {
      case "patients":
        await say(patientSummary);
        break;
      case "patient summary":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientSummary
        });
        break;
      case "patient tasks":
        await say(todaysTasks);
        break;
      case "patient tasks today":
        await say(todaysTasks);
        break;
      case "help":
        await say(helpList);
        break;
      case "patient appointments":
        await say(todaysAppointments);
        break;
      case "patient providers":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientProvider
        });
        break;
      case "patient allergies":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientAllergies
        });
        break;
      case "patient medications":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientMedications
        });
        break;
      case "patient immunizations":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientImmunizations
        });
        break;
      case "patient diagnosis":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientDiagnosis
        });
        break;
      case "patient conditions":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientConditions
        });
        break;
      case "patient sdoh":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientSdoh
        });
        break;
      case "patient careplans":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientCareplans
        });
        break;
      case "patient carerequests":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientCarerequests
        });
        break;
      case "patient referrals":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientReferrals
        });
        break;
      case "patient encounters":
        await client.views.open({
          trigger_id: body.trigger_id,
          view: selectPatientEncounters
        });
        break;
      default:
        await say(helpList);
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

app.message("hello", async ({ message, say }) => {
  console.log(message.user);
  // this is michaels id for test
  await say(`Hello, <@${"U01FTQNAD55"}>`);
});

// testing notifications
// var MY_SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
// var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

// slack.bug('Something bad happened!'); // Posts to #bugs by default
// slack.success('Something good happened!'); // Posts to #alerts by default
// slack.alert('Something important happened!'); // Posts to #alerts by default
// slack.note('Here is a note.'); // Posts to #alerts by default

// slack.send({
//   channel: '#myCustomChannelName',
//   icon_url: 'http://example.com/my-icon.png',
//   text: 'Here is my notification',
//   unfurl_links: 1,
//   username: 'Jimmy'
// });

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
