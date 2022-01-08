import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password) {
    return res.json({
      success: false,
      error: {
        message: "Provide Username and Password please",
      },
    });
  }

  // Check If username in used;
  const testUser = await getRepository(User).findOne({
    where: { username },
  });

  if (testUser) {
    return res.json({
      success: false,
      error: {
        message: "Username in used",
      },
    });
  }
  // Create User
  const newUser = new User();
  newUser.firstName = firstName || "";
  newUser.lastName = lastName || "";
  newUser.username = username;
  newUser.password = password;

  await getRepository(User).save(newUser);

  return res.json({
    success: true,
    user: newUser,
  });
});

router.post("/:username", async (req, res) => {
  const username = req.params.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.json({
      success: false,
      error: {
        message: "Provide Username and Password please",
      },
    });
  }

  const user = await getRepository(User).findOne({
    where: { username },
  });

  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "User not found",
      },
    });
  }

  // Check Password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({
      success: false,
      error: {
        message: "Invalid Password",
      },
    });
  }

  return res.json({
    success: true,
    user,
  });
});

export { router as userRouter };
