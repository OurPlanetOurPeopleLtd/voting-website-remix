import React, {useEffect, useState} from "react";
import {ReportData, ReportLogic, TDataSection} from "./ReportData";
import {DataColumn} from "./DataColumn";
import {Button, Col, Row} from "react-bootstrap";

type TDatePair =
    {startDate: Date, endDate:Date}

type DataDictionary = {
    [key: string]: TDataSection[];
};
type DatePairDictionary = {
    [key: string]:TDatePair ;
};

type RefreshingDictionary = {
    [key: string]:boolean ;
};

export const ReportPage = () => {


    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    //TDataColumn 
    const [refreshing, setRefreshing] = useState<RefreshingDictionary>();
    const [dataColumns, setDataColumns] = useState<DataDictionary>();
    const [datePairColumns, setDatePairColumns] = useState<DatePairDictionary>();
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const updateRefreshing= (key: string, newState:boolean) => {
        setRefreshing((prevData) => ({
            ...prevData,
            [key]: newState,
        }));
    };
    const updateData = (key: string, newData: TDataSection[]) => {
        setDataColumns((prevData) => ({
            ...prevData,
            [key]: newData,
        }));
    };
    const updateDatePair = (key: string, newData: TDatePair) => {
        setDatePairColumns((prevData) => ({
            ...prevData,
            [key]: newData,
        }));
    };

    const getData = (key: string): TDataSection[] | undefined => {
        return dataColumns ? dataColumns[key] : undefined;
    };

    const reportLogic = new ReportLogic();

     useEffect(() => {
         handleAddColumn().catch(e => console.log(e));
         
     }, []);

    const handleGenerateExcel = () => {
        reportLogic.downloadDataAsExcel().catch((e) => console.log(e));
    };

    const getExcelColumnName = (columnNumber: number): string => {
        let columnName = '';
        let dividend = columnNumber + 1; // Excel columns are 1-based

        while (dividend > 0) {
            let modulo = (dividend - 1) % 26;
            columnName = String.fromCharCode(65 + modulo) + columnName; // 65 is 'A'
            dividend = Math.floor((dividend - modulo) / 26);
        }

        return columnName;
    };

    const handleAddColumn = async () => {
        console.log("Adding Column")
        const colNumber = dataColumns ? Object.keys(dataColumns).length : 0;
        const label = getExcelColumnName(colNumber);
        //updateData(label, []);
        //updateDatePair(label, {startDate:today, endDate:sevenDaysAgo});
        await handleDateRangeChange(label, sevenDaysAgo, today );
    };

    const handleDateRangeChange = async (key: string, startDate: Date, endDate: Date) => {
        
        if(startDate > endDate)
        {
            setError(`Start Date for ${key} is ahead of end date! Please correct`)
            return;
        }
        else {
            setError(null)
        }
        setLoading(true);        
        console.log("Adding Data")
        updateRefreshing(key,true)
        updateDatePair(key, {startDate, endDate});
        updateData(key, await reportLogic.queryData(startDate, endDate));
        updateRefreshing(key,false)
        setLoading(false);
    }

    const displayDataColumns = () => {
        if (!dataColumns) return;
        return Object.entries(dataColumns).map(([key, sections]) => (
            refreshing && refreshing[key] ? 
                <Col key={key+"column-load"}> Column LOADING</Col> :
            datePairColumns && datePairColumns[key] ?
                
                <DataColumn key={key+"column"}
                            title={key}
                            data={sections}
                            startDate={datePairColumns[key].startDate}
                            endDate={datePairColumns[key].endDate}
                            handleStartDateChange={async function (s: Date): Promise<void> {
                                await handleDateRangeChange(key, s, datePairColumns[key].endDate)
                            }} handleEndDateChange={async function (e: Date): Promise<void> {
                    await handleDateRangeChange(key, datePairColumns[key].startDate, e)
                }}/> : null

        ));
    };

    return (
        <div>
            <h1>Reporting Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {/*<Button onClick={handleGenerateExcel}>Generate Excel</Button>*/}
            <Button onClick={handleAddColumn} >
                Add Column
            </Button>
            <Row style={{overflowX: "auto",
                overflowY: "auto",
                flexWrap: "nowrap",
                justifyContent: "left"}}>
            {displayDataColumns()}
            </Row>
        </div>
    );

}