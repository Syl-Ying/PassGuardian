import User from "../models/user.js";
import sendEmailWithNodemailer from "../helpers/email.js";
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({ email }).exec().then((user) => {
        if (user) {
            return res.status(400).json({
                error: "Email has been registered",
            });
        }

        const token = jwt.sign(
            { username, email, password },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: "10m" }
        );

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "ACCOUNT ACTIVATION LINK",
            html: `
                      <h1>Please use the following link to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                      <hr />
                      <p>This email may contain sensitive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `,
        };

        sendEmailWithNodemailer(req, res, emailData);
    }).catch(err => {
        console.log("Error in finding the email");
    });

};

export const accountActivation = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                console.log("JWT verify in account activation error: ", err);
                return res.status(401).json({ error: "Expired link. Please sign up again"});
            }

            const { username, email, password } = jwt.decode(token);
            const user = new User({ username, email, password });
            user.save()
                .then(user => {
                    return res.json({
                        message: 'Signup success. Please signin.'
                    });
                })
                .catch(err => {
                    console.log('Save user in account activation error: ', err);
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    });
                });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again.'
        });
    }
};

export const signin = (req, res) => {
    const { email, password } = req.body;

    // check if user exists
    User.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: 'User with this email does not exist. Please sign up.'
                })
            }

            // authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email and password do not match!'
                })
            }

            // generate a token and send to client
            const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
            const { _id, username, email, role } = user;
            return res.json({
                token,
                user: { _id, username, email, role }
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: 'User with this email does not exist. Please sign up.'
            })
        });
}

