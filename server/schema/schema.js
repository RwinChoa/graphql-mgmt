const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLSkipDirective,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const Client = require("../models/Client");
const Project = require("../models/Project");

// const StatusEnumType = new GraphQLEnumType({
//     name: "ProgressStatus",
//     values: {
//       new: { value: "Not Started" },
//       progress: { value: "In Progress" },
//       completed: { value: "Completed" },
//     },
//   });

const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "This represents a client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "This represents a project having a client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "RootQuery",
  fields: () => ({
    clients: {
      description: "List of All Clients",
      type: GraphQLList(ClientType),
      resolve: () => Client.find(),
    },
    client: {
      description: "A Client",
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
    projects: {
      description: "List of All Projects",
      type: GraphQLList(ProjectType),
      resolve: () => Project.find(),
    },
    project: {
      description: "A Project",
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: {
    // Add client
    addClient: {
      description: "Add a new Client",
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        client.save();
        return client;
      },
    },
    //Delete a client
    deleteClient: {
      description: "Delte a Client",
      type: ClientType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndRemove(args.id);
      },
    },
    //Add a project
    addProject: {
      description: "Add a project",
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: {
          type: GraphQLNonNull(GraphQLID),
        },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          clientId: args.clientId,
          status: args.status,
        });

        return project.save();
      },
    },
    //Delte a project
    deleteProject: {
      description: "Delte a project",
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndRemove(args.id);
      },
    },
    updateProject: {
      description: "Update a project",
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports.schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
