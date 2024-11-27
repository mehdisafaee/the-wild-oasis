import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isEditing, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Check in #${data.id} was done successfully.`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },

    onError: () =>
      toast.error(toast.error("There was an error while checking in")),
  });

  return { isEditing, checkin };
}
