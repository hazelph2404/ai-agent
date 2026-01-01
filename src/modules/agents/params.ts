import {createLoader, parseAsInteger, parseAsString} from "nuqs/server";


export const filteredSearchParams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),

  };
  

export const loadSearchParams = createLoader(filteredSearchParams)