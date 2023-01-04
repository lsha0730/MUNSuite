const bannerLink =
  "https://drive.google.com/uc?export=view&id=1iCfj3I8Hx6J21c0qyr8BenxCffz0lfkr";

const getRender = (codes: string[]) => {
  const pTags = codes
    .map(
      (code: string) =>
        `<p style="margin-top: 5px; margin-bottom: 5px;"><b>${code}</b></p>`
    )
    .join(" ");
  return `<div>${pTags}</div>`;
};

export const SendCodeTemplate = (params: any) =>
  `<div
  bgcolor="#f7f7f7"
  text="#3b3f44"
  link="#0092ff"
  style="background-color: #f7f7f7; padding-bottom: 30px; padding-top: 30px"
>
  <table cellpadding="0" border="0" cellspacing="0" style="display: none">
    <tbody>
      <tr>
        <td>Thank you for your purchase!</td>
      </tr>
    </tbody>
  </table>
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    role="presentation"
    class="m_-7469968227669720822nl2go-body-table"
    width="100%"
    style="background-color: #f7f7f7; width: 100%"
  >
    <tbody>
      <tr>
        <td align="center" class="m_-7469968227669720822r0-c">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="600"
            class="m_-7469968227669720822r1-o"
            style="table-layout: fixed; width: 600px"
          >
            <tbody>
              <tr>
                <td
                  valign="top"
                  class="m_-7469968227669720822r2-i"
                  style="background-color: #f7f7f7"
                >
                  <table
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td class="m_-7469968227669720822r3-c" align="center">
                          <table
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            role="presentation"
                            width="100%"
                            class="m_-7469968227669720822r4-o"
                            style="table-layout: fixed; width: 100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="m_-7469968227669720822r5-i"
                                  style="background-color: #ffffff"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <th
                                          width="100%"
                                          valign="top"
                                          class="m_-7469968227669720822r6-c"
                                          style="font-weight: normal"
                                        >
                                          <table
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                            role="presentation"
                                            width="100%"
                                            class="m_-7469968227669720822r7-o"
                                            style="
                                              table-layout: fixed;
                                              width: 100%;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  valign="top"
                                                  class="m_-7469968227669720822r8-i"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    border="0"
                                                    role="presentation"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r3-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="600"
                                                            class="m_-7469968227669720822r9-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 600px;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r10-i"
                                                                  style="
                                                                    font-size: 0px;
                                                                    line-height: 0px;
                                                                  "
                                                                >
                                                                  <img
                                                                    src=${bannerLink}
                                                                    width="600"
                                                                    border="0"
                                                                    style="
                                                                      display: block;
                                                                      width: 100%;
                                                                    "
                                                                    class="CToWUd a6T"
                                                                    data-bit="iit"
                                                                    tabindex="0"
                                                                  />
                                                                  <div
                                                                    class="a6S"
                                                                    dir="ltr"
                                                                    style="
                                                                      opacity: 0.01;
                                                                      left: 803px;
                                                                      top: 196px;
                                                                    "
                                                                  >
                                                                    <div
                                                                      id=":1fq"
                                                                      class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                                                      role="button"
                                                                      tabindex="0"
                                                                      aria-label="Download attachment "
                                                                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB"
                                                                      data-tooltip-class="a1V"
                                                                      data-tooltip="Download"
                                                                    >
                                                                      <div
                                                                        class="akn"
                                                                      >
                                                                        <div
                                                                          class="aSK J-J5-Ji aYr"
                                                                        ></div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="m_-7469968227669720822r3-c" align="center">
                          <table
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            role="presentation"
                            width="100%"
                            class="m_-7469968227669720822r4-o"
                            style="table-layout: fixed; width: 100%"
                          >
                            <tbody>
                              <tr
                                class="m_-7469968227669720822nl2go-responsive-hide"
                              >
                                <td
                                  height="30"
                                  width="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                                <td
                                  height="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                                <td
                                  height="30"
                                  width="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                  width="30"
                                  style="
                                    font-size: 0px;
                                    line-height: 1px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                                <td
                                  class="m_-7469968227669720822r11-i"
                                  style="background-color: #ffffff"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <th
                                          width="100%"
                                          valign="top"
                                          class="m_-7469968227669720822r6-c"
                                          style="font-weight: normal"
                                        >
                                          <table
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                            role="presentation"
                                            width="100%"
                                            class="m_-7469968227669720822r7-o"
                                            style="
                                              table-layout: fixed;
                                              width: 100%;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                                  width="15"
                                                  style="
                                                    font-size: 0px;
                                                    line-height: 1px;
                                                  "
                                                >
                                                  ­
                                                </td>
                                                <td
                                                  valign="top"
                                                  class="m_-7469968227669720822r8-i"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    border="0"
                                                    role="presentation"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r13-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      <strong
                                                                        >Your
                                                                        activation
                                                                        codes:</strong
                                                                      >
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="5"
                                                                  style="
                                                                    font-size: 5px;
                                                                    line-height: 5px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r15-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="10"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                                <td
                                                                  height="10"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                                <td
                                                                  height="10"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 0px;
                                                                    line-height: 1px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r16-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    background-color: #f7f7f7;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  ${getRender(
                                                                    params.codes
                                                                  )}
                                                                </td>
                                                                <td
                                                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 0px;
                                                                    line-height: 1px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="10"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                                <td
                                                                  height="10"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                                <td
                                                                  height="10"
                                                                  width="20"
                                                                  style="
                                                                    font-size: 10px;
                                                                    line-height: 10px;
                                                                    background-color: #f7f7f7;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r17-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="510"
                                                            class="m_-7469968227669720822r4-o"
                                                            style="
                                                              table-layout: fixed;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r18-i"
                                                                  style="
                                                                    height: 1px;
                                                                  "
                                                                >
                                                                  <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    role="presentation"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <table
                                                                            width="100%"
                                                                            cellspacing="0"
                                                                            cellpadding="0"
                                                                            border="0"
                                                                            role="presentation"
                                                                            valign=""
                                                                            class="m_-7469968227669720822r18-i"
                                                                            height="1"
                                                                            style="
                                                                              border-top-style: solid;
                                                                              background-clip: border-box;
                                                                              border-top-color: #4a4a4a;
                                                                              border-top-width: 0px;
                                                                              font-size: 0px;
                                                                              line-height: 1px;
                                                                            "
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  height="0"
                                                                                  style="
                                                                                    font-size: 0px;
                                                                                    line-height: 0px;
                                                                                  "
                                                                                >
                                                                                  ­
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r13-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      <strong
                                                                        >To
                                                                        redeem
                                                                        your
                                                                        codes:</strong
                                                                      >
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="5"
                                                                  style="
                                                                    font-size: 5px;
                                                                    line-height: 5px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <ol
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      <li>
                                                                        Goto
                                                                        <a
                                                                          href="https://ffdbcbj.r.af.d.sendibt2.com/tr/cl/i8mzPPMGvte9lTtna78z1oHvoPh1lJVX17IX1THyc4RJC-A9ldd9XckjGwDP-AEWbI7bM-buJJVElqYwbu9ZeEvn6dZnSmGJlDlK0TNvgNvQxMkSs5pmfBIYU7uaBgDrEDQtMzyNgf-hCXKnsdgBcFVkMmUgvOhi19WLF1I0zRZGQqCBA2OEjw_YlAXv9qVrTuFGw1fTuylr22ZJlnSJYI78iVvEkMnbQcp48HrYhf7lvuqaeLOEbMBfjgh6VX8MmosdeX7OKm0ht3z0hb9_CLPn1BHlNftx04AQEsV3OPacQwr9pu5aZ8hwEv5qXqYDkv9StwQD27Y-X5uwfHnCCyU-kl10"
                                                                          style="
                                                                            color: #0092ff;
                                                                            text-decoration: underline;
                                                                          "
                                                                          target="_blank"
                                                                          data-saferedirecturl="https://www.google.com/url?q=https://ffdbcbj.r.af.d.sendibt2.com/tr/cl/i8mzPPMGvte9lTtna78z1oHvoPh1lJVX17IX1THyc4RJC-A9ldd9XckjGwDP-AEWbI7bM-buJJVElqYwbu9ZeEvn6dZnSmGJlDlK0TNvgNvQxMkSs5pmfBIYU7uaBgDrEDQtMzyNgf-hCXKnsdgBcFVkMmUgvOhi19WLF1I0zRZGQqCBA2OEjw_YlAXv9qVrTuFGw1fTuylr22ZJlnSJYI78iVvEkMnbQcp48HrYhf7lvuqaeLOEbMBfjgh6VX8MmosdeX7OKm0ht3z0hb9_CLPn1BHlNftx04AQEsV3OPacQwr9pu5aZ8hwEv5qXqYDkv9StwQD27Y-X5uwfHnCCyU-kl10&amp;source=gmail&amp;ust=1672876785489000&amp;usg=AOvVaw3SPTp8nN10amQW6GBZsBhq"
                                                                          ><strong
                                                                            >munsuite.com/register</strong
                                                                          ></a
                                                                        >
                                                                      </li>
                                                                      <li>
                                                                        Create
                                                                        an
                                                                        account
                                                                        using
                                                                        email
                                                                        and
                                                                        password
                                                                      </li>
                                                                      <li>
                                                                        Activate
                                                                        the
                                                                        account
                                                                        using a
                                                                        product
                                                                        code
                                                                      </li>
                                                                    </ol>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r17-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="510"
                                                            class="m_-7469968227669720822r4-o"
                                                            style="
                                                              table-layout: fixed;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r18-i"
                                                                  style="
                                                                    height: 1px;
                                                                  "
                                                                >
                                                                  <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    role="presentation"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <table
                                                                            width="100%"
                                                                            cellspacing="0"
                                                                            cellpadding="0"
                                                                            border="0"
                                                                            role="presentation"
                                                                            valign=""
                                                                            class="m_-7469968227669720822r18-i"
                                                                            height="1"
                                                                            style="
                                                                              border-top-style: solid;
                                                                              background-clip: border-box;
                                                                              border-top-color: #4a4a4a;
                                                                              border-top-width: 0px;
                                                                              font-size: 0px;
                                                                              line-height: 1px;
                                                                            "
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  height="0"
                                                                                  style="
                                                                                    font-size: 0px;
                                                                                    line-height: 0px;
                                                                                  "
                                                                                >
                                                                                  ­
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      Product
                                                                      codes do
                                                                      not expire
                                                                      and once
                                                                      an account
                                                                      is
                                                                      activated
                                                                      using a
                                                                      code, the
                                                                      account
                                                                      will be
                                                                      upgraded
                                                                      to premium
                                                                      for three
                                                                      months.
                                                                      Once the
                                                                      three
                                                                      month
                                                                      period is
                                                                      over, your
                                                                      account
                                                                      will
                                                                      return to
                                                                      a demo
                                                                      account
                                                                      status.
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r17-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="510"
                                                            class="m_-7469968227669720822r4-o"
                                                            style="
                                                              table-layout: fixed;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r18-i"
                                                                  style="
                                                                    height: 1px;
                                                                  "
                                                                >
                                                                  <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    role="presentation"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <table
                                                                            width="100%"
                                                                            cellspacing="0"
                                                                            cellpadding="0"
                                                                            border="0"
                                                                            role="presentation"
                                                                            valign=""
                                                                            class="m_-7469968227669720822r18-i"
                                                                            height="1"
                                                                            style="
                                                                              border-top-style: solid;
                                                                              background-clip: border-box;
                                                                              border-top-color: #4a4a4a;
                                                                              border-top-width: 0px;
                                                                              font-size: 0px;
                                                                              line-height: 1px;
                                                                            "
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  height="0"
                                                                                  style="
                                                                                    font-size: 0px;
                                                                                    line-height: 0px;
                                                                                  "
                                                                                >
                                                                                  ­
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      If you
                                                                      have any
                                                                      questions
                                                                      or
                                                                      concerns
                                                                      regarding
                                                                      your
                                                                      purchase,
                                                                      please
                                                                      reach out
                                                                      at
                                                                      <a
                                                                        href="mailto:info@munsuite.com"
                                                                        style="
                                                                          color: #0092ff;
                                                                          text-decoration: underline;
                                                                        "
                                                                        target="_blank"
                                                                        ><strong
                                                                          >info@munsuite.com</strong
                                                                        ></a
                                                                      >
                                                                      and we
                                                                      would be
                                                                      glad to
                                                                      assist
                                                                      you.
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r17-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="510"
                                                            class="m_-7469968227669720822r4-o"
                                                            style="
                                                              table-layout: fixed;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r18-i"
                                                                  style="
                                                                    height: 1px;
                                                                  "
                                                                >
                                                                  <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    role="presentation"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <table
                                                                            width="100%"
                                                                            cellspacing="0"
                                                                            cellpadding="0"
                                                                            border="0"
                                                                            role="presentation"
                                                                            valign=""
                                                                            class="m_-7469968227669720822r18-i"
                                                                            height="1"
                                                                            style="
                                                                              border-top-style: solid;
                                                                              background-clip: border-box;
                                                                              border-top-color: #4a4a4a;
                                                                              border-top-width: 0px;
                                                                              font-size: 0px;
                                                                              line-height: 1px;
                                                                            "
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  height="0"
                                                                                  style="
                                                                                    font-size: 0px;
                                                                                    line-height: 0px;
                                                                                  "
                                                                                >
                                                                                  ­
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      Happy
                                                                      crisis
                                                                      solving!
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r17-c"
                                                          align="center"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="510"
                                                            class="m_-7469968227669720822r4-o"
                                                            style="
                                                              table-layout: fixed;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  class="m_-7469968227669720822r18-i"
                                                                  style="
                                                                    height: 1px;
                                                                  "
                                                                >
                                                                  <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    role="presentation"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <table
                                                                            width="100%"
                                                                            cellspacing="0"
                                                                            cellpadding="0"
                                                                            border="0"
                                                                            role="presentation"
                                                                            valign=""
                                                                            class="m_-7469968227669720822r18-i"
                                                                            height="1"
                                                                            style="
                                                                              border-top-style: solid;
                                                                              background-clip: border-box;
                                                                              border-top-color: #4a4a4a;
                                                                              border-top-width: 0px;
                                                                              font-size: 0px;
                                                                              line-height: 1px;
                                                                            "
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  height="0"
                                                                                  style="
                                                                                    font-size: 0px;
                                                                                    line-height: 0px;
                                                                                  "
                                                                                >
                                                                                  ­
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r14-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: left;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      <span
                                                                        style="
                                                                          color: #47667d;
                                                                        "
                                                                        ><strong
                                                                          >MUNSuite</strong
                                                                        ></span
                                                                      >
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          class="m_-7469968227669720822r12-c"
                                                          align="left"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                            width="100%"
                                                            class="m_-7469968227669720822r19-o"
                                                            style="
                                                              table-layout: fixed;
                                                              width: 100%;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                class="m_-7469968227669720822nl2go-responsive-hide"
                                                              >
                                                                <td
                                                                  height="30"
                                                                  style="
                                                                    font-size: 30px;
                                                                    line-height: 30px;
                                                                  "
                                                                >
                                                                  ­
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  align="center"
                                                                  valign="top"
                                                                  class="m_-7469968227669720822r20-i m_-7469968227669720822nl2go-default-textstyle"
                                                                  style="
                                                                    color: #3b3f44;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    line-height: 1.5;
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <div>
                                                                    <p
                                                                      style="
                                                                        margin: 0;
                                                                      "
                                                                    >
                                                                      <span
                                                                        style="
                                                                          color: #bcbcbc;
                                                                          font-size: 12px;
                                                                        "
                                                                        >noreply@munsuite.com is not a monitored address and cannot receive emails.</span>
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                                <td
                                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                                  width="15"
                                                  style="
                                                    font-size: 0px;
                                                    line-height: 1px;
                                                  "
                                                >
                                                  ­
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  class="m_-7469968227669720822nl2go-responsive-hide"
                                  width="30"
                                  style="
                                    font-size: 0px;
                                    line-height: 1px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                              </tr>
                              <tr
                                class="m_-7469968227669720822nl2go-responsive-hide"
                              >
                                <td
                                  height="30"
                                  width="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                                <td
                                  height="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                                <td
                                  height="30"
                                  width="30"
                                  style="
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #ffffff;
                                  "
                                >
                                  ­
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <img
    width="1"
    height="1"
    src="https://ci6.googleusercontent.com/proxy/Bw3El2437xMIQBQ0YFXW03nYNqyQ_B81lh9zlyMs3jWvFntFzqPkQfzK5WLSRP-ihKWJFAOEroGSOGykn0kIhsD1oOyNj7XbPbS-DUSEuH8qjDqVxjxym4TQLmp13Wj773IgKFEdPnPwQELOy0B_Uhrw1HyfWOFnVs6is6trhSEci9IFYv2JxXLEuzZLpIgcF9pDVr9HtOUJDww4UvW8buO-dFD8QnCtXMaOCMY2sWACXXA_Nz7fJOjnSEurVyBI5qa8dv2PxKHuHV5iFEhZsuO0szPrYsVn6Zf3xRAEKNjglKhl7-VS996w=s0-d-e1-ft#https://ffdbcbj.r.af.d.sendibt2.com/tr/op/afcQBuQAUOZWb9Q50B0WnQo5ZcdJtMrMZliwFEptNIdnbh5ueb63UFxa26RqvSWAxOGfbcrwksVfmfOMp_YARQdZdf4Wb06tTodEIexTjVnOdj6PC_60lBQ5EeljIDE2rUSMVDH1lHDzkUMHo4WdOXyH5aaS_Fy_LF288rDQ_ry8"
    alt=""
    class="CToWUd"
    data-bit="iit"
  />
</div>`;
