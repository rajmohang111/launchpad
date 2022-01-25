import { AppModule } from "../../_common/models/module";

export const determineInitModule = (tutorialHidden: boolean) =>
  tutorialHidden ?
    AppModule.launchpad:
    AppModule.tutorial;
