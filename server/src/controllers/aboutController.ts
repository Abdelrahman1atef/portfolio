import { Request, Response } from "express";
import { About } from "../models/About";

export const getAbout = async (_req: Request, res: Response) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create empty record if not exists
      about = await About.create({
        bio: "",
        profileImage: "",
        title: "",
        subtitle: "",
        stats: [],
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
