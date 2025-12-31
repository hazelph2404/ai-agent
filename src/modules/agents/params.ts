import {createLoader, parseAsInteger, parseAsString} from "nuqs/server";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export const filteredSearchParams = {
    search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),
    page: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({clearOnDefault: true}),
}

export const loadSearchParams = createLoader(filteredSearchParams)