import React, { useState, useEffect } from "react";
import "./Statistics.scoped.css";
import MockStatistics from "./MockStatistics.js";
import { BsPersonFill, BsFillEnvelopeOpenFill } from "react-icons/bs";
import { AiFillPieChart } from "react-icons/ai";


function Statistics() {
    const statsData = JSON.parse(localStorage.getItem("statistics")) || MockStatistics;
    const [statBarsRenders, setStatBarsRenders] = useState([]);
    const [topSubCount, setTopSubCount] = useState();
    const [passedCount, setPassedCount] = useState();
    const [failedCount, setFailedCount] = useState();

    useEffect (() => {
        setCommitteeStats();
        reRenderStatBars();
    }, [statsData])

    useEffect(() => {
        localStorage.setItem("statistics", JSON.stringify(statsData));
        dispatchEvent(new Event("statistics updated"));
    }, [statsData])

    return (
        <div className="page-container">
            <div className="UI-left">
                <div className="UI-left-top">
                    <div className="header-pair">
                        <BsPersonFill size={30} className="header-icon"/>
                        <div className="header-right">
                            <p className="header-right-heading">Individual Delegate Statistics</p>
                            <p className="header-right-subheading">Ordered by number of passed directives, then total submissions</p>
                        </div>
                    </div>
                </div>

                <div className="statbars-container">
                    {statBarsRenders}
                </div>
            </div>

            <div className="UI-right">
                <div className="UI-right-block">
                    <div className="header-pair">
                        <BsFillEnvelopeOpenFill size={30} className="header-icon"/>
                        <p className="header-right-heading">Directives Processed</p>
                    </div>

                    <div className="number-container">
                        <p className="big-counter">{passedCount + failedCount}</p>
                        <p className="small-counter">Total Directives</p>
                    </div>
                </div>

                <div className="UI-right-block">
                    <div className="header-pair">
                        <AiFillPieChart size={35} className="header-icon"/>
                        <p className="header-right-heading">Committee Pass Rate</p>
                    </div>

                    <div className="number-container">
                        <p className="big-counter">{`${(passedCount/(failedCount + passedCount)*100).toFixed(1)}%`}</p>
                        <p className="small-counter">{passedCount} Passed, {failedCount} Failed</p>
                    </div>
                </div>
            </div>
        </div>
    )

    function reRenderStatBars() {
        let renderArr = [];

        // Sort by number of passed directives then total submitted, represents impact to the committee
        let sortedData = statsData.slice();
        sortedData.sort((a, b) => {
            let asum = a.passed + a.failed, bsum = b.passed + b.failed;
            if (a.passed != b.passed) {
                return b.passed - a.passed;
            } else {
                return bsum - asum;
            }
        });

        for (let i = 0; i < sortedData.length; i++) {
            let stat = sortedData[i];
            let widthMultiplier = (100/topSubCount).toFixed(1); // How many percent of total width each submission is worth relative to 
            let passWidth = (stat.passed / (stat.passed + stat.failed) * 100).toFixed(1);
            renderArr.push(
                <div className="statbar-container">
                    <p className="delname">{stat.delegate}</p>
                    <div className="bar">
                        <div className="passbar" style={{ width: stat.passed*widthMultiplier<3? "3%":`${stat.passed*widthMultiplier}%` }}>
                            <p className="passbar-label">{stat.passed}</p>
                        </div>
                        <div className="failbar" style={{ width: stat.failed*widthMultiplier<3? "3%":`${stat.failed*widthMultiplier}%` }}>
                            <p className="failbar-label">{stat.failed}</p>
                        </div>
                    </div>
                </div>
            );
        }
        setStatBarsRenders(renderArr);
    }

    function setCommitteeStats() {
        let tempTopPassedCount = 0;
        let tempFailedCounter = 0;
        let tempPassedCounter = 0;
        for (let i = 0; i < statsData.length; i++) {
            let stat = statsData[i];
            tempPassedCounter += stat.passed;
            tempFailedCounter += stat.failed;
            if (stat.passed + stat.failed > tempTopPassedCount) tempTopPassedCount = stat.passed + stat.failed;
        }
        setPassedCount(tempPassedCounter);
        setFailedCount(tempFailedCounter);
        setTopSubCount(tempTopPassedCount);
    }
}

export default Statistics;