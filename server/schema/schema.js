const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const Client = require('../models/Client');
const Project = require('../models/Project');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    description: 'This represents a client',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        phone: { type: GraphQLString},
        email: { type: GraphQLString},
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'This represents a production having a client',
    fields: ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: { type: GraphQLString},
        client: {
            type: ClientType,
            resolve: (parent, args) => {
               return Client.findById(parent.ClientId)
            } 
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQuery',
    fields: () => ({
        clients: {
            description: "List of All Clients",
            type: GraphQLList(ClientType),
            resolve: () => Client.find()
         },
        client: { 
            description: "A Client",
            type: ClientType,
            args: { 
                id: { type: GraphQLID}
            },
            resolve: (parent, args) => {
                return Client.findById(args.id)
            },
         },
         projects: {
            description: 'List of All Products',
            type: GraphQLList(ProductType),
            resolve: () => Project.find(),

         },
         product: {
            description: "A Product",
            type: ProductType,
            args: {
                id: { type: GraphQLID}
            },
            resolve: (parent, args) => {
                return Project.findById(args.id)
            }
         },

    })
})

module.exports.schema = new GraphQLSchema({
    query: RootQueryType,
})
