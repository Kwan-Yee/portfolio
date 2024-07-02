const templateStructure = {
  id: "string",
  sections: ["sectionId1", "sectionId2", "sectionId3"],
  title: "string",
  description: "string",
  createdAt: "datetime",
  createdBy: "string",
  updatedAt: "datetime",
  updatedBy: "string",
  publishedAt: "datetime",
  publishedBy: "string",
  workflowId: "string",
  refNumberFormat: [],
  version: "number",
  childTemplates: ["templateId1", "templateId2"],
  published: "boolean",
  draftId: "string",
};

import { faker } from "@faker-js/faker";

export function generateTemplates() {
  const templates = [];
  const parentChildMap = {};

  for (let i = 0; i < 16; i++) {
    const sectionsCount = faker.number.int({ min: 5, max: 20 });
    const hasChildTemplates = faker.datatype.boolean();
    const childTemplatesCount = hasChildTemplates
      ? faker.number.int({ min: 1, max: 3 })
      : 0;

    const sections = Array.from({ length: sectionsCount }, () =>
      faker.string.uuid()
    );
    const childTemplates = hasChildTemplates
      ? Array.from({ length: childTemplatesCount }, () => faker.string.uuid())
      : [];

    const templateId = faker.string.uuid();
    const template = {
      id: templateId,
      sections: sections,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(1),
      createdAt: faker.date.recent(),
      createdBy: faker.string.uuid(),
      updatedAt: faker.date.recent(),
      updatedBy: faker.string.uuid(),
      publishedAt: faker.date.recent(),
      publishedBy: faker.string.uuid(),
      workflowId: faker.string.uuid(),
      refNumberFormat: [],
      version: faker.number.int({ min: 1, max: 10 }),
      childTemplates: childTemplates,
      published: faker.datatype.boolean(),
      draftId: faker.string.uuid(),
      parentTemplate: null,
    };

    templates.push(template);

    if (hasChildTemplates) {
      parentChildMap[templateId] = childTemplates;
    }
  }

  // Add child templates to the templates array
  Object.entries(parentChildMap).forEach(([parentId, childIds]) => {
    childIds.forEach((childId) => {
      const sectionsCount = faker.number.int({ min: 5, max: 20 });
      const sections = Array.from({ length: sectionsCount }, () =>
        faker.string.uuid()
      );

      const childTemplate = {
        id: childId,
        sections: sections,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        createdAt: faker.date.recent(),
        createdBy: faker.string.uuid(),
        updatedAt: faker.date.recent(),
        updatedBy: faker.string.uuid(),
        publishedAt: faker.date.recent(),
        publishedBy: faker.string.uuid(),
        workflowId: faker.string.uuid(),
        refNumberFormat: [],
        version: faker.number.int({ min: 1, max: 10 }),
        childTemplates: [],
        published: faker.datatype.boolean(),
        draftId: faker.string.uuid(),
        parentTemplate: parentId,
      };

      templates.push(childTemplate);
    });
  });

  const parents = templates.filter(
    (template) => template.parentTemplate === null
  );
  const children = templates.filter(
    (template) => template.parentTemplate !== null
  );
  return { parents: parents, children: children };
}
