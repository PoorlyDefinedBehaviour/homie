export class Lexer {
  static tokenize(message: any): any {
    let Token: any = {};

    Token["ChannelId"] = message.channel.id;
    Token["ChannelType"] = message.channel.type;
    Token["ChannelName"] = message.channel.name;
    Token["ChannelParentId"] = message.channel.parentID;
    Token["ChannelLastMessageId"] = message.channel.lastMessageID;

    Token["ServerId"] = message.channel.guild.id;
    Token["ServerName"] = message.channel.guild.name;
    Token["ServerRegion"] = message.channel.guild.region;
    Token["ServerJoinedTimestamp"] = message.channel.guild.joinedTimestamp;

    Token["ServerOwnerId"] = message.channel.guild.ownerID;

    Token["MessageId"] = message.id;
    Token["MessageType"] = message.type;
    Token["MessageContent"] = message.content.split(" ");
    Token["MessageAuthorId"] = message.author.id;
    Token["MessageAuthorUsername"] = message.author.username;
    Token["MessageAuthorDiscriminator"] = message.author.discriminator;
    Token["MessageAuthorLastMessageId"] = message.author.lastMessageID;
    Token["MessageAuthorLastMessageId"] = message.author.lastMessageID;

    return Token;
  }
}
