import {
  createLoader,
  parseAsInteger,
  parseAsStringEnum,
  parseAsString,
} from "nuqs/server";
import { MEETING_STATUSES } from "./schemas";
export const filteredSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum([...MEETING_STATUSES])
    .withDefault("upcoming")
    .withOptions({ clearOnDefault: true }),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filteredSearchParams);
