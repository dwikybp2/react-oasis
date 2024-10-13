import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
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

    //QUERY
    const { 
        isLoading,
        data: { data: bookings, count } = {},
        error
     } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    //PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    
    if (page < pageCount) {
        const prePage = Number(page) +1;
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, prePage],
            queryFn: () => getBookings({ filter, sortBy, page: prePage }),
        });
    }
    
    if (page > 1) {
        const prePage = Number(page) - 1;
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, prePage],
            queryFn: () => getBookings({ filter, sortBy, page: prePage }),
        });
    }

    return { isLoading, error, bookings, count };
}