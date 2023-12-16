import { userService } from "../services/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import transporter from "../helpers/mailer.js";

import {
  NOT_FOUND,
  INVALID_CREDENTIALS,
  MISSING_FIELDS_REQUIRED,
  INVALID_PASSWORD_LENGTH,
  DUPLICATE_RECORD,
  INVALID_TOKEN,
} from "../labels/labels.js";

const usersController = {
  getAll: async (req, res) => {
    const users = await userService.getAll({});

    return res.status(200).json({
      status: 200,
      total: users.length,
      data: users,
    });
  },
  getOne: async (req, res) => {
    const user = await userService.getOne({ _id: req.body.id });

    if (user === undefined || user === null) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: user,
    });
  },
  login: async (req, res) => {
    const foundUser = await userService.getOne({ email: req.body.email });

    if (foundUser === undefined || foundUser === null) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    const isValidPassword = await foundUser.isValidPassword(req.body.password);

    if (!isValidPassword) {
      return res.status(404).json({
        status: 404,
        message: INVALID_CREDENTIALS,
      });
    }

    // dos partes: payload y el secret token
    // aca generamos el token
    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        id: foundUser.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        id: foundUser.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // saving refreshToken with current user
    const currentUser = { ...foundUser._doc, refreshToken };
    await userService.update(currentUser._id, currentUser);

    // transporter
    //   .sendMail({
    //     from: "Finanzas App sebastianimfeld@gmail.com",
    //     to: req.body.email,
    //     subject: "Aviso de inicio de sesión",
    //     body: "Iniciaste sesión ahora mismo",
    //   })
    //   .then((res) => console.log(res));

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.json({ accessToken });
  },
  refreshToken: async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await userService.getOne({ refreshToken });

    if (foundUser === undefined || foundUser === null) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            id: decoded.id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        return res.json({ accessToken });
      }
    );
  },
  logout: async (req, res) => {
    // on client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await userService.getOne({ refreshToken });

    if (foundUser === undefined || foundUser === null) {
      res.clearCookie("jwt", {
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const currentUser = { ...foundUser._doc, refreshToken: "" };
    await userService.update(currentUser._id, currentUser);

    res.clearCookie("jwt", {
      httpOnly: true,
      // maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    res.sendStatus(204);
  },
  store: async (req, res) => {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.password ||
      !req.body.email
    ) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: INVALID_PASSWORD_LENGTH,
      });
    }

    const alreadyExist = await userService.getOne({ email: req.body.email });

    if (alreadyExist) {
      return res.sendStatus(409);
    }

    const storedUser = await userService.store({ ...req.body });

    return res.sendStatus(201);
  },
  update: async (req, res) => {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.username ||
      !req.body.email
    ) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }
    const { id } = req.params;

    const oldInforUser = await userService.getOne({ _id: id });

    if (oldInforUser?.email !== req.body?.email) {
      const alreadyExist = await userService.getOne({ email: req.body.email });

      if (alreadyExist) {
        return res.status(400).json({
          status: 400,
          isStored: false,
          message: DUPLICATE_RECORD,
        });
      }
    }

    const updateUser = await userService.update(id, {
      ...req.body,
      updatedAt: new Date(),
    });

    return res.status(201).json({
      status: 201,
      isUpdated: true,
      data: updateUser !== 0 ? id : null,
    });
  },
  // recoverPassword: async (req, res) => {
  //   const { email } = req.body;

  //   if (!email) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: MISSING_FIELDS_REQUIRED,
  //     });
  //   }

  //   const message =
  //     "Revisa el enlace enviado a tu correo para reestablecer tu contraseña";

  //   let verificationLink = `${process.env.BASE_URL_FRONT}/recovery-password/`;
  //   let emailStatus = "OK";

  //   const anUser = await userService.getOne({ email });

  //   if (!anUser) {
  //     return res.json({ message });
  //   }

  //   // dos partes: payload y el secret token
  //   // aca generamos el token
  //   const token = jwt.sign(
  //     {
  //       name: anUser.firstName + " " + anUser.lastName,
  //       id: anUser._id,
  //     },
  //     process.env.RESET_TOKEN_SECRET,
  //     { expiresIn: "5m" }
  //   );

  //   const userToUpdate = { ...anUser._doc };
  //   userToUpdate.resetToken = token;
  //   userToUpdate.updatedAt = new Date();

  //   await userService.update(anUser._id, userToUpdate);

  //   try {
  //     transporter
  //       .sendMail({
  //         from: `Finanzas Perfectas ${process.env.EMAIL_USER}`,
  //         to: req.body.email,
  //         subject: "Reestablecer contraseña",
  //         html: `
  //           <div>
  //             <h4>Reestablecer contraseña</h4>
  //             <p>Hace clic en el siguiente enlace para reestablecer la nueva contraseña</p>
  //             <a href=${verificationLink}${token}>Reestablecer contraseña</a>
  //           </div>
  //         `,
  //       })
  //       .then((res) => console.log(res))
  //       .catch((error) => console.log(error));

  //     return res.status(200).json({ message, info: emailStatus });
  //   } catch (error) {
  //     return res.status(400).json({ message: "Algo salió mal!" });
  //   }
  // },
  newPassword: async (req, res) => {
    if (!req.body.password || !req.body.confirmPassword || !req.body.token) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: ACCESS_DENIED,
      });
    }

    try {
      const verified = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: INVALID_TOKEN,
      });
    }

    const user = await userService.getOne({ resetToken: token });

    // encriptamos
    const jumps = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, jumps);

    const updateUser = await userService.update(user._id, {
      password: hash,
      updatedAt: new Date(),
    });

    return res.status(201).json({
      status: 201,
      isUpdated: true,
    });
  },
};

export default usersController;
