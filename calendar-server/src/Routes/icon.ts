import express from "express";
import { getRepository } from "typeorm";
import { Icon } from "../entity/Icon";
import { User } from "../entity/User";
const router = express.Router();

// @Route /api/icon

//  --------------------------------------------------------   Add new Icon
router.post("/", async (req, res) => {
  const { username, icon, description } = req.body;
  console.log("new icon", { username, icon, description });

  const user = await getRepository(User).findOne({ where: { username } });

  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "No User Found",
      },
    });
  }

  const newIcon = new Icon();
  newIcon.icon = icon;
  newIcon.description = description || "";
  newIcon.userId = user.id;

  await getRepository(Icon).save(newIcon);
  return res.json({
    success: true,
    icon: newIcon,
  });
});

// ---------------------------------------------------------  Get Icon By Username
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  console.log("get icon by username", { username });
  const user = await getRepository(User).findOne({ where: { username } });
  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "No User Found",
      },
    });
  }

  const icons = await getRepository(Icon).find({
    where: { userId: user.id },
  });
  return res.json({
    success: true,
    icons: icons,
  });
});

export { router as iconRouter };
