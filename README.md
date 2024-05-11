# PassGuardian
PassGuardian is a password management website. You can use it to create, edit, delete and share your website credentials securely.
Website: 
It may take a while to open the website for the first time since the deployment uses render's free service.
## Web Preview
![Web Email Registration]()
![Web HomePage]()
![Web PasswordPage]()
## Mobile Preview
![Mobile HomePage]()
![Mobile PasswordPage]()
## Features
- **JWT Authentication:** PassGuardian uses JWT tokens and cookies to remember the user's sign-in status securely.
- **Responsive Design:** Enjoy a seamless experience across both mobile and web platforms with PassGuardian's responsive design.
- **Encrypted Password Storage:** Password lists are securely stored in MongoDB, encrypted using crypto and Advanced Encryption Standard (AES) 256 CTR algorithms to ensure maximum security.
- **Auto-generate Passwords:** PassGuardian offers a convenient feature to auto-generate strong passwords for your accounts.
- **Copy and Obfuscate Passwords:** Easily copy passwords to your clipboard for quick use and obscure them from prying eyes for added security.
- **Password Sharing:** Share passwords securely with other users, allowing for convenient collaboration while maintaining data security.

   
## Installation
1. Clone the repository to your local machine: git clone
2. Navigate to the project directory
3. Install dependencies: npm install
4. Start the application: npm run dev

## Future Improvements
- Move password details (username, password, lastUpdated) from Passwordlist page to PasswordRecord Page
- Share password
- Search Password
- Forgot profile password
- Edit profile
    
