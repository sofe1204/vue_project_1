export const COMMON_PASSWORDS = ['password', '12345', 'qwerty', 'abc123', 'admin', 'welcome', 'letmein',
     'monkey', '123123', 'password1', '123qwe', 'iloveyou', '1q2w3e4r', 'sunshine', 'qwertyuiop', 'dragon', 
     'football', '1234', 'password123']; 

 export const CRITERIA = [
        { regex: /[a-z]/, points: 2, message: "Include at least one lowercase letter." },
        { regex: /[A-Z]/, points: 2, message: "Include at least one uppercase letter." },
        { regex: /[0-9]/, points: 2, message: "Include at least one digit." },
        { regex: /[!@#\$%\^&\*]/, points: 4, message: "Include at least one special character (!@#$%^&*)." }
      ];     
