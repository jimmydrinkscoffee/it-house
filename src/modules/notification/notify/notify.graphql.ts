import { gql } from "apollo-server-express";

import Context from "../../../helpers/graphql/context";
import { AccountLoader } from "../../account/account.model";
import NotificationModel from "../notification.model";

const notifyGraphql = {
  schema: gql`
    extend type Mutation {
      notify(data: NotificationParams!): String
    }
    input NotificationParams {
      accId: ID!
      title: String!
      body: String!
    }
  `,
  resolvers: {
    Mutation: {
      notify: async (root: any, args: any, context: Context) => {
        const { data } = args;
        const { accId, title, body } = data;

        const acc = await AccountLoader.load(accId);
        if (!acc) {
          throw new Error("account not found");
        }

        const noti = await NotificationModel.create({
          accId,
          title,
          body,
        });

        return "ok";
      },
    },
  },
};

export default notifyGraphql;
