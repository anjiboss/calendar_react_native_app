import express from "express";
import { getRepository } from "typeorm";
import { Icon } from "../entity/Icon";
import { User } from "../entity/User";
const router = express.Router();

// API /api/icon

//  -------------------------------------------------------- ANCHOR Add new Icon
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

// --------------------------------------------------------- ANCHOR Get Icon By Username
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

// ANCHOR Delete Icon By ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const username = req.body.username;
  console.log("delete icon by id", { id, username });
  const user = await getRepository(User).findOne({ where: { username } });

  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "No User Found",
      },
    });
  }
  const icon = await getRepository(Icon).findOne({
    where: { id, userId: user.id },
  });
  if (!icon) {
    return res.json({
      success: false,
      error: {
        message: "No Icon Found",
      },
    });
  }
  await getRepository(Icon).remove(icon);
  return res.json({
    success: true,
    icon: icon,
  });
});

export { router as iconRouter };
