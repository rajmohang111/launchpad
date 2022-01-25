import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";

export type SearchBoxActions = {
  onSearch: (searchParam: string) => void;
};
export type SearchBoxProps = {
  placeholder: string;
  searchParam: string;
  actions: SearchBoxActions
};

const mainStyles = {
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  inputDiv: css({
    margin: "16px",
  })
};

const SearchBox = ({ searchParam, placeholder, actions }: SearchBoxProps) =>
  h("div", { className: mainStyles.inputDiv }, [
    h(LaunchpadInput, {
      className: cx(mainStyles.input, "search-input search-input--material"),
      type: "search",
      onChange: (event: React.ChangeEvent<any>) => actions.onSearch(event.target.value),
      name: "searchParam",
      value: searchParam,
      placeholder
    })
  ]);


export default SearchBox;
