import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../config/jwt.js";
const prisma = new PrismaClient();
const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        Username: Username,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.Password !== Password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const payload = {
        UserID: user.UserID,
        Username: user.Username
     }
    const accessToken = createAccessToken(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: true,
    });
    console.log(user);
    res.status(200).json({
      message: "Đăng nhập thành công",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
export { login };
