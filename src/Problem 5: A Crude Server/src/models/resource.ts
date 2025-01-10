import prisma from "../config/db";

export const createResource = (name: string, description: string) =>
  prisma.resource.create({ data: { name, description } });

export const getResourceById = (id: number) =>
  prisma.resource.findUnique({ where: { id } });

export const getResources = async (
  filters: { name?: string },
  page: number,
  limit: number
) => {
  const where: any = {};

  if (filters.name) {
    where.name = {
      contains: filters.name,
      mode: "insensitive",
    };
  }

  const resources = await prisma.resource.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.resource.count({ where });

  return {
    data: resources,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateResource = (id: number, name: string, description: string) =>
  prisma.resource.update({ where: { id }, data: { name, description } });

export const deleteResource = (id: number) =>
  prisma.resource.delete({ where: { id } });
