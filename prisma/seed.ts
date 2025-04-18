import prisma from "@/prisma";

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
      {
        name: "John Smith",
        email: "john.smith@example.com",
      },
    ],
  });
}

seed()
  .then(() => {
    console.log("Database seeded successfully");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
