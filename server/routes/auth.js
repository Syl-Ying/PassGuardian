import express from 'express';
import { userSignupValidator, userSigninValidator } from '../validators/auth.js';
import runValidation from '../validators/index.js';
import { signup, accountActivation, signin } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

export default router;