const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 8 characters, at least one letter and one number , and one special character , one uppercase letter
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validateAuth = (fields = []) => {
    return (req, res, next) => {
      const { userName, email, password , content } = req.body;
      const errors = [];
  
      if (fields.includes("userName")) {
        if (!userName) {
          errors.push("User name is required");
        }
      }
  
      if (fields.includes("email")) {
        if (!email) {
          errors.push("Email is required");
        } else if (!emailRegex.test(email)) {
          errors.push("Email is invalid");
        }
      }
  
      if (fields.includes("password")) {
        if (!password) {
          errors.push("Password is required");
        } else if (!passwordRegex.test(password)) {
          errors.push(
            "Password must be at least 8 characters long, contain at least one letter, one number, and one special character."
          );
        }
      }

      if(fields.includes("content")){
        if (!content) {
          errors.push("Content is required");
        } else if (content.length < 10) {
          errors.push("Content must be at least 10 characters long");
        }
      }
  
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
  
      next();
    };
  };
  
export default validateAuth;
  