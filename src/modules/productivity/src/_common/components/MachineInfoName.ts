import * as h from "react-hyperscript";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { css } from "emotion";
import { Row } from "react-onsenui";

const mainStyles = {
    headerText: css({
        fontSize: "18pt",
        fontWeight: 500,
        margin: "9.5px 0",
        padding: "0",
    }),
    headerLabel: css({
        margin: "0.8em 0",
        marginBottom: "11px",
        lineHeight: "23px",
    }),
    headerValue: css({
        fontSize: "20px",
        fontWeight: 500,
    }),
    spaceRight: css({
        marginRight: "8px"
    }),
    alignRight: css({
        textAlign: "right",
    })
};

type MachineNameProps = {
    name: string;
    headerTextClass:string;
    headerLabelClass:string;
};
const MachineNameInfo = ({ name , headerTextClass ,headerLabelClass}: MachineNameProps) =>
    name.length > 8 ?
        h("div", { className: headerTextClass }, name)
        :
        h(Row, { className: headerLabelClass }, [
            h(FormattedMessage, { id: "productivity_details_name" }),
            h("span", { className: mainStyles.spaceRight }, [":"]),
            h("span", { className: mainStyles.headerValue }, [
                name
            ])
        ]);
export default MachineNameInfo;