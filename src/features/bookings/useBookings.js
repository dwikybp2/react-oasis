import { useQuery } from "@tanstack/react-query";
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    //filter
    const filterValue = searchParams.get('status'); 
    const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue};

    //sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    //pagination
    const page = !searchParams.get('page') ? 1 : searchParams.get('page');

    const { 
        isLoading,
        data: { data: bookings, count } = {},
        error
     } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return { isLoading, error, bookings, count };
}