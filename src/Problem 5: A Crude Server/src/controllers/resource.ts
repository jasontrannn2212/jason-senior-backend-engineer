import { Request, Response } from "express";
import * as resourceModel from "../models/resource";

export const getResources = async (req: Request, res: Response) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const filters = {
      name: name ? (name as string) : undefined,
    };

    const resources = await resourceModel.getResources(
      filters,
      pageNumber,
      pageSize
    );
    res.json(resources);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[getResources] ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.error("[getResources] An unknown error occurred");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceModel.getResourceById(Number(req.params.id));
    resource
      ? res.json(resource)
      : res.status(404).json({ message: "Resource not found" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[getResource] ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.error("[getResource] An unknown error occurred");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const resource = await resourceModel.createResource(name, description);
    res.status(201).json(resource);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[createResource] ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.error("[createResource] An unknown error occurred");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const resource = await resourceModel.updateResource(
      Number(req.params.id),
      name,
      description
    );
    res.json(resource);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[updateResource] ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.error("[updateResource] An unknown error occurred");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    await resourceModel.deleteResource(Number(req.params.id));
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[deleteResource] ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.error("[deleteResource] An unknown error occurred");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
