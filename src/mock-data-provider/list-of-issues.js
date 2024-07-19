import { faker } from "@faker-js/faker";

const issuesStructure = {
  id: "string",
  title: "string",
  description: "string",
  image: "string",
  createdAt: "datetime",
  createdBy: "string",
  status: "string",
  category: "string",
  location: "string",
  assignee: "string",
  published: "boolean",
};

export function generateIssues(numIssues = 50) {
  const issues = [];
  const statuses = ["Open", "Stale", "Closed"];
  const categories = ["Safety", "Cleanliness", "Quality", "Misc", "Site"];
  const locations = [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4",
    "Location 5",
  ];

  for (let i = 0; i < numIssues; i++) {
    const issue = {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      image: faker.image.url(),
      createdAt: faker.date.recent({ days: 15 }),
      createdBy: faker.person.fullName(),
      status: faker.helpers.arrayElement(statuses),
      category: faker.helpers.arrayElement(categories),
      location: faker.helpers.arrayElement(locations),
      assignee: faker.person.fullName(),
      published: faker.datatype.boolean(),
    };
    issues.push(issue);
  }

  return issues;
}
