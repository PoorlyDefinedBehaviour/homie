interface Token {
  key: string;
  value: string;
}

export class Lexer {
  static tokenize(message: any): Array<string> {
    let tokens: Array<Token> = [];

    console.log(message);

    tokens.push({ key: "ChannelId", value: message.channel.id });
    tokens.push({ key: "ChannelType", value: message.channel.type });
    tokens.push({ key: "ChannelName", value: message.channel.name });
    tokens.push({ key: "ChannelParentId", value: message.channel.parentID });
    tokens.push({
      key: "ChannelLastMessageId",
      value: message.channel.lastMessageID
    });

    tokens.push({ key: "ServerId", value: message.channel.guild.id });
    tokens.push({ key: "ServerName", value: message.channel.guild.name });
    tokens.push({ key: "ServerRegion", value: message.channel.guild.region });
    tokens.push({
      key: "ServerJoinedTimestamp",
      value: message.channel.guild.joinedTimestamp
    });
    tokens.push({ key: "ServerOwnerId", value: message.channel.guild.ownerID });

    tokens.push({ key: "MessageId", value: message.id });
    tokens.push({ key: "MessageType", value: message.type });
    tokens.push({ key: "MessageContent", value: message.content });
    tokens.push({ key: "MessageAuthorId", value: message.author.id });
    tokens.push({
      key: "MessageAuthorUsername",
      value: message.author.username
    });
    tokens.push({
      key: "MessageAuthorDiscriminator",
      value: message.author.discriminator
    });
    tokens.push({
      key: "MessageAuthorLastMessageId",
      value: message.author.lastMessageID
    });
    tokens.push({
      key: "MessageAuthorLastMessageId",
      value: message.author.lastMessageID
    });

    console.log(tokens);

    return [];
  }
}
