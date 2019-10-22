//get data
db.collection('products').get().then(snapshot => {
    console.log(snapshot.docs);
});

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('user logged in', user);
    } else {
        console.log('user logged out');
    }
});

//let user see
/*const accountForm = document.querySelector('#modal-account');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('je hebt op account geklikt');
});*/

//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        
    });
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close the login modal and reset
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});