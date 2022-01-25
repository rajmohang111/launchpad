import * as React from "react";

import formatMessage, { FormatMessage, Messages } from "./format_message";
import * as PropTypes from "prop-types";

export enum Locale {
  en = "en",
  de = "de",
  zh = "zh"
}

export type IntlProviderProps = React.ClassAttributes<IntlProvider> &  {
  messages: Messages;
  locale: Locale;
};

export type I18NContext = {
  intl: {
    formatMessage: FormatMessage,
    messages: Messages,
    locale: Locale
  }

};

class IntlProvider extends React.Component<IntlProviderProps> {
  constructor(props: IntlProviderProps) {
    super(props);
  }

  static childContextTypes = {
    intl: PropTypes.shape({
      formatMessages: PropTypes.func,
      messages: PropTypes.object,
      locale: PropTypes.string
    })

  };

  getChildContext(): I18NContext {
    const {messages, locale} = this.props;
    const formatMessageWithLocale = formatMessage(messages);

    return {
      intl: {
        formatMessage: formatMessageWithLocale,
        messages,
        locale
      }
    };
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default IntlProvider;
