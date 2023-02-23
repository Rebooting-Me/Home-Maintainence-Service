// This function authenticates only homeowners
async function authenticateHomeowner(email, password) {
    const homeowner = await Homeowner.findOne({ email });
    if (!homeowner) {
      throw new Error('Invalid email or password');
    }
  
    const passwordMatch = await bcrypt.compare(password, homeowner.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }
  
    return homeowner;
  }
  