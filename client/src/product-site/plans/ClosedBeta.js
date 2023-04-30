import React from "react";
import styles from "./Plans.module.css";

function Plans() {
  return (
    <div className={styles.options_container}>
      <div className={styles.top}>
        <div className={styles.top_container}>
          <p className={styles.header}>
            Perfectly smooth crises, just one step away.
          </p>

          <div style={{ position: "relative" }}>
            <div className={styles.join_container}>
              <div className={styles.join_header}>
                MUNSuite is currently in private beta.
              </div>
              <div className={styles.join_subheader}>
                Public release in late 2022
              </div>
              <div className={styles.join_action}>
                <a href="mailto:info@munsuite.com" className={styles.link}>
                  Shoot me an email
                </a>{" "}
                to request access!
              </div>
            </div>

            <div className={styles.cards_container}>
              <div className={styles.card}>
                <div
                  className={styles.card_tie}
                  style={{ backgroundColor: "#EAEAEA" }}
                >
                  <div className={styles.card_tie_left}>
                    <p
                      className={styles.card_heading}
                      style={{ color: "#707070" }}
                    >
                      Demo
                    </p>
                    <p
                      className={styles.card_subheading}
                      style={{ color: "#707070" }}
                    >
                      Try it out
                    </p>
                  </div>
                  <p className={styles.price_tag} style={{ color: "#707070" }}>
                    $0
                  </p>
                </div>

                <div className={styles.card_body}>
                  <ul className={styles.items_list}>
                    <li>50 submissions</li>
                    <li>Email support</li>
                  </ul>

                  <div className={styles.btt_demo}>Try the Demo</div>
                </div>
              </div>

              <div className={styles.card}>
                <div
                  className={styles.card_tie}
                  style={{ backgroundColor: "#4A687F" }}
                >
                  <div className={styles.card_tie_left}>
                    <p
                      className={styles.card_heading}
                      style={{ color: "#FFFFFF" }}
                    >
                      Full Access
                    </p>
                    <p
                      className={styles.card_subheading}
                      style={{ color: "#FFFFFF" }}
                    >
                      Goodbye headaches
                    </p>
                  </div>

                  <div>
                    <p
                      className={styles.price_tag}
                      style={{ color: "#FFFFFF" }}
                    >
                      $5
                    </p>
                    <p
                      className={styles.price_subtag}
                      style={{ color: "#FFFFFF" }}
                    >
                      /2 mo
                    </p>
                  </div>
                </div>

                <div className={styles.card_body}>
                  <ul className={styles.items_list}>
                    <li>Infinite submissions</li>
                    <li>See previous directives</li>
                    <li>Auto-collected statistics</li>
                    <li>Searchable notepad</li>
                    <li>Spreadsheet import delegates</li>
                    <li>CSV export delegate codes</li>
                    <li>Messaging support</li>
                  </ul>

                  <div className={styles.btt_full}>Get Started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom_container}>
          <p className={styles.bottom_header}>Payment Details</p>
          <ul className={styles.items_list}>
            <div className={styles.nowrap}>
              <li>This is</li>
              <p style={{ fontWeight: "600" }}>
                &nbsp;not a subscription&nbsp;
              </p>
              <p>and you will not be billed more than once.</p>
            </div>
            <li>
              Upon payment, you will receive an email receipt and your
              redeemable code(s).
            </li>
            <li>
              Codes do not expire and are valid for 3 months after they are
              redeemed.
            </li>
            <li>All sales are final.</li>
          </ul>
          <p className={styles.bottom_disclaimer}>
            All payments are handled securely using&nbsp;
            <a className={styles.red_highlight} href="http://stripe.com">
              Stripe.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Plans;
