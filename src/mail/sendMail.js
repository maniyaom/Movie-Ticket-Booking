import emailjs from "emailjs-com";

const sendEmail = (email, url) => {
  var templateParams = {
    link: url,
    to_email: email,
  };

  emailjs.send("service_zaqu6de", "template_6wf9ubo", templateParams, {
    publicKey: "l7yYDugauYC9Exay2",
    privateKey: "u9Apf6hrNkPjR5OiKdDtk",
  });
};

export default sendEmail;
