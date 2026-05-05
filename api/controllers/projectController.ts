import { Request, Response } from "express";
import { Project } from "../models/Project";

// GET all projects
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single project
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET project by slug (public)
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isPublished: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "A project with this slug already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
