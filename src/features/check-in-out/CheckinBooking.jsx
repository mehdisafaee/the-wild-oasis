import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { isEditing, checkin } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(
    function () {
      setIsPaid(() => booking?.isPaid ?? false);
    },
    [booking]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!isPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setIsPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {settings.breakfastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={isPaid}
          onChange={() => setIsPaid((confirm) => !confirm)}
          disabled={isPaid || isEditing}
        >
          {!addBreakfast &&
            `I confirm that ${
              guests.fullName
            } has paid the total amount of ${formatCurrency(totalPrice)}`}

          {addBreakfast &&
            `I confirm that ${guests.fullName} has paid the total amount of 
          ${formatCurrency(
            totalPrice + optionalBreakfastPrice
          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice
            )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid || isEditing}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
