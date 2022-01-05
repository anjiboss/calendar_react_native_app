import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, firstName, lastName } = req.body;

  if (!username) {
    return res.json({
      success: false,
      error: {
        message: "Provide Username please",
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

  await getRepository(User).save(newUser);

  return res.json({
    success: true,
    user: newUser,
  });
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;

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

  return res.json({
    success: true,
    user,
  });
});

export { router as userRouter };
