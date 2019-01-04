const graphql         	= require('graphql')
const GraphQLObjectType	= graphql.GraphQLObjectType
const GraphQLInt				= graphql.GraphQLInt

const subRekapMenuType = new GraphQLObjectType({
  name: 'subRekapMenu',
  fields: () => {
    return {
    	jumlahMenu: {
				type: GraphQLInt,
				description: 'jumlah menu dipesan per waktu istirahat'
			},
      totalSaldo: {
				type: GraphQLInt,
				description: 'jumlah saldo transaksi per waktu transaksi'
			}
    }
  }
})

module.exports = subRekapMenuType
