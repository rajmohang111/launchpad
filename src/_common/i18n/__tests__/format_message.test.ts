import { default as formatMessage, Messages } from "../format_message";

describe("format message", () => {

  describe("format message", () => {

    const messages: Messages = {
      noPlaceholder: "first message",
      placeholder: "{subject} is {verb}"
    };

    const formatMessagesWithMessages = formatMessage(messages);

    it("formats messages without placeholder", () => {

      const messageReturned = formatMessagesWithMessages("noPlaceholder");

      expect(messageReturned).toEqual(messages.noPlaceholder);


    });

    it("formats messages with placeholders", () => {

      const placeHolderValues = {
        subject: "Elm",
        verb: "great"
      };

      const messageReturned = formatMessagesWithMessages("placeholder", placeHolderValues);

      expect(messageReturned).toEqual(`${placeHolderValues.subject} is ${placeHolderValues.verb}`);


    });

    it("ignores placeholder values in case message does not define placeholders", () => {

      const placeHolderValues = {
        subject: "Elm",
        verb: "great"
      };

      const messageReturned = formatMessagesWithMessages("noPlaceholder", placeHolderValues);

      expect(messageReturned).toEqual(messages.noPlaceholder);


    });

    it("formats messages with placeholders in case some placeholders are missing", () => {

      const placeHolderValues = {
        subject: "Elm"
      };

      const messageReturned = formatMessagesWithMessages("placeholder", placeHolderValues);

      expect(messageReturned).toEqual(`${placeHolderValues.subject} is {verb}`);


    });

    it("returns default message in case messageId could not be found in messages", () => {

      const notExistingMessageId = "doesNotExist";
      const defaultMessage = "Does Not Exist";
      const messageReturned = formatMessagesWithMessages(notExistingMessageId, {}, defaultMessage);

      expect(messageReturned).toEqual(defaultMessage);

    });

    it("returns messageId in case messageId could not be found in and default message is not set", () => {

      const notExistingMessageId = "doesNotExist";
      const messageReturned = formatMessagesWithMessages(notExistingMessageId);

      expect(messageReturned).toEqual(notExistingMessageId);

    });

  });


});
