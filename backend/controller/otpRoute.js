const User = require("../model/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vanshamaggarwal697@gmail.com",
    pass: "wmtn fkpv fytt clrw",
  },
});

exports.otpSignUp = async (req, res) => {
  try {
    const { email } = req.body;

    const login = await User.findOne({ email: email });
    if (login) {
      return res.status(400).json({ msg: "User already registered" });
    } else {
      const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
      var mailOptions = {
        from: "vanshamaggarwal697@gmail.com",
        to: email,
        subject: "Verification from mailieft",
        text: `Your OTP is: ${otp}
Regards,
Mailiefy
                `,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(400).json({ msg: err, msg1: "not working" });
        } else {
          return res.status(200).json({ otp: otp, msg: "otp" });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ msg: "failed" });
  }
};

exports.otpLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const login = await User.findOne({ email: email });

    if (login) {
      const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
      var mailOptions = {
        from: "vanshamaggarwal697@gmail.com",
        to: email,
        subject: "Verification from mailieft",
        text: `Your OTP is: ${otp}
    Regards,
    Mailiefy
                    `,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(400).json({ msg: err, msg1: "not working" });
        } else {
          return res.status(200).json({ otp: otp, msg: "otp" });
        }
      });
    }
    else
    {
        return res.status(400).json({ msg:"User does not exist" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "failed" });
  }
};
