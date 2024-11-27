import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingout, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Check out #${data.id} was done successfully.`);
      queryClient.invalidateQueries({
        active: true,
      });
    },

    onError: () =>
      toast.error(toast.error("There was an error while checking in")),
  });

  return { isCheckingout, checkout };
}
