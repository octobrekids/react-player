import { initVideoPlayerStateType } from "../../stores/videoReducer/type";

export type PlayerControlPropsType = Omit<initVideoPlayerStateType, "volume"> & {
    handlePlaying: () => void,
};
