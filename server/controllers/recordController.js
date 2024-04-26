import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import Record from "../models/record.js";

export const getRecordList = async (req, res) => {
    const { _id } = req.body;

    Record.find({ _id }).exec().then((records) => {
        if (records) {
            return res.status(200).json({
                records: records,
            });
        }
    }).catch(err => {
        res.status(404).json({
            message: "There's an error getting recordlist"
        })
        console.log("Error in getting record list");
    });
};

export const getRecord = (req, res) => {
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

export const createRecord = (req, res) => {
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

export const updateRecord = (req, res) => {

};

export const deleteRecord = (req, res) => {

};