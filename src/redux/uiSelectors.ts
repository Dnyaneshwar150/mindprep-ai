import { RootState } from "./store";

export const selectDocsBannerDismissed = (state: RootState) =>
  state.mindmap.present.docsBannerDismissed;
