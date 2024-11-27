/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce((acc, crr) => acc + crr.totalPrice, 0);
  //3.
  const checkins = confirmedStays.length;
  //4.
  //num checked in nights / (all available nights * numcabins)
  const occupation =
    confirmedStays.reduce((acc, crr) => acc + crr.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
