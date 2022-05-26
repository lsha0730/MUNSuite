import React, { useState, useEffect, useContext } from "react";
import "./Statistics.scoped.css";
import { BsPersonFill, BsFillEnvelopeOpenFill } from "react-icons/bs";
import { AiFillPieChart } from "react-icons/ai";
import { appContext } from "../../staffContext";

function Statistics() {
    const {processed} = useContext(appContext);
    const [statsData, setStatsData] = useState([]);
    const [topSubCount, setTopSubCount] = useState();
    const [passedCount, setPassedCount] = useState();
    const [failedCount, setFailedCount] = useState();
    const [statBarsRenders, setStatBarsRenders] = useState([]);

    useEffect (() => {
        setStats();
    }, [processed])

    useEffect(() => {
        reRenderStatBars();
    }, [statsData, topSubCount, passedCount, failedCount])

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
                    {statBarsRenders.length != 0? statBarsRenders:<div className="no-stats-box">No statistics</div>}
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

    function setStats() {
        let tempTopPassedCount = 0;
        let tempFailedCounter = 0;
        let tempPassedCounter = 0;
        let tempDelStats = [];

        for (let i=0; i<processed.length; i++) {
            let submission = processed[i];

            // Credit the directive authors
            let authors = [];
            if (submission.standard) {
                authors = submission.sponsors;
            } else {
                authors = [submission.author];
            }

            for (let j=0; j<authors.length; j++) {
                let author = authors[j];

                let delStatsNames = tempDelStats.map(item => item.delegate);
                if (delStatsNames.includes(author)) {
                    let delStat = tempDelStats[delStatsNames.indexOf(author)];
                    switch (submission.status) {
                        case "Passed":
                            delStat.passed++;
                            break;
                        case "Failed":
                            delStat.failed++;
                            break;
                    }
                } else {
                    tempDelStats.push({
                        delegate: author,
                        passed: submission.status == "Passed"? 1:0,
                        failed: submission.status == "Failed"? 1:0
                    })
                }
            }

            // Increment the committee-wide counters
            if (submission.status == "Passed") tempPassedCounter++;
            if (submission.status == "Failed") tempFailedCounter++;
        }

        for (let i=0; i<tempDelStats.length; i++) {
            let delStat = tempDelStats[i];
            if (delStat.passed + delStat.failed > tempTopPassedCount) {
                tempTopPassedCount = delStat.passed + delStat.failed;
            }
        }

        setPassedCount(tempPassedCounter);
        setFailedCount(tempFailedCounter);
        setTopSubCount(tempTopPassedCount);
        setStatsData(tempDelStats);
    }
}

export default Statistics;