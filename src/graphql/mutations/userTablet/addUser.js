const graphql         = require('graphql')
const GraphQLNonNull  = graphql.GraphQLNonNull;
const GraphQLString   = graphql.GraphQLString;
const GraphQLInt      = graphql.GraphQLInt
const UserTabletModel = require('../../../models/userTabletSchema');
const UserTabletType  = require('../../types/userTabletType');

exports.addUserTablet = {
  type: UserTabletType.userType,
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    kode_referensi: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tipe_user: {
      type: new GraphQLNonNull(GraphQLInt),
    }
  },
  resolve(root, params) {
    const uModel = new UserTabletModel(params);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error('Error');
    }
    return newUser
  }
}
