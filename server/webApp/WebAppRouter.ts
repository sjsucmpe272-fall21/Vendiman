import express from 'express';
import passport from 'passport'
import { Strategy as LocalStrategy }  from 'passport-local';
import { User, userModel } from './models/UserModel';

export const WebAppRouter = express.Router();

const WEB_APP_HOME_PAGE = '/supplier'

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await userModel.getUser(id);
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  console.log("Reached verify function");
  try {
    const authenticateResult = await userModel.authenticateUser(email, password);
    if (!authenticateResult) {
      return done(null, false);
    }
    console.log(authenticateResult);
    return done(null, authenticateResult);
  } catch (error: any) {
    done(error);
  }
}));

WebAppRouter.use(passport.initialize());
WebAppRouter.use(express.json());

WebAppRouter.route('/')
.get((req, res) => {
  console.log("Reached web app main route");
  res.send('Welcome to WebApp main route at: ' + req.originalUrl);
})
 
WebAppRouter.route('/login')
  .post(passport.authenticate('local'), (req, res) => {
    console.log("After authentication", req.method);
    res.status(200).send("Successfully log in");
  })

WebAppRouter.route('/logout') 
  .get((req, res) =>{
    req.logout();
    res.redirect(WEB_APP_HOME_PAGE);
  })

WebAppRouter.route('/signup')
  .post(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).send("No email, password or name");
    }
    try {
      await userModel.addUser(email, password, name);
      res.status(201).send("Successfully signed up");
    } catch(err: any) {
      res.status(409).send(err.message);
    }
  })




// Wildcard route that guard against any other weird routes
WebAppRouter.route('*')
  .get((_, res) => {
    res.redirect(WEB_APP_HOME_PAGE);
  })









