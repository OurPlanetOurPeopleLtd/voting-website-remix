import {TPdfWrapper} from "../Common/types";
import {TVideoPage} from "../VideoPage/model";

export type TVideoWithPdfsPage = TVideoPage &
    {
        followOnLink: string,
        pdfs: TPdfWrapper[];
    }