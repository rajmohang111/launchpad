import * as h from "react-hyperscript";
import { BackButton, Toolbar as OnsenToolbar, ToolbarButton } from "react-onsenui";
import FormattedMessage from "../../_common/i18n/components/Formatted_Message";
import {css,cx} from "emotion";

const styles = {
  alignCenter: css({
    textAlign: "center"
  })
 };

export type ToolbarActions = {
  onNavigateBack: () => void;
};

export enum ContentType {
  text
}

export type ToolbarPart = {
  content: {
    type: ContentType,
    contentId: string
  },
  onClick: () => void;
};

export type ToolbarProps = {
  heading: {
    type: ContentType,
    contentId: string;
  };
  leftElement?: ToolbarPart;
  rightElement?: ToolbarPart;
};


export type ElementProps = {
  content: {
    type: ContentType,
    contentId: string
  },
  onClick: () => void;
};
const LeftElement = ({ content, onClick }: ElementProps) =>
  h(BackButton, { onClick }, [
    content.contentId? h(FormattedMessage, { id: content.contentId }) : ""
  ]);

const RightElement = ({ content, onClick }: ElementProps) =>
  h(ToolbarButton, { onClick }, [
    content.contentId ? h(FormattedMessage, { id: content.contentId }) : ""
  ]);

const ToolBar = (props: ToolbarProps) =>
  h(OnsenToolbar, [
    h("div", { className: "left" }, [
      props.leftElement ?
        h(LeftElement, { content: props.leftElement.content, onClick: props.leftElement.onClick }):
        h("div")
    ]),
    h("div", { className: cx(styles.alignCenter,"center") }, [
        props.heading ?
          h(FormattedMessage, { id: props.heading.contentId }):
          ""
      ]
    ),
    h("div", { className: "right" }, [
      props.rightElement ?
        h(RightElement, { content: props.rightElement.content, onClick: props.rightElement.onClick }):
        h("div")
    ])
  ]);

export default ToolBar;
