import EmptyState from "@/app/(client)/components/empty-state/empty-state";
import getConversationById from "@/app/actions/get-conversation-by-id";
import getMessages from "@/app/actions/get-messages";
import Header from "./components/header";
import Body from "./components/body";
import Form from "./components/form";

type ParamsConversationType = {
  conversationId: string;
};

const ConversationId = async ({
  params,
}: {
  params: ParamsConversationType;
}) => {
  const сonversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!сonversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full lg:pl-80 ">
      <div className="h-full flex flex-col">
        <Header conversation={сonversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
