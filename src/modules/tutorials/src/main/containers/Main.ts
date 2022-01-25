import { default as MainView, TutorialsProps as TutorialsProps , CarouselEvent } from "../views/Main";
import { RootState } from "../../../../../main/reducers/main";
import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { getTutorialState } from "../selectors/tutorial";
import * as actions from "../actions/tutorial";
import { createSwitchTutorialStateAction } from "../actions/tutorial";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { getPreferencesState } from "../../../../settings/src/preferences/selectors/preferences";

export type TutProps = TutorialsProps;

const Main = (props: TutProps) =>
  h(MainView, props);

const mapStateToProps = (state: RootState) => ({
  slideShow: getTutorialState(state),
  preferencesState: getPreferencesState(state)
});
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, actions.TutorialActions>) => ({
  actions: {
    onSlideChange: (index: number) => dispatch(actions.onSlideChange(index)),
    onhideSlide: bindActionCreators(createNavigateBackAction, dispatch),
    onSwipeChange: (event: CarouselEvent) => dispatch(actions.onSwipeChange(event.activeIndex)),
    onShowTutorialUpdate: bindActionCreators(createSwitchTutorialStateAction, dispatch),
    onOversScroll:(event: CarouselEvent) =>  dispatch(actions.onOversScroll(event.activeIndex)),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
