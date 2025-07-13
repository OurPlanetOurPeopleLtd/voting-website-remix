import React from "react";
import {Col} from "react-bootstrap";
import {TDataSection} from "./ReportData";


export type TDataColumn =
{
    title:string,
    startDate:Date,
    endDate:Date,
    data:TDataSection[],
    handleStartDateChange: (s:Date) => void
    handleEndDateChange: (s:Date) => void
}



const DataSection = (props: TDataSection) => {
    
    const {title, data} = props;

    function isInfinityOrNaN(num: number): boolean {
        return !isFinite(num) || isNaN(num);
    }
    return (
        <Col>
            <h3>{title}</h3>
            <table>
                <tbody>
                {data.map((pair, index) => (
                    <tr key={index}>
                        <th>{pair.name}</th>
                        <td>
                            <data value={ pair.value} style={{textAlign:"right", paddingLeft:"10%"}}>
                                {isInfinityOrNaN(pair.value) ? "100.00" : pair.value.toFixed(2)}
                            </data>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Col>
    )
}



export const DataColumn = (props: TDataColumn) => {

    const formatDateTimeLocal = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    return (
        <Col key={props.startDate.toISOString()+"_"+props.endDate.toISOString()+"_"+props.title} style={{textAlign:"left"}}>
        <h3>{props.title}</h3>
        <div>
            {/*Start Date, End Date Controls*/}
                <div id="StartDateInput">
                    <label htmlFor="datetime">Start Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        value={formatDateTimeLocal(props.startDate)}
                        onChange={(e) => props.handleStartDateChange(new Date(e.target.value))}
                    />
                </div>
                <div id="EndDateInput">
                    <label htmlFor="datetime">End Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        value={formatDateTimeLocal(props.endDate)}
                        onChange={(e) => props.handleEndDateChange(new Date(e.target.value))}
                    />
                </div>
            {/*Actual Data*/}
            {props.data.map( x=> <DataSection title={x.title} data={x.data}/>)}
             
        </div>
        </Col>
    )

}