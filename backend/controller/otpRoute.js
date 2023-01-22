const fast2sms = require("fast-two-sms");
const User = require("../model/userModel");
exports.otpSignUp = async (req, res) => {
    try 
    {
        const {number} = req.body;

        const login = await User.findOne({mobileNum : number})

        if(login)
        {
            return res.status(400).json({msg : "User already registered"})
        }
        else
        {
            const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
            var options = {
              authorization: "KXymvztPUxH9biCd5j4LMaYpRBQ31wVl0csfSZ7h2IAu6WToOrnt0WqdUgZuB1SfLPsAVwE28XJo9CrI",
              message: `${otp}. Message from Mailiefy! Enter the number to register.`,
              numbers: [number],
            };
            // send this message
            fast2sms.sendMessage(options)
            .then((response) => {console.log(response, "sms sent");})
            .catch((error) => {console.log(error);});
            return res.status(200).json({otp:otp,msg:"otp"})
        }
    } 
    catch (error) 
    {
        return res.status(400).json({msg:"failed"})
    }
};

exports.otpLogin = async (req,res) => {
    try 
    {
        const {number} = req.body;

        const login = await User.findOne({mobileNum : number})

        if(login)
        {
            const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
            var options = {
              authorization: "KXymvztPUxH9biCd5j4LMaYpRBQ31wVl0csfSZ7h2IAu6WToOrnt0WqdUgZuB1SfLPsAVwE28XJo9CrI",
              message: `${otp}. Message from Whatiefy! Enter the number to register.`,
              numbers: [number],
            };
            // send this message
            fast2sms.sendMessage(options)
            .then((response) => {console.log(response, "sms sent");})
            .catch((error) => {console.log(error);});
            return res.status(200).json({otp:otp,msg:"otp"})
        }
        else
        {
            return res.status(400).json({msg : "Mobile Number not found, Please Register!"})
        }
    } 
    catch (error) 
    {
        return res.status(400).json({msg:"failed"})
    }
}