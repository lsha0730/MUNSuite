import React, { useState, useEffect, useContext } from "react";
import styles from "./Statistics.module.css";
import { BsPersonFill, BsFillEnvelopeOpenFill } from "react-icons/bs";
import { AiFillPieChart } from "react-icons/ai";
import { appContext } from "../../staffContext";

function Statistics() {
  const { processed } = useContext(appContext);
  const [statsData, setStatsData] = useState([]);
  const [topSubCount, setTopSubCount] = useState();
  const [passedCount, setPassedCount] = useState();
  const [failedCount, setFailedCount] = useState();
  const [statBarsRenders, setStatBarsRenders] = useState([]);

  useEffect(() => {
    setStats();
  }, [processed]);

  useEffect(() => {
    reRenderStatBars();
  }, [statsData, topSubCount, passedCount, failedCount]);

  return (
    <div className={styles.page_container}>
      <div className={styles.UI_left}>
        <div className={styles.UI_left_top}>
          <div className={styles.header_pair}>
            <BsPersonFill size={30} className={styles.header_icon} />
            <div className={styles.header_right}>
              <p className={styles.header_right_heading}>
                Individual Delegate Statistics
              </p>
              <p className={styles.header_right_subheading}>
                Ordered by number of passed directives, then total submissions
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statbars_container}>
          {statBarsRenders.length != 0 ? (
            statBarsRenders
          ) : (
            <div className={styles.no_stats_box}>No Statistics</div>
          )}
        </div>
      </div>

      <div className={styles.UI_right}>
        <div className={styles.UI_right_block}>
          <div className={styles.header_pair}>
            <BsFillEnvelopeOpenFill size={30} className={styles.header_icon} />
            <p className={styles.header_right_heading}>Directives Processed</p>
          </div>

          <div className={styles.number_container}>
            <p className={styles.big_counter}>{passedCount + failedCount}</p>
            <p className={styles.small_counter}>Total Directives</p>
          </div>
        </div>

        <div className={styles.UI_right_block}>
          <div className={styles.header_pair}>
            <AiFillPieChart size={35} className={styles.header_icon} />
            <p className={styles.header_right_heading}>Committee Pass Rate</p>
          </div>

          <div className={styles.number_container}>
            <p className={styles.big_counter}>
              {getPassRate(passedCount, failedCount)}
            </p>
            <p className={styles.small_counter}>
              {passedCount} Passed, {failedCount} Failed
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  function reRenderStatBars() {
    let renderArr = [];

    // Sort by number of passed directives then total submitted, represents impact to the committee
    let sortedData = statsData.slice();
    sortedData.sort((a, b) => {
      let asum = a.passed + a.failed,
        bsum = b.passed + b.failed;
      if (a.passed != b.passed) {
        return b.passed - a.passed;
      } else {
        return bsum - asum;
      }
    });

    for (let i = 0; i < sortedData.length; i++) {
      let stat = sortedData[i];
      let widthMultiplier = (100 / topSubCount).toFixed(1); // How many percent of total width each submission is worth relative to
      renderArr.push(
        <div className={styles.statbar_container}>
          <p className={styles.delname}>{stat.delegate}</p>
          <div className={styles.bar}>
            <div
              className={styles.passbar}
              style={{
                width:
                  stat.passed * widthMultiplier < 3
                    ? "3%"
                    : `${stat.passed * widthMultiplier}%`,
              }}
            >
              <p className={styles.passbar_label}>{stat.passed}</p>
            </div>
            <div
              className={styles.failbar}
              style={{
                width:
                  stat.failed * widthMultiplier < 3
                    ? "3%"
                    : `${stat.failed * widthMultiplier}%`,
              }}
            >
              <p className={styles.failbar_label}>{stat.failed}</p>
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

    for (let i = 0; i < processed.length; i++) {
      let submission = processed[i];

      // Credit the directive authors
      let authors = [];
      if (submission.standard) {
        authors = submission.sponsors;
      } else {
        authors = [submission.author];
      }

      for (let j = 0; j < authors.length; j++) {
        let author = authors[j];

        let delStatsNames = tempDelStats.map((item) => item.delegate);
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
            passed: submission.status == "Passed" ? 1 : 0,
            failed: submission.status == "Failed" ? 1 : 0,
          });
        }
      }

      // Increment the committee-wide counters
      if (submission.status == "Passed") tempPassedCounter++;
      if (submission.status == "Failed") tempFailedCounter++;
    }

    for (let i = 0; i < tempDelStats.length; i++) {
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

  function getPassRate(passed, failed) {
    const totalSubmissions = failed + passed;
    return totalSubmissions === 0
      ? "N/A%"
      : `${((passed / (failed + passed)) * 100).toFixed(1)}%`;
  }
}

export default Statistics;
