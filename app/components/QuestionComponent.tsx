import {StructuredText, StructuredTextDocument} from "react-datocms";
import React from "react";
import {Choice} from "../models";
import { VoteControls} from "./VoteControls";
import {TQuestionBlock} from "~/repositories/Navigation/types";

export interface TQuestionProps extends TQuestionBlock {
    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,
}

// Example Question Component
export const QuestionComponent = (props: TQuestionProps) => (
    <>
        <div style={{fontSize:"1.2rem"}} key={props.id + "-title"} className="questionTitle extra-padding">
            <StructuredText data={props.questionTitleSt}/>
        </div>
        <div key={props.id + "-voting"}
                className="extra-padding">
            <VoteControls voteResultCallBack={props.voteResultCallBack }
                            voteChangedCallBack={props.voteChangedCallBack}
                            agreeVoteText={props.voteForText}
                            disagreeVoteText={props.voteAgainstText}
                            questionId={props.id}
                            showStatistics={false}
                            key={props.id + "-votingControls"}

            />
        </div>
    </>
);
