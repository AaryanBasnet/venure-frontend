import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeVenueStatus } from '../../services/admin/adminVenueService';

export const useChangeVenueStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ venueId, status }) =>
      changeVenueStatus(venueId, status), // status is a string here ✅
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_venue'] });
    },
  });
};