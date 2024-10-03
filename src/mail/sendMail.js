import emailjs from "emailjs-com";

const sendEmail = (email, url) => {
  var templateParams = {
    link: url,
    to_email: email,
  };

  emailjs
    .send(
      "service_ilo8yko",
      "template_6wf9ubo",
      templateParams,
      "WvxgL3c2U8vG-7VKg"
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
