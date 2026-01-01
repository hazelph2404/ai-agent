
import {parseAsInteger, parseAsString, useQueryStates} from 'nuqs';
export const useAgentsFilter = () => {
    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),
        page: parseAsInteger.withDefault(1).withOptions({clearOnDefault: true}),
})
}