import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Get all users
export const getUsers = async (req, res) => {
  const userInSession = req.userInfo;
  try {
    if (userInSession.isAdmin === true) {
      const users = await userSchema.find();
      return res.status(200).json(users);
    } else {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas administrateur" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

//Get a user
export const getUser = async (req, res) => {
  try {
    const userInSession = req.userInfo;
    const getUser = await userSchema.findById({ _id: req.params.id });

    if (!getUser) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    if (
      userInSession.id !== getUser._id.toString() &&
      userInSession.isAdmin === false
    ) {
      return res
        .status(401)
        .json({ message: "Vous ne pouvez pas obtenir cet utilisateur" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

//Register a user
export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    street,
    city,
    postalCode,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "L'utilisateur existe déja!" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas!" });

    const hashedPsw = await bcrypt.hash(password, 12);
    const address = `${street} - ${postalCode} ${city}`;

    const userToCreate = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPsw,
      address,
    });

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //Envoi du token vers le front
    res.status(200).json({ result: userToCreate, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur de serveur" });
  }
};

//Login a user
export const Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "L'utilisateur n'existe pas!" });

    const isValidPsw = await bcrypt.compare(password, existingUser.password);
    if (!isValidPsw)
      return res.status(400).json({ message: "Le mot de passe est incorrect" });

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );
    //Envoi du token vers le front
    res.status(200).json({ result: existingUser, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur de serveur" });
  }
};

//Update a user
export const updateUser = async (req, res) => {
  try {
    const userInSession = req.userInfo;
    const getUser = await userSchema.findById({ _id: req.params.id });

    if (!getUser) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    if (userInSession.id !== getUser._id.toString()) {
      return res
        .status(401)
        .json({ message: "Vous ne pouvez pas obtenir cet utilisateur" });
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body, {new : true}
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

//Delete a user
export const deleteUser = async (req, res) => {
  try {
    if (req.userInfo.isAdmin === true) {
      const userToDelete = await userSchema.findByIdAndDelete({
        _id: req.params.id,
      });

      res
        .status(204)
        .json(`ID de l'utilisateur supprimé : ${userToDelete._id}`);
    } else {
      res.status(401).json({ message : "Vous n'êtes pas autorisé à supprimer un utilisateur"})
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" });
  }
};
