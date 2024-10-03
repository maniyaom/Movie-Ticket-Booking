import emailjs from "emailjs-com";

const sendEmail = (email, url) => {
  var templateParams = {
    link: url,
    to_email: email,
  };

  emailjs
    .send(
      "<YOUR_SERVICE_ID>",
      "template_6wf9ubo",
      templateParams,
      "<YOUR_USER_ID>"
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};

export default sendEmail;
