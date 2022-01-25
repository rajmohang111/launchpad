import * as h from "react-hyperscript";
import ToolBar, { ContentType, ToolbarProps } from "./Toolbar";
import { fromNullable } from "fp-ts/lib/Option";


export type ToolbarPart = {
  data?: any;
  contentId: string;
  onClick: (data?: any) => void;
};

export const createToolbarRenderer = (props: ToolbarProps) => () => h(ToolBar, props);

export const simpleToolbarCreator = (headingId: string, leftElement?: ToolbarPart) =>
  fromNullable(leftElement)
    .map((leftElement): ToolbarProps => ({
      heading: {
        type: ContentType.text,
        contentId: headingId
      },
      leftElement: {
        content: {
          type: ContentType.text,
          contentId: leftElement.contentId
        },
        onClick: leftElement.onClick
      }
    }))
    .map(createToolbarRenderer)
    .getOrElse(createToolbarRenderer({
      heading: {
        type: ContentType.text,
        contentId: headingId
      }
    }));

export const completeToolbarCreator = (headingId: string, leftElement: ToolbarPart, rightElement: ToolbarPart) =>
  createToolbarRenderer({
    heading: {
      type: ContentType.text,
      contentId: headingId
    },
    leftElement: {
      content: {
        type: ContentType.text,
        contentId: leftElement.contentId
      },
      onClick: leftElement.onClick
    },
    rightElement: {
      content: {
        type: ContentType.text,
        contentId: rightElement.contentId
      },
      onClick: rightElement.onClick
    }
  });

export const createToolbarNavigationElement = (onClick: () => void, contentId?: string): ToolbarPart => ({
  contentId: contentId && contentId !== null ? contentId : "",
  onClick
});
