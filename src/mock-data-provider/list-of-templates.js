const listOfTemplates = [
  {
    id: 1,
    title: "Template 1",
    description: "Template 1 description",
    createdBy: "Kwan Yee",
    createdAt: new Date(),
    components: [],
    lastUpdatedAt: new Date(),
    lastUpdatedBy: "Kwan Yee",
    status: "Draft",
    version: 1,
  },
  {
    id: 2,
    title: "Template 2",
    description: "Template 2 description",
    createdBy: "Kwan Yee",
    createdAt: new Date(),
    components: [],
    lastUpdatedAt: new Date(),
    lastUpdatedBy: "Kwan Yee",
    status: "Published",
    version: 1,
  },
  {
    id: 3,
    title: "Template 3",
    description: "Template 3 description",
    createdBy: "Kwan Yee",
    createdAt: new Date(),
    components: [],
    lastUpdatedAt: new Date(),
    lastUpdatedBy: "Kwan Yee",
    status: "Published",
    version: 1,
  },
];

export default listOfTemplates;

//TODO: Consider how to handle the state where a template is publised and then editted again (scenario of during and after edit - new version?)
