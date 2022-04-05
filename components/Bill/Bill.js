import React from "react"
import { Row, Spinner } from "react-bootstrap"
import AddTestimony from "../AddTestimony/AddTestimony"
import BillCosponsors from "../BillCosponsors/BillCosponsors"
import BillReadMore from "../BillReadMore/BillReadMore"
import BillStatus from "../BillStatus/BillStatus"
import BillTestimonies from "../BillTestimonies/BillTestimonies"
import { useBill } from "../db"
import * as links from "../../components/links.tsx"
import { billLink, committeeLink, primarySponsorLink } from "../links"

const ViewBillPage = ({ billId }) => {
  const { loading, result: fullBill } = useBill(billId)

  const bill = fullBill?.content
  const billHistory = fullBill?.history
  const committeeName = fullBill?.currentCommittee?.name
  const houseChairEmail = fullBill?.currentCommittee?.houseChair?.email
  const senateChairEmail = fullBill?.currentCommittee?.senateChair?.email
  const billURL = `https://malegislature.gov/Bills/192/${bill?.BillNumber}`
  return loading ? (
    <Row>
      <Spinner animation="border" className="mx-auto" />
    </Row>
  ) : (
    <>
      <div className="text-center">
        <h1>
          <links.External href={billURL}>{bill?.BillNumber}</links.External>
        </h1>
        <h4>{bill?.Title ? bill?.Title : bill?.Pinslip}</h4>
        <div className="font-italic">
          Lead Sponsor: {bill?.PrimarySponsor.Name}{" "}
        </div>
        <Row className="mt-2 mb-2">
          <div className=" d-flex justify-content-center">
            <BillCosponsors bill={bill} />
            <BillStatus bill={bill} billHistory={billHistory} />
          </div>
        </Row>
        <h5>{committeeName ? "Current Committee: " + committeeName : ""}</h5>
      </div>
      <div className="m-3">
        {bill && bill.DocumentText != null ? (
          <>
            <span style={{ whiteSpace: "pre-wrap" }}>
              <i>{bill.DocumentText.substring(0, 350)}&#8288;&#8230;</i>
            </span>
            {bill.DocumentText.length > 350 ? (
              <BillReadMore bill={bill} />
            ) : null}
          </>
        ) : (
          ""
        )}
      </div>
      <h1>Published Testimony</h1>
      <BillTestimonies bill={bill} />
      <AddTestimony
        bill={bill}
        committeeName={committeeName}
        houseChairEmail={houseChairEmail}
        senateChairEmail={senateChairEmail}
      />
    </>
  )
}

export default ViewBillPage
