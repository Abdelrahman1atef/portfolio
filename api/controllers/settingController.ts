import { Request, Response } from "express";
import { Setting } from "../models/Setting";

export const getSettings = async (_req: Request, res: Response) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
