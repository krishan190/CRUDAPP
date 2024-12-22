import User from "../model/userModel.js";

// For Posting new user into Database
export const create = async (req, res) => {
  try {
    // Basic validation: Check if required fields are present
    // NOT For Tutorial

    // const requiredFields = ["name", "email", "address"];
    // for (const field of requiredFields) {
    //   if (!req.body[field]) {
    //     return res.status(400).json({ message: `${field} is required.` });
    //   }
    // }

    // Create user instance and save to the database
    const newUser = new User(req.body);
    // const email = newUser.email;  this is equivalent to above code.
    const { email } = newUser; //destrcturing code
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already Exist." });
    }
    const savedData = await newUser.save();
    // Return the saved user data in the response
    // res.status(200).json(savedData);
    // This Added only for displaying in toast
    res.status(200).json({ message: "User Created Successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// For getting all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// For getting user by id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User Updated Successfully." });
  } catch (error) {
   
    res.status(500).json({ errorMessage: error.message });
  }
};

// For deleting user from database
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
